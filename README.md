# LoopQueue



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

### shift()

Remove the first item in the queue and return it.
  
### remove(id): boolean

- id: by default, id is the same primitive value or object reference;
  when queue is constructed with a hash function, id is whatever that function returns

Remove an item by the given id.

### next(remove: (item: any) => boolean | boolean)

- remove: a predicate callback or boolean to determine whether to remove next item

Loop through the queue and return the next item. If `loops` is set, this method checks cyclic number and removes the item when reached.

