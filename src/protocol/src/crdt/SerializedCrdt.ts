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

