import { v4 } from "uuid";
import { __T__ } from "../../../../src/modules/__s__";

export const fake__T__ = (override?: Partial<__T__>): __T__ => ({
  id: v4(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...override,
});
