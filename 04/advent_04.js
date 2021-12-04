'use strict'
const fs = require('fs')

function solution1(data) {
  const seq = data[0].split(',').map((element) => +element)
  const cards = data.slice(1).map((el) => {
    const rows = el.split(/\n/)
    return rows.map((elrow) => {
      return elrow
        .trim()
        .split(/\s+/)
        .map((element) => +element)
    })
  })
  let nums = []

  for (let index = 0; index < seq.length; index++) {
    const num = seq[index]
    nums.push(num)
    for (let i = 0; i < cards.length; i++) {
      const currentCard = cards[i]
      let winningCard = false
      for (let ii = 0; ii < 6; ii++) {
        if (ii < 5) {
          //check rows
          const restRow = currentCard[ii].filter(
            (rowEl) => !nums.includes(rowEl)
          )
          if (restRow.length === 0) {
            winningCard = true
          }
        }

        //check cols
        const col = currentCard.map((cardRow) => {
          return cardRow[ii]
        })
        const restCol = col.filter((colEl) => !nums.includes(colEl))
        if (restCol.length === 0) {
          winningCard = true
        }
      }
      if (winningCard) {
        const restCard = currentCard
          .flat()
          .filter((cardEl) => !nums.includes(cardEl))
        const sum = restCard.reduce((acc, elReduce) => {
          return (acc += elReduce)
        }, 0)
        return sum * num
      }
    }
  }
}

function solution2(data) {
  const seq = data[0].split(',').map((element) => +element)
  let cards = data.slice(1).map((el) => {
    const rows = el.split(/\n/)
    return rows.map((elrow) => {
      return elrow
        .trim()
        .split(/\s+/)
        .map((element) => +element)
    })
  })
  let nums = []
  let winningSum = 0

  for (let index = 0; index < seq.length; index++) {
    const num = seq[index]
    let winningCardsIdx = new Set()
    nums.push(num)
    for (let i = 0; i < cards.length; i++) {
      const currentCard = cards[i]
      for (let ii = 0; ii < 6; ii++) {
        if (ii < 5) {
          //check rows
          const restRow = currentCard[ii].filter(
            (rowEl) => !nums.includes(rowEl)
          )
          if (restRow.length === 0) {
            winningCardsIdx.add(i)
            const restCard = currentCard
              .flat()
              .filter((cardEl) => !nums.includes(cardEl))
            const sum = restCard.reduce((acc, elReduce) => {
              return (acc += elReduce)
            }, 0)
            winningSum = sum * num
          }
        }
        //check cols
        const col = currentCard.map((cardRow) => {
          return cardRow[ii]
        })
        const restCol = col.filter((colEl) => !nums.includes(colEl))
        if (restCol.length === 0) {
          winningCardsIdx.add(i)
          const restCard = currentCard
            .flat()
            .filter((cardEl) => !nums.includes(cardEl))
          const sum = restCard.reduce((acc, elReduce) => {
            return (acc += elReduce)
          }, 0)
          winningSum = sum * num
        }
      }
    }
    if (winningCardsIdx.size > 0) {
      cards = cards.filter((el, idx) => !winningCardsIdx.has(idx))
      winningCardsIdx.clear()
    }
  }
  return winningSum
}

const data = fs
  .readFileSync(`${__dirname}/advent_04_input.txt`, 'utf8')
  .split('\n\n')

console.log(solution1(data))
console.log(solution2(data))
