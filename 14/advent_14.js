'use strict'
const fs = require('fs')

function solution1(data) {
  let result = data[0]
  const rules = data[1].split('\n').map((el) => el.split(' -> '))
  const steps = 10

  for (let step = 0; step < steps; step++) {
    const inserts = []
    rules.forEach((rule) => {
      let search = true
      let searchFrom = 0
      while (search) {
        const pos = result.indexOf(rule[0], searchFrom)
        if (pos === -1) {
          search = false
        } else {
          searchFrom = pos + 1
          inserts.push([pos, rule[1]])
        }
      }
    })

    const insertSeq = inserts.sort((a, b) => a[0] - b[0])
    const parts = []
    let startPos = 0
    for (let i = 0; i < insertSeq.length; i++) {
      const pos = insertSeq[i][0] + 1
      const val = insertSeq[i][1]
      parts.push(result.slice(startPos, pos))
      parts.push(val)
      startPos += 1
    }
    parts.push(result.slice(startPos, result.length))
    result = parts.join('')
  }

  const counter = new Map()
  for (let i = 0; i < result.length; i++) {
    const val = counter.get(result[i]) || 0
    counter.set(result[i], val + 1)
  }

  const freqs = [...counter.entries()].map((el) => el[1])
  console.log(Math.max(...freqs) - Math.min(...freqs))
}

function solution2(data) {
  let seq = data[0]
  const rules = data[1].split('\n').map((el) => el.split(' -> '))
  const steps = 40

  const pairs = []
  for (let i = 1; i < seq.length; i++) {
    pairs.push(`${seq[i - 1]}${seq[i]}`)
  }
  const countPairs = new Map()
  pairs.forEach((pair) => {
    const counter = countPairs.get(pair) || 0
    countPairs.set(pair, counter + 1)
  })

  const elements = seq.split('')
  const countElements = new Map()
  elements.forEach((element) => {
    const counter = countElements.get(element) || 0
    countElements.set(element, counter + 1)
  })

  for (let step = 0; step < steps; step++) {
    const newPairs = new Map()
    countPairs.forEach((value, key) => {
      if (value === 0) {
        return
      }
      const sub = rules.find((el) => {
        return el[0] === key
      })
      if (sub) {
        countPairs.set(key, 0)
        const pair1 = `${key[0]}${sub[1]}`
        const pair2 = `${sub[1]}${key[1]}`
        const countPair1 = newPairs.get(pair1) || 0
        const countPair2 = newPairs.get(pair2) || 0
        newPairs.set(pair1, countPair1 + value)
        newPairs.set(pair2, countPair2 + value)

        const elCounter = countElements.get(sub[1]) || 0
        countElements.set(sub[1], elCounter + value)
      }
    })
    newPairs.forEach((value, key) => {
      const counter = countPairs.get(key) || 0
      countPairs.set(key, counter + value)
    })
  }

  const freqs = [...countElements.entries()].map((el) => el[1])
  console.log(Math.max(...freqs) - Math.min(...freqs))
}

const data = fs
  .readFileSync(`${__dirname}/advent_14_input.txt`, 'utf8')
  .split('\n\n')

solution1(data)
solution2(data)
