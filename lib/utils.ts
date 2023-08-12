export function range(start: number, end: number, step = 1): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

export const keys = <T extends {}>(input: T): Array<keyof T> => Object.keys(input) as Array<keyof T>;
