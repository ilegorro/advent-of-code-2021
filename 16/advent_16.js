'use strict'
const fs = require('fs')

function solution1(data) {
  const dict = new Map()
  const dictReverse = new Map()
  '0 1 2 3 4 5 6 7 8 9 A B C D E F'.split(' ').forEach((el) => {
    dict.set(el, parseInt(el, 16).toString(2).padStart(4, '0'))
    dictReverse.set(parseInt(el, 16).toString(2).padStart(4, '0'), el)
  })

  let bits = ''
  data.forEach((el) => {
    bits += dict.get(el)
  })

  let packetVersionSum = 0
  let startState = { bits, pos: 0 }
  let keepGoing = true
  while (keepGoing) {
    keepGoing = readPacket(startState)
  }
  console.log(packetVersionSum)

  function readBits(state, num) {
    if (state.pos === state.bits.length) {
      return false
    } else {
      let res = state.bits.slice(state.pos, state.pos + num)
      state.pos += num
      if (num === 3) {
        return parseInt(`0${res}`, 2)
      } else if (num === 5) {
        return +res[0]
      } else {
        return parseInt(res, 2)
      }
    }
  }

  function readPacket(state) {
    let version = readBits(state, 3)
    let type = readBits(state, 3)
    if (version === false || type === false) return false

    packetVersionSum += version

    if (type === 4) {
      while (true) {
        let chunkStart = readBits(state, 5)
        if (chunkStart === 0) break
      }
    } else {
      let lengthTypeId = readBits(state, 1)
      if (lengthTypeId === 0) {
        let length = readBits(state, 15)
        let sub = state.bits.slice(state.pos, state.pos + length)
        let subState = { bits: sub, pos: 0 }
        let keepGoing = true
        while (keepGoing) {
          keepGoing = readPacket(subState)
        }
        state.pos += length
      } else {
        let packetsCount = readBits(state, 11)
        for (let i = 0; i < packetsCount; i++) readPacket(state)
      }
    }
    return true
  }
}

function solution2(data) {}

const data = fs
  .readFileSync(`${__dirname}/advent_16_input.txt`, 'utf8')
  .split('')

solution1(data)
solution2(data)
