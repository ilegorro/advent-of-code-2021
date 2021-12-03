'use strict'
const fs = require('fs')

function solution1(data) {
  let gammaRate = ''
  let epsilonRate = ''
  let gammaRateCalc = Array(12).fill(0)
  data.forEach((el) => {
    for (let i = 0; i < 12; i++) {
      const bit = el[i]
      if (bit === '1') {
        gammaRateCalc[i]++
      } else {
        gammaRateCalc[i]--
      }
    }
  })
  for (let i = 0; i < 12; i++) {
    if (gammaRateCalc[i] > 0) {
      gammaRate += '1'
      epsilonRate += '0'
    } else {
      gammaRate += '0'
      epsilonRate += '1'
    }
  }
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

function solution2(data) {
  let dataOxygen = [...data]
  let dataCO2 = [...data]
  let oxygen = 0
  let co2 = Number.POSITIVE_INFINITY

  for (let i = 0; i < 12; i++) {
    let count = 0
    dataOxygen.forEach((el) => {
      const bit = el[i]
      if (bit === '1') {
        count++
      } else {
        count--
      }
    })
    dataOxygen = dataOxygen.filter((el) =>
      count >= 0 ? el[i] === '1' : el[i] === '0'
    )
    if (dataOxygen.length < 3) {
      dataOxygen.forEach((el) => {
        const val = parseInt(el, 2)
        oxygen = Math.max(val, oxygen)
      })
      break
    }
  }

  for (let i = 0; i < 12; i++) {
    let count = 0
    dataCO2.forEach((el) => {
      const bit = el[i]
      if (bit === '1') {
        count++
      } else {
        count--
      }
    })
    dataCO2 = dataCO2.filter((el) =>
      count >= 0 ? el[i] === '0' : el[i] === '1'
    )
    if (dataCO2.length < 3) {
      dataCO2.forEach((el) => {
        const val = parseInt(el, 2)
        co2 = Math.min(val, co2)
      })
      break
    }
  }
  return oxygen * co2
}

const data = fs
  .readFileSync(`${__dirname}/advent_03_input.txt`, 'utf8')
  .split('\n')

console.log(solution1(data))
console.log(solution2(data))
