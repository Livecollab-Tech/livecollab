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