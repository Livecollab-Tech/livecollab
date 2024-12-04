import { Json, JsonObject } from "../Json";

export enum OpCode {
  INIT = 0,
  SET_PARENT_LINK = 1,
  UPDATE_OBJECT = 2,
  DELETE_OBJECT_KEY = 3,
  DELETE_CRDT = 4,
  ACK = 5,
  /* Create operations */
  CREATE_REGISTER = 15,
  CREATE_OBJECT = 16,
  CREATE_MAP = 17,
  CREATE_LIST = 18,
  CREATE_TEXT = 19,
}

export type Op =
  | CreateOp
  | DeleteCrdtOp
  | AckOp
  | DeleteObjectKeyOp
  | UpdateObjectOp
  | SetParentLinkOp

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

export type DeleteObjectKeyOp = {
  readonly type: OpCode.DELETE_OBJECT_KEY;
  readonly parentKey: string;
} & OpBaseFields

export type DeleteCrdtOp = {
  type: OpCode.DELETE_CRDT;
} & OpBaseFields

/* Ack Operation */

/**
 * `Acknowledgment`
 *
 * Create an Op that can be used as an acknowledgment for the given opId, to
 * send back to the originating client in cases where the server decided to
 * ignore the Op and not forward it.
 *
 * It's important for the client to receive an acknowledgment for this, so
 * that it can correctly update its own unacknowledged Ops administration.
 * Otherwise, it could get in "synchronizing" state indefinitely.
 */
export type AckOp = {
  readonly type: OpCode.ACK;
} & Required<OpBaseFields>