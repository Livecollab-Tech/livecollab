export enum ClientMsgCode {
  /* For Broadcast & Presence */
  BROADCAST_EVENT = 200,
  UPDATE_PRESENCE = 201,
  /* For Storage */
  FETCH_STORAGE = 300,
  UPDATE_STORAGE = 301,
}