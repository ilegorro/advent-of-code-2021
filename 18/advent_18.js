'use strict'
const fs = require('fs')

function solution(data) {
  //explode first pair nested in 4 pars
  //split first regular number >= 10
  //eplode after each split until no pairs to explode
  const findPairToExplode = (str) => {
    let nest = 0
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '[') {
        nest++
        if (nest > 4) {
          for (let j = i + 1; j < str.length; j++) {
            if (str[j] === '[') {
              break
            } else if (str[j] === ']') {
              return [i, j]
            }
          }
        }
      } else if (str[i] === ']') {
        nest--
      }
    }
  }

  const findLeftNumber = (str, startPos) => {
    const regNumRegex = /\[[0-9]+\,\[|\]\,[0-9]+\]/
    const regex = new RegExp(regNumRegex, 'g')
    let lastIndex = 0

    const searchString = str.slice(0, startPos + 1)
    while (regex.test(searchString)) {
      lastIndex = regex.lastIndex
    }
    if (lastIndex) {
      const digits = []
      let numStarted = false
      for (let i = lastIndex - 1; i > 0; i--) {
        if (str[i].match(/[0-9]+/)) {
          digits.push(str[i])
          numStarted = true
        } else if (numStarted) {
          return [digits.reverse().join(''), i]
        }
      }
    }
  }

  const findRightNumber = (str, startPos) => {
    const regNumRegex = /\[[0-9]+\,\[|\]\,[0-9]+\]/
    const posNumGroup = str.slice(startPos).search(regNumRegex)
    const numGroup = str.slice(startPos).match(regNumRegex)
    if (posNumGroup !== -1) {
      const num = numGroup[0].match(/[0-9]+/)[0]
      const posNum = numGroup[0].indexOf(num)
      return [num, startPos + posNumGroup + posNum - 1]
    }
  }

  function explode(str) {
    const pairToExplodeIdx = findPairToExplode(str)
    if (pairToExplodeIdx) {
      const pairToExplode = str.substring(
        pairToExplodeIdx[0],
        pairToExplodeIdx[1] + 1
      )
      const numsToExplode = pairToExplode
        .split(',')
        .map((el) => +el.match(/[0-9]+/)[0])
      //console.log(pairToExplode)

      const leftNumber = findLeftNumber(str, pairToExplodeIdx[0])
      const rightNumber = findRightNumber(str, pairToExplodeIdx[1])

      let shift = 0

      if (leftNumber) {
        const oldLeftNumberLength = leftNumber[0].length
        const newLeftNumberLength = String(
          +leftNumber[0] + numsToExplode[0]
        ).length
        shift = newLeftNumberLength - oldLeftNumberLength

        str =
          str.slice(0, leftNumber[1] + 1) +
          (+leftNumber[0] + numsToExplode[0]) +
          str.slice(leftNumber[0].length + 1 + leftNumber[1])
      }

      if (rightNumber) {
        str =
          str.slice(0, rightNumber[1] + 1 + shift) +
          (+rightNumber[0] + numsToExplode[1]) +
          str.slice(rightNumber[0].length + 1 + shift + rightNumber[1])
      }

      str =
        str.slice(0, pairToExplodeIdx[0] + shift) +
        '0' +
        str.slice(pairToExplodeIdx[1] + shift + 1)

      console.log('after explode', str)
      return [true, str]
    }
    return [false, str]
  }

  function split(str) {
    const bigNumRegex = /[0-9]{2,}/
    const posBigNum = str.search(bigNumRegex)
    if (posBigNum !== -1) {
      const numGroup = str.match(bigNumRegex)
      const numLen = numGroup.length
      const leftNum = Math.floor(+numGroup / 2)
      const rightNum = Math.ceil(+numGroup / 2)

      const newStr =
        str.slice(0, posBigNum) +
        `[${leftNum},${rightNum}]` +
        str.slice(posBigNum + numLen + 1)

      console.log('after split', newStr)
      return [true, newStr]
    }

    return [false, str]
  }

  function handleSum(sum) {
    let keep = true
    let splitted = false
    while (keep) {
      ;[keep, sum] = explode(sum)
      //console.log(sum)
    }
    ;[splitted, sum] = split(sum)

    if (splitted) {
      sum = handleSum(sum)
    }
    return sum
  }

  let sum = data[0]
  for (let i = 1; i < data.length; i++) {
    sum = `[${sum},${data[i]}]`
    console.log('before:', sum)
    sum = handleSum(sum)
    console.log('after', sum)
  }
}

const data = fs
  .readFileSync(`${__dirname}/advent_18_input_test.txt`, 'utf8')
  .split('\n')

solution(data)
