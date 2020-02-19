const should = require('should')
const Queue = require('.')

describe('Test LoopQueue constructor', function () {
  it('constructs without args', () => {
    const queue = new Queue()
    should(queue.length).equal(0)
    should(queue._hash).be.Function()
    should(queue._loops).be.false()
    should(queue._capacity).be.false()
  })

  it('constructs with (hash)', () => {
    const noop = () => {}
    const queue = new Queue(noop)
    should(queue._hash).equal(noop)
    should(queue._loops).be.false()
    should(queue._capacity).be.false()
  })

  it('constructs with (loops)', () => {
    const queue = new Queue(1)
    should(queue._hash).be.Function()
    should(queue._loops).equal(1)
    should(queue._capacity).be.false()
  })

  it('constructs with (loops, hash)', () => {
    const noop = () => {}
    const queue = new Queue(1, noop)
    should(queue._hash).equal(noop)
    should(queue._loops).equal(1)
    should(queue._capacity).be.false()
  })

  it('constructs with (loops, capacity)', () => {
    const queue = new Queue(1, 2)
    should(queue._hash).be.Function()
    should(queue._loops).equal(1)
    should(queue._capacity).equal(2)
  })

  it('constructs with (loops, capacity, hash)', () => {
    const noop = () => {}
    const queue = new Queue(1, 2, noop)
    should(queue._hash).equal(noop)
    should(queue._loops).equal(1)
    should(queue._capacity).equal(2)
  })

  it('constructs with (0, 0, hash)', () => {
    const noop = () => {}
    const queue = new Queue(0, 0, noop)
    should(queue._hash).equal(noop)
    should(queue._loops).be.false()
    should(queue._capacity).be.false()
  })
})

describe('Test LoopQueue.next', () => {
  it('loop in the insertion order', () => {
    const queue = new Queue()
    queue.push(3)
    queue.push(1)
    queue.push(2)
    should(queue.next()).equal(3)
    should(queue.next()).equal(1)
    should(queue.next()).equal(2)
    should(queue.next()).equal(3)
    should(queue.next()).equal(1)
    should(queue.next()).equal(2)
    should(queue.next()).equal(3)
  })

  it('loop continue even when next is changed', () => {
    const queue = new Queue()
    queue.push(3)
    queue.push(1)
    queue.push(2)
    should(queue.next()).equal(3)
    should(queue.remove(1)).be.true()
    should(queue.next()).equal(2)
    should(queue.next()).equal(3)
    should(queue.next()).equal(2)
    should(queue.push(4)).equal(4)
    should(queue.next()).equal(4)
    should(queue.next()).equal(3)
  })

  it('loop then predicate to remove', () => {
    const queue = new Queue()
    const predicate = item => item === 2
    queue.push(1)
    queue.push(2)
    queue.push(3)
    should(queue.next(predicate)).equal(1)
    should(queue.length).equal(3)
    should(queue.next(predicate)).equal(2)
    should(queue.length).equal(2)
    should(queue.next(true)).equal(3)
    should(queue.length).equal(1)
    should(queue.next(false)).equal(1)
    should(queue.length).equal(1)
    should(queue.next()).equal(1)
    should(queue.length).equal(1)
    should(queue.next(true)).equal(1)
    should(queue.length).equal(0)
    should(queue.next()).be.undefined()
  })

  it('loop then remove if reach loops limit', () => {
    const queue = new Queue(2)
    queue.push(1)
    queue.push(2)
    should(queue.next()).equal(1)
    should(queue.length).equal(2)
    should(queue.next()).equal(2)
    should(queue.length).equal(2)
    should(queue.next()).equal(1)
    should(queue.length).equal(1)
    should(queue.next()).equal(2)
    should(queue.length).equal(0)
    should(queue.next()).be.undefined()
  })
})

describe('Test LoopQueue .push .remove', () => {
  it('push return object reference hash', () => {
    const queue = new Queue()
    const obj = {}
    should(queue.push(0)).be.exactly(0)
    should(queue.push(null)).be.null()
    should(queue.push(obj)).equal(obj)
    should(queue.push(obj)).not.equal({})
  })

  it('push accept null but undefined', () => {
    const queue = new Queue()
    should(queue.push()).be.undefined()
    should(queue.length).equal(0)
    should(queue.push(null)).equal(null)
    should(queue.length).equal(1)
  })

  it('push overwrite exiting of same, do not grow the queue', () => {
    const queue = new Queue()
    should(queue.push(null)).be.null()
    should(queue.length).equal(1)
    should(queue.push(null)).be.null()
    should(queue.length).equal(1)
  })

  it('remove returns true when found', () => {
    const queue = new Queue()
    queue.push(5)
    should(queue.remove(2)).be.false()
    should(queue.remove(5)).be.true()
  })
})

describe('Test LoopQueue with custom hash', () => {
  it('push overwrites item of same hash', () => {
    const queue = new Queue(item => item.id)
    const ob1 = { id: 1 }
    const ob2 = { id: 1 }
    should(queue.push(ob1)).equal(1)
    should(queue.length).equal(1)
    should(queue.push(ob2)).equal(1)
    should(queue.length).equal(1)
    const item = queue.get(1)
    should(item).not.equal(ob1)
    should(item).equal(ob2)
    should(queue.get(2)).be.undefined()
  })

  it('remove by custom hash', () => {
    const queue = new Queue(item => item.id)
    queue.push({ id: 1 })
    should(queue.remove(1)).be.true()
  })
})

describe('Test LoopQueue.shift', () => {
  it('shift oldest item', () => {
    const queue = new Queue()
    queue.push(1)
    queue.push(2)
    should(queue.shift()).equal(1)
    should(queue.shift()).equal(2)
    should(queue.length).equal(0)
    should(queue.shift()).be.undefined()
  })

  it('push and shift once reach capacity', () => {
    const queue = new Queue(false, 1)
    const original = queue.shift
    queue.shift = function mock () {
      const item = original.call(this)
      should(queue.length).equal(0)
      return item
    }
    queue.push(1)
    queue.push(2) // force shift of 1
    should(queue.shift()).equal(2)
  })
})
