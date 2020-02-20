export = LoopQueue

declare class LoopQueue {
  /**
   * @param loops when greater than 0, limit the maximum loop times; defaults to `0`
   * @param capacity when greater than 0, limit the maximum queue length; defaults to `0`
   * @param hash function to generate `id` from item; defaults to `item => item`
   */
  constructor(loops: number, capacity: number, hash: (item: any) => any)

  /**
   * Property to retrieve current length of the queue
   */
  get length(): number

  /**
   * Add given item to the end of the queue
   * @param item anything except `undefined`
   * @return hash value which can be used to get or remove the item
   */
  push(item): any

  /**
   * @param id by default, id is the same primitive value or object reference;
   *   when queue is constructed with a hash function, id is whatever that
   *   function returns
   * @return the saved item
   */
  get(id)

  /**
   * Same as [Symbol.iterator]
   * @return item iterator
   */
  values()

  /**
   * @param id by default, id is the same primitive value or object reference;
   *   when queue is constructed with a hash function, id is whatever that 
   *   function returns
   * @return true if id is found and deleted
   */
  remove(id): boolean

  /**
   * Clear the entire queue
   */
  clear()

  /**
   * Remove the first item in the queue and return it
   * @return the first item in the queue
   */
  shift(): any

  /**
   * Loop through the queue and return the next item. 
   * If `loops` is set, this method checks cyclic number and removes the item
   * when reached.
   * @param remove a predicate callback or boolean to determine whether to
   *   remove next item
   * @return the next cyclic item
   */
  next(remove: (item: any) => boolean | boolean): any
}