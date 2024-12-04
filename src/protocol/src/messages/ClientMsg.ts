import { Json, JsonObject } from "../Json";
import { Op } from "../crdt/Op";

export enum ClientMsgCode {
  /* For Broadcast & Presence */
  BROADCAST_EVENT = 200,
  UPDATE_PRESENCE = 201,
  /* For Storage */
  FETCH_STORAGE = 300,
  UPDATE_STORAGE = 301,
}

/**
 * Messages that can be sent from the client to the server.
 */
export type ClientMsg<P extends JsonObject, E extends Json> =
  /* For Broadcast & Presence */
  | ClientBroadcastEventMsg<E>
  | ClientUpdatePresenceMsg<P>

  /* For storage */
  | ClientUpdateStorageMsg
  | ClientFetchStorageMsg

export type ClientBroadcastEventMsg<E extends Json> = {
  readonly type: ClientMsgCode.BROADCAST_EVENT;
  readonly event: E;
};

export type ClientUpdatePresenceMsg<P extends JsonObject> = {
  readonly type: ClientMsgCode.UPDATE_PRESENCE;
  readonly isFull: boolean;
  readonly data: P;
};

export type ClientFetchStorageMsg = {
  readonly type: ClientMsgCode.FETCH_STORAGE;
};

export type ClientUpdateStorageMsg = {
  readonly type: ClientMsgCode.UPDATE_STORAGE;
  readonly ops: Op[];
};