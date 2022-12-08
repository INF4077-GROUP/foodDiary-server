import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';
import { BOWEL_NODE, USER_NODE } from 'src/common/constants';
import { CommonRepository } from '../common/common.service';
import { WhenType } from './types';

@Injectable()
export class BowelRepository {
  private static bowelName = 'bowel';

  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly commonRepository: CommonRepository,
  ) {
    this.createBowel();
  }

  private async createBowel() {
    const [bowelAlreadyCreated] = await this.commonRepository.findAll(
      BOWEL_NODE,
    );

    if (!bowelAlreadyCreated)
      await this.commonRepository.create(BOWEL_NODE, {
        name: BowelRepository.bowelName,
      });
  }

  async createUserWhenBowel(userId: string, whenData: WhenType) {
    const query = this.neo4jService.initQuery();

    const userLabel = USER_NODE.toLocaleLowerCase();
    const bowelLabel = BOWEL_NODE.toLocaleLowerCase();

    const result = await query
      .matchNode(userLabel, USER_NODE, { id: userId })
      .matchNode(bowelLabel, BOWEL_NODE, { name: BowelRepository.bowelName })
      .raw(
        `
          CREATE (${userLabel})-[relation:WHEN{date: ${whenData.date}, bowelNb: ${whenData.bowelNb}}]->(${bowelLabel})
        `,
      )
      .run();

    return result;
  }
}
