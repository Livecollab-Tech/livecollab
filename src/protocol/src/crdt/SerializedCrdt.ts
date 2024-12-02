import { Json, JsonObject } from "../Json";

export type IdTuple<T> = [id: string, value: T];

/**
 * This enum represents all `CRDT` types, that
 * we will use in `@livecollab/crdt`.
 *
 * `CrdtType.REGISTER` use `8` because it's last
 * value that could be in `CrdtType`, but in the
 * future, we can add some `CrdtTypes` to package.
 * That's why we use exactly this value in order
 * to be backward compatible.
 */
export enum CrdtType {
  OBJECT = 0,
  MAP = 1,
  LIST = 2,
  TEXT = 3,

  REGISTER = 8,
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