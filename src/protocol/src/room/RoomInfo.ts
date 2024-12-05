import type { Json } from "../Json";

export type BaseRoomInfo = {
  /**
   * The name of the room.
   */
  name: string;

  /**
   * The URL of the room.
   */
  url: string;

  [key: string]: Json | undefined;
};