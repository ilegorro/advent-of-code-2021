'use strict'
const fs = require('fs')

function solution(data) {
  const dots = data[0].map((el) => el.split(',').map((el1) => +el1))
  const folds = data[1].map((el) => el.split(' ')[2].split('='))
  for (let i = 0; i < folds.length; i++) {
    const foldDirection = folds[i][0]
    const foldValue = +folds[i][1]
    dots.forEach((dot) => {
      if (foldDirection === 'x') {
        if (dot[0] > foldValue) {
          dot[0] = foldValue - (dot[0] - foldValue)
        }
      } else {
        if (dot[1] > foldValue) {
          dot[1] = foldValue - (dot[1] - foldValue)
        }
      }
    })
    if (i === 0) {
      const dotsSetOneFold = new Set(dots.map((el) => el.join(',')))
      console.log('After 1 fold:', dotsSetOneFold.size)
    }
  }
  const dotsSet = new Set(dots.map((el) => el.join(',')))
  const drawDots = Array.from(dotsSet).map((el) => el.split(','))

  const field = new Array(50)
  for (let i = 0; i < field.length; i++) {
    field[i] = new Array(50).fill(' ')
  }

  drawDots.forEach((dot) => {
    field[+dot[0]][+dot[1]] = '*'
  })

  console.log(field.map((el) => el.join('')))
  //HGAJBEHC
}

const data = fs
  .readFileSync(`${__dirname}/advent_13_input.txt`, 'utf8')
  .split('\n\n')
  .map((el) => el.split('\n'))

solution(data)
