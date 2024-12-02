/**
 * Represents an indefinitely deep arbitrary JSON data structure. There are
 * four types that make up the Json family:
 *
 * - `Json`         any legal JSON value
 * - `JsonScalar`   any legal JSON leaf value (no lists or objects)
 * - `JsonArray`    a JSON value whose outer type is an array
 * - `JsonObject`   a JSON value whose outer type is an object
 *
 */
export type Json = JsonScalar | JsonArray | JsonObject;
export type JsonScalar = string | number | boolean | null;
export type JsonArray = Json[];
/**
 * Any valid JSON object.
 */
export type JsonObject = { [key: string]: Json | undefined };
/**
 * Type safe function to check if value is `JsonScalar`
 */
export const isJsonScalar = (data: Json): data is JsonScalar => {
  return (
    data === null ||
    typeof data === "string" ||
    typeof data === "number" ||
    typeof data === "boolean"
  );
}
/**
 * Type safe function to check if value is `JsonArray`
 */
export const isJsonArray = (data: Json): data is JsonArray => {
  return Array.isArray(data);
}
/**
 * Type safe function to check if value is `JsonObject`
 */
export const isJsonObject = (data: Json): data is JsonObject => {
  return !isJsonScalar(data) && !isJsonArray(data);
}