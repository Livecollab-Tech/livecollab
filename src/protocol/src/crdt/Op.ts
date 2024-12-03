import { Json, JsonObject } from "../Json";

export enum OpCode {
  INIT = 0,
  SET_PARENT_LINK = 1,
  UPDATE_OBJECT = 2,
  DELETE_OBJECT_KEY = 3,
  DELETE_CRDT = 4,

  CREATE_REGISTER = 5,
  CREATE_OBJECT = 6,
  CREATE_MAP = 7,
  CREATE_LIST = 8,
  CREATE_TEXT = 9,
}

export type CreateOp =
  | CreateRegisterOp
  | CreateObjectOp
  | CreateMapOp
  | CreateListOp
  | CreateTextOp;

/* Create Operations */

/**
 * Base fields in all `CREATE` ops
 * @field `opId?` - The id that is set by the Pool when creating. Could be undefined, when undo/redo
 * @field `id` - Pool assigns a unique id to each CRDT when creating (attach)
 * @field `parentId` - The same as `id` but referenced to parent `id` of CRDT
 * @field `parentKey` - The key or Position by which the CRDT is linked to the parent
 * @field `previousId?` - The special field for `ListLike` CRDT (see `id`). Used when `SET` value
 */
type CreateBaseFields = {
  readonly opId?: string;
  readonly id: string;
  readonly parentId: string;
  readonly parentKey: string;
  readonly previousId?: string;
}

export type CreateRegisterOp = {
  readonly type: OpCode.CREATE_REGISTER;
  /* Type based fields */
  readonly data: Json;
} & CreateBaseFields

export type CreateObjectOp = {
  readonly type: OpCode.CREATE_OBJECT;
  /* Type based fields */
  readonly data: JsonObject;
} & CreateBaseFields

export type CreateMapOp = {
  readonly type: OpCode.CREATE_MAP;
} & CreateBaseFields

export type CreateListOp = {
  readonly type: OpCode.CREATE_LIST;
} & CreateBaseFields

export type CreateTextOp = {
  readonly type: OpCode.CREATE_TEXT;
} & CreateBaseFields