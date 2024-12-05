import { IdTuple, SerializedCrdt } from "../crdt/SerializedCrdt";
import { BaseUserMeta } from "../room/UserMeta";
import { Json, JsonObject } from "../Json";
import { Op } from "../crdt/Op";

export enum ServerMsgCode {
  /* For room */
  ROOM_STATE = 100,
  USER_JOINED = 101,
  USER_LEFT = 102,
  /* For Broadcast & Presence */
  BROADCAST_EVENT = 200,
  UPDATE_PRESENCE = 201,
  /* For Storage */
  INITIAL_STORAGE_STATE = 300,
  UPDATE_STORAGE = 301,
}

/**
 * Sent by the WebSocket server to a single client in response to the client
 * joining the Room, to provide the initial state of the Room. The payload
 * includes a list of all other Users that already are in the Room.
 */
export type ServerRoomStateMsg<U extends BaseUserMeta> = {
  readonly type: ServerMsgCode.ROOM_STATE;

  /**
   * Informs the client what their actor ID is going to be.
   */
  readonly actor: number;

  /**
   * Informs the client what permissions the current User (self) has.
   */
  readonly scopes: string[];

  readonly users: {
    readonly [otherActor: number]: U & { scopes: string[] };
  };
};

/**
 * Sent by the WebSocket server and broadcast to all clients to announce that
 * a new User has joined the Room.
 */
export type ServerUserJoinMsg<U extends BaseUserMeta> = {
  readonly type: ServerMsgCode.USER_JOINED;
  readonly actor: number;
  /**
   * The id of the User that has been set in the authentication endpoint.
   * Useful to get additional information about the connected user.
   */
  readonly id: U["id"];
  /**
   * Additional user information that has been set in the authentication
   * endpoint.
   */
  readonly info: U["info"];
  /**
   * Informs the client what (public) permissions this (other) User has.
   */
  readonly scopes: string[];
};

/**
 * Sent by the WebSocket server and broadcast to all clients to announce that
 * a new User has left the Room.
 */
export type ServerUserLeftMsg = {
  readonly type: ServerMsgCode.USER_LEFT;
  readonly actor: number;
};

/**
 * Sent by the WebSocket server and broadcast to all clients to announce that
 * a User broadcast an Event to everyone in the Room.
 */
export type ServerBroadcastEventMsg<E extends Json> = {
  readonly type: ServerMsgCode.BROADCAST_EVENT;
  /**
   * The User who broadcast the Event. Absent when this event is broadcast from
   * the REST API in the backend.
   */
  readonly actor: number;
  /**
   * The arbitrary payload of the Event. This can be any JSON value. Clients
   * will have to manually verify/decode this event.
   */
  readonly event: E;
};

/**
 * Sent by the WebSocket server and broadcast to all clients to announce that
 * a User updated their presence. For example, when a user moves their cursor.
 *
 * In most cases, the data payload will only include the fields from the
 * Presence that have been changed since the last announcement. However, after
 * a new user joins a room, a "full presence" will be announced so the newly
 * connected user will get each other's user full presence at least once. In
 * those cases, the `targetActor` field indicates the newly connected client,
 * so all other existing clients can ignore this broadcast message.
 */
export type ServerUpdatePresenceMsg<P extends JsonObject> = {
  readonly type: ServerMsgCode.UPDATE_PRESENCE;
  /**
   * The User whose Presence has changed.
   */
  readonly actor: number;

  readonly isFull: boolean;
  /**
   * The partial or full Presence of a User. If the `isFull` field is set,
   * this will be the full Presence, otherwise it only contain the fields that
   * have changed since the last broadcast.
   */
  readonly data: P | Partial<P>;
};

/**
 * Sent by the WebSocket server to a single client in response to the client
 * joining the Room, to provide the initial Storage state of the Room. The
 * payload includes the entire Storage document.
 */
export type ServerInitialDocumentStateMsg = {
  readonly type: ServerMsgCode.INITIAL_STORAGE_STATE;
  readonly items: IdTuple<SerializedCrdt>[];
};

/**
 * Sent by the WebSocket server and broadcast to all clients to announce that
 * a change occurred in the Storage document.
 *
 * The payload of this message contains a list of Ops (aka incremental
 * mutations to make to the initially loaded document).
 */
export type ServerUpdateStorageMsg = {
  readonly type: ServerMsgCode.UPDATE_STORAGE;
  readonly ops: Op[];
};