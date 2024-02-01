/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GroupBy<T, K extends keyof T> = Record<string | number | symbol, T[]>;

function groupBy<T, K extends keyof T>(array: T[], key: K): GroupBy<T, K> {
  return array.reduce((result: GroupBy<T, K>, item: T) => {
    const keyValue = item[key] as string | number | symbol;

    // Use non-null assertion (!) to tell TypeScript that result[keyValue] will not be undefined
    (result[keyValue] ?? (result[keyValue] = [])).push(item);

    return result;
  }, {} as GroupBy<T, K>);
}

function getArray(groupedObject: { [key: string]: any }, key:string, value:string) {
  const arr = []
  for (const k in groupedObject) {
    arr.push({ [key]: k, [value]: groupedObject[k] })
  }
  return arr
}


export {
  groupBy, getArray
}