'use strict'
const fs = require('fs')

function solution(data) {
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

  let level = 0
  let packetVersionSum = 0
  let startState = { bits, pos: 0 }

  let keepGoing = true
  while (keepGoing) {
    let [keep] = readPacket(startState)
    keepGoing = keep
  }
  console.log('Part 1:', packetVersionSum)

  function readBits(state, num) {
    if (state.pos >= state.bits.length) {
      return false
    } else {
      let res = state.bits.slice(state.pos, state.pos + num)
      state.pos += num
      if (num === 3) {
        return parseInt(`0${res}`, 2)
      } else if (num === 5) {
        return res
      } else {
        return parseInt(res, 2)
      }
    }
  }

  function readPacket(state) {
    let version = readBits(state, 3)
    let type = readBits(state, 3)

    if (version === false || type === false) {
      return [false, 0]
    }
    packetVersionSum += version

    let packetValue = 0
    if (type === 4) {
      let num = ''
      while (true) {
        let chunk = readBits(state, 5)
        if (chunk) {
          num += chunk.slice(1)
        }
        if (!chunk || +chunk[0] === 0) break
      }
      packetValue = parseInt(num, 2)
    } else {
      const subPacketValues = []
      let lengthTypeId = readBits(state, 1)
      if (lengthTypeId === 0) {
        let length = readBits(state, 15)
        let sub = state.bits.slice(state.pos, state.pos + length)
        let subState = { bits: sub, pos: 0 }
        let keepGoing = true
        while (keepGoing) {
          level++
          let [keep, packetVal] = readPacket(subState)
          level--
          if (keep) {
            subPacketValues.push(packetVal)
          }
          keepGoing = keep
        }
        state.pos += length
      } else {
        let packetsCount = readBits(state, 11)
        for (let i = 0; i < packetsCount; i++) {
          level++
          let [, packetVal] = readPacket(state, subPacketValues)
          level--
          subPacketValues.push(packetVal)
        }
      }

      if (type === 0) {
        packetValue = subPacketValues.reduce((acc, val) => {
          return acc + val
        }, 0)
      } else if (type === 1) {
        packetValue = subPacketValues.reduce((acc, val) => {
          return acc * val
        }, 1)
      } else if (type === 2) {
        packetValue = Math.min(...subPacketValues)
      } else if (type === 3) {
        packetValue = Math.max(...subPacketValues)
      } else if (type === 5) {
        packetValue = subPacketValues[0] > subPacketValues[1] ? 1 : 0
      } else if (type === 6) {
        packetValue = subPacketValues[0] < subPacketValues[1] ? 1 : 0
      } else if (type === 7) {
        packetValue = subPacketValues[0] === subPacketValues[1] ? 1 : 0
      }
      if (level === 0 && packetValue) {
        console.log('Part 2:', packetValue)
      }
    }
    return [true, packetValue]
  }
}

const data = fs
  .readFileSync(`${__dirname}/advent_16_input.txt`, 'utf8')
  .split('')

solution(data)
