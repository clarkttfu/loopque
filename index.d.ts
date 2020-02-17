export = LoopQueue

declare class LoopQueue {
  constructor(loops: number, capacity: number, hash: (item: any) => any)
  get length(): number

  push(item): any
  shift(): any
  remove(item): boolean
  next(remove: (item: any) => boolean | boolean): any
}