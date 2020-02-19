'use strict'

module.exports = class LoopQueue {
//
  constructor (loops, capacity, hash) {
    if (typeof hash === 'function') {
      this._hash = hash
    } else if (typeof capacity === 'function') {
      this._hash = capacity
      capacity = false
    } else if (typeof loops === 'function') {
      this._hash = loops
      loops = capacity = false
    } else {
      this._hash = item => item
    }
    this._loops = loops > 0 && loops
    this._capacity = capacity > 0 && capacity
    this._map = new Map()
    this._it = null
  }

  get length () {
    return this._map.size
  }

  get (hash) {
    const map = this._map
    if (map.has(hash)) {
      return map.get(hash).item
    }
  }

  remove (hash) {
    return this._map.delete(hash)
  }

  push (item) {
    if (item !== undefined) {
      if (this._capacity && this._capacity <= this.length) {
        this.shift()
      }
      const hash = this._hash(item)
      this._map.set(hash, { item, count: 0 })
      return hash
    }
  }

  shift () {
    const map = this._map
    const next = map.keys().next()
    if (!next.done) {
      const item = map.get(next.value).item
      this._map.delete(next.value)
      return item
    }
  }

  next (remove) {
    if (this.length < 1) return

    let next = null
    let it = this._it
    const map = this._map
    const limit = this._loops

    if (it) {
      next = it.next()
      if (next.done) {
        it = this._it = map.keys()
        next = it.next()
      }
    } else {
      it = this._it = map.keys()
      next = it.next()
    }

    const value = map.get(next.value)
    if (typeof remove === 'function') {
      if (remove(value.item)) {
        this._map.delete(next.value)
      }
    } else if (remove || (limit && ++value.count >= limit)) {
      this._map.delete(next.value)
    }
    return value.item
  }
}
