'use strict'
const fs = require('fs')

// function parseLiteralValue(literalValue) {
//   let resultBin = ''
//   let keepReading = true
//   while (keepReading) {
//     const part = literalValue.substring(0, 5)
//     literalValue = literalValue.substring(5)
//     keepReading = part[0] === '1'
//     resultBin += part.substring(1)
//   }
//   return resultBin
// }

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

  let packetVersionSum = 0
  handlePacket(binString)
  console.log(packetVersionSum)

  function handlePacket(packet, counter) {
    console.log(packet)
    if (typeof counter === 'number') {
      if (counter === 0) {
        counter = undefined
        return
      } else {
        counter--
      }
    }

    const packetVersion = +dictReverse.get(
      packet.substring(0, 3).padStart(4, '0')
    )
    packetVersionSum += packetVersion
    const packetTypeId = +dictReverse.get(
      packet.substring(3, 6).padStart(4, '0')
    )

    console.log({ packetVersion })

    if (packetTypeId === 4) {
      console.log('literal')
      let literalValue = packet.substring(6)
      let resultBin = ''
      let keepReading = true
      while (keepReading) {
        const part = literalValue.substring(0, 5)
        literalValue = literalValue.substring(5)
        keepReading = part[0] === '1'
        resultBin += part.substring(1)
      }

      if (literalValue.length > 6) {
        handlePacket(literalValue, counter)
      }
    } else {
      const lengthTypeId = packet.substring(6, 7)
      if (lengthTypeId === '0') {
        const lengthInBits = parseInt(packet.substring(7, 22), 2)
        console.log('lengthInBits:', lengthInBits)
        let subPackets = packet.substring(22)
        handlePacket(subPackets.substring(0, lengthInBits))
      } else {
        const numberOfSubPackets = parseInt(packet.substring(7, 18), 2)
        let subPackets = packet.substring(18)
        console.log('numberOfSubPackets:', numberOfSubPackets)
        handlePacket(subPackets, numberOfSubPackets)
      }
    }
  }
}

function solution2(data) {}

const data = fs
  .readFileSync(`${__dirname}/advent_16_input_test.txt`, 'utf8')
  .split('')

solution1(data)
solution2(data)
