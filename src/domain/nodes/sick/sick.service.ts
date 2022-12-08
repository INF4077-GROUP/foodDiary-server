import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { SICK_NODE, USER_NODE } from 'src/common/constants';
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
        `CREATE (${userLabel})-[relation:HAVE{date: ${haveData.date}}]-> (${sickLabel})`,
      )
      .return('relation')
      .run();

    return result;
  }
}
