'use strict'
const fs = require('fs')

function solution1(data) {
  const dict = new Map()
  const dictReverse = new Map()
  '0 1 2 3 4 5 6 7 8 9 A B C D E F'.split(' ').forEach((el) => {
    dict.set(el, parseInt(el, 16).toString(2).padStart(4, '0'))
    dictReverse.set(parseInt(el, 16).toString(2).padStart(4, '0'), el)
  })

  let binString = ''
  data.forEach((el) => {
    binString += dict.get(el)
  })

  const packetVersion = +dictReverse.get(
    binString.substring(0, 3).padStart(4, '0')
  )
  const packetTypeId = +dictReverse.get(
    binString.substring(3, 6).padStart(4, '0')
  )
  const isLiteralValue = packetTypeId === 4

  console.log({ packetVersion, packetTypeId, isLiteralValue })

  const parseLiteralValue = (literalValue) => {
    //console.log(literalValue)
    let resultBin = ''
    let keepReading = true
    while (keepReading) {
      const part = literalValue.substring(0, 5)
      literalValue = literalValue.substring(5)
      keepReading = part[0] === '1'
      resultBin += part.substring(1)
    }
    //console.log(resultBin)
    return resultBin
  }

  if (isLiteralValue) {
    let literalValue = binString.substring(6)
    const resultBin = parseLiteralValue(literalValue)
    console.log(parseInt(resultBin, 2))
  } else {
    const lengthTypeId = binString.substring(6, 7)
    let lengthInBits
    let numberOfSubPackets
    const values = []

    if (lengthTypeId === '0') {
      lengthInBits = parseInt(binString.substring(7, 22), 2)
      let subPackets = binString.substring(22)
      const resultBin1 = parseLiteralValue(subPackets.substring(6, 11))

      values.push(parseInt(resultBin1, 2))
      subPackets = subPackets.substring(11)

      const resultBin2 = parseLiteralValue(
        subPackets.substring(6, lengthInBits - 11)
      )
      values.push(parseInt(resultBin2, 2))
    } else {
      numberOfSubPackets = parseInt(binString.substring(7, 18), 2)
      let subPackets = binString.substring(18)
      for (let i = 0; i < numberOfSubPackets; i++) {
        const resultBin = parseLiteralValue(subPackets.substring(6, 11))
        values.push(parseInt(resultBin, 2))
        subPackets = subPackets.substring(11)
      }
    }
    console.log({ lengthInBits, numberOfSubPackets, values })
  }
}

function solution2(data) {}

const data = fs
  .readFileSync(`${__dirname}/advent_16_input_test.txt`, 'utf8')
  .split('')

solution1(data)
solution2(data)
