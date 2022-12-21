import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { HAVE, SICK_NODE, USER_NODE } from 'src/common/constants';
import { Sick, SickData } from 'src/dailyEating/entities';
import { CommonRepository } from '../common/common.service';
import { HaveType, SickType } from './types';

@Injectable()
export class SickRepository {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly commonrepository: CommonRepository,
  ) {}

  async preloadSick(sickData: SickType) {
    const sickName = sickData.name.toLocaleLowerCase();

    const [sickExist] = await this.commonrepository.findOneByName(
      SICK_NODE,
      sickName,
    );

    if (!sickExist) await this.commonrepository.create(SICK_NODE, sickData);
  }

  async createUserHaveSick(
    userId: string,
    sickName: string,
    haveData: HaveType,
  ) {
    const query = this.neo4jService.initQuery();

    const userLabel = USER_NODE.toLocaleLowerCase();
    const sickLabel = SICK_NODE.toLocaleLowerCase();

    const result = await query
      .matchNode(userLabel, USER_NODE, { id: userId })
      .matchNode(sickLabel, SICK_NODE, { name: sickName })
      .raw(
        `CREATE (${userLabel})-[relation:HAVE{date: '${haveData.date}'}]-> (${sickLabel})`,
      )
      .return('relation')
      .run();

    return result;
  }

  async getAllSicks(userId: string) {
    const query = this.neo4jService.initQuery();

    const userLabel = USER_NODE.toLocaleLowerCase();
    const sickLabel = SICK_NODE.toLocaleLowerCase();

    const haveRelation = HAVE.toLocaleLowerCase();

    const results = await query
      .matchNode(userLabel, USER_NODE, { id: userId })
      .matchNode(sickLabel, SICK_NODE)
      .raw(
        `
          MATCH ((${userLabel})-[${haveRelation}:${HAVE}]->(${sickLabel}))
        `,
      )
      .return([sickLabel, haveRelation])
      .run();

    const response = {};

    if (!results.length) return;

    for (const item of results) {
      const sickData = item[sickLabel].properties;
      const haveData = item[haveRelation].properties;

      const sickEntityPayload: SickData = {
        name: sickData.name,
      };

      const date = new Date(haveData.date).getTime();

      if (!response[date]) response[date] = [new Sick(sickEntityPayload)];
      else response[date] = [...response[date], new Sick(sickEntityPayload)];
    }

    return Object.entries<any>(response);
  }
}
