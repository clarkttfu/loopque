# LoopQueue

<p align="center">
  <a href="https://www.npmjs.com/package/loopque"><img src="https://img.shields.io/npm/dm/loopque.svg?style=flat-square" alt="NPM downloads"></a>
  <a href="https://www.npmjs.com/package/loopque"><img src="https://img.shields.io/npm/v/loopque.svg?style=flat-square" alt="NPM version"></a>
  <a href="https://travis-ci.org/clarkttfu/loopque"><img src="https://travis-ci.org/clarkttfu/loopque.svg" alt="Build version"></a>
  <a href="https://coveralls.io/github/clarkttfu/loopque?branch=master"><img src="https://coveralls.io/repos/github/clarkttfu/loopque/badge.svg?branch=master" alt="Build version"></a>  
  <a href="/LICENSE"><img src="https://img.shields.io/npm/l/loopque.svg?style=flat-square" alt="License"></a>
</p>


## API

### LoopQueue([loops], [capacity], [hash])

- loops: when greater than 0, limit the maximum loop times; defaults to `0`
- capacity: when greater than 0, limit the maximum queue length; defaults to `0`
- hash: function to generate `id` from item; defaults to `item => item`

### length

Property to retrieve current length of the queue.

### push(item)
  
- item: any value or object except `undefined`

Add item to the end of queue.

### values()

Return item iterator, same as [Symbol.iterator]

### get(id)

- id: by default, id is the same primitive value or object reference;
  when queue is constructed with a hash function, id is whatever that function returns

Retrieve item in the queue via the given hash id, just like `Map`.

### remove(id): boolean

- id: by default, id is the same primitive value or object reference;
  when queue is constructed with a hash function, id is whatever that function returns

Remove an item by the given hash id.

### clear()

Clear the entire queue.

### shift()

Remove the first item in the queue and return it.

### next(remove: (item: any) => boolean | boolean)

- remove: a predicate callback or boolean to determine whether to remove next item

Loop through the queue and return the next item. If `loops` is set, this method checks cyclic number and removes the item when reached.

