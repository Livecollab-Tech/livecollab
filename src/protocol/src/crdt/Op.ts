import { Json, JsonObject } from "../Json";

export enum OpCode {
  INIT = 0,
  SET_PARENT_LINK = 1,
  UPDATE_OBJECT = 2,
  DELETE_OBJECT_KEY = 3,
  DELETE_CRDT = 4,
  ACK = 5,
  /* Create operations */
  CREATE_REGISTER = 6,
  CREATE_OBJECT = 7,
  CREATE_MAP = 8,
  CREATE_LIST = 9,
  CREATE_TEXT = 10,
}

export type CreateOp =
  | CreateRegisterOp
  | CreateObjectOp
  | CreateMapOp
  | CreateListOp
  | CreateTextOp;

/**
 * Base fields in many `Ops`
 * @field `opId?` - The `id` that is set by the Pool when creating. Could be `undefined`, when `undo/redo`
 * @field `id` - Pool assigns a unique id to each CRDT when creating (attach)
 */
type OpBaseFields = {
  readonly opId?: string;
  readonly id: string;
}

/* Create Operations */

/**
 * Base fields in all `CREATE` ops with {@link OpBaseFields}
 * @field `parentId` - The same as `id` but referenced to parent `id` of CRDT
 * @field `parentKey` - The key or Position by which the CRDT is linked to the parent
 * @field `previousId?` - The special field for `ListLike` CRDT (see `id`). Used when `SET` value
 */
type CreateBaseFields = {
  readonly parentId: string;
  readonly parentKey: string;
  readonly previousId?: string;
} & OpBaseFields;

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

/* Other Operations */

export type SetParentLinkOp = {
  readonly type: OpCode.SET_PARENT_LINK;
  readonly parentKey: string;
} & OpBaseFields

export type UpdateObjectOp = {
  readonly type: OpCode.UPDATE_OBJECT;
  readonly data: Partial<JsonObject>;
} & OpBaseFields

export type DeleteObjectKey = {
  readonly type: OpCode.DELETE_OBJECT_KEY;
  readonly key: string;
} & OpBaseFields

export type DeleteCrdtOp = {
  type: OpCode.DELETE_CRDT;
} & OpBaseFields