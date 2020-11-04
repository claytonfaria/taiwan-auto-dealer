/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function getReqAsString(value?: string | string[]): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
