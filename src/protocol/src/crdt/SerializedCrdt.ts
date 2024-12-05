import { Json, JsonObject } from "../Json";

export type IdTuple<T> = [id: string, value: T];

/**
 * This enum represents all `CRDT` types, that
 * we will use in `@livecollab/crdt`.
 */
export enum CrdtType {
  REGISTER = 0,
  OBJECT = 1,
  MAP = 2,
  LIST = 3,
  TEXT = 4,
}

export type SerializedCrdt = SerializedRootObject | SerializedChild;

export type SerializedChild =
  | SerializedObject
  | SerializedMap
  | SerializedList
  | SerializedText
  | SerializedRegister;

export type SerializedRootObject = {
  readonly type: CrdtType.OBJECT;
  readonly data: JsonObject;

  /* Root objects don't have a parent */
  readonly parentId?: never;
  readonly parentKey?: never;
};

export type SerializedObject = {
  readonly type: CrdtType.OBJECT;
  readonly parentId: string;
  readonly parentKey: string;
  readonly data: JsonObject;
};

export type SerializedMap = {
  readonly type: CrdtType.MAP;
  readonly parentId: string;
  readonly parentKey: string;
};

export type SerializedList = {
  readonly type: CrdtType.LIST;
  readonly parentId: string;
  readonly parentKey: string;
};

export type SerializedText = {
  readonly type: CrdtType.TEXT;
  readonly parentId: string;
  readonly parentKey: string;
};

export type SerializedRegister = {
  readonly type: CrdtType.REGISTER;
  readonly parentId: string;
  readonly parentKey: string;
  readonly data: Json;
};

export const isRootCrdt = (crdt: SerializedCrdt): crdt is SerializedRootObject => {
  return crdt.type === CrdtType.OBJECT && !isChildCrdt(crdt);
}

export const isChildCrdt = (crdt: SerializedCrdt): crdt is SerializedChild => {
  return crdt.parentId !== undefined && crdt.parentKey !== undefined;
}