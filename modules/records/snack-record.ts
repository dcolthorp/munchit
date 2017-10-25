import { RepositoryBase, loaderOf, NumberId } from "./record";

import { SnackRecord, VoteRecord } from "records/record-infos";

export type SnackId = NumberId<"snacks">;

export interface UnsavedSnack {
  name: string;
}
export interface SavedSnack extends UnsavedSnack {
  id: SnackId;
}

export class SnackRepository extends RepositoryBase(SnackRecord) {
  forVote = loaderOf(this).owning(VoteRecord, "snackId");
  byName = loaderOf(this).findOneBy("name");

  async findWithTagsNamed(tagNames: string[]): Promise<SavedSnack[]> {
    let query = this.table().select(this.db.raw(`"snacks".*`));

    for (let i = 0; i < tagNames.length; i++) {
      const tag = tagNames[i];

      const taggingsN = `taggings${i}`;
      const tagsN = `tag${i}`;

      query = query.joinRaw(
        `
          INNER JOIN taggings ${taggingsN} ON ${taggingsN}."snackId" = "snacks".id
          INNER JOIN tags ${tagsN} on
            ${taggingsN}."tagId" = ${tagsN}.id
            AND ${tagsN}.name = ?
        `,
        tag
      );
    }
    return await query;
  }
}
