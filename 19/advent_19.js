'use strict'
const fs = require('fs')

function solution(data) {
  data.map((el) =>
    el
      .shift()
      .split(',')
      .map((elem) => +elem)
  )
}

const data = fs
  .readFileSync(`${__dirname}/advent_19_input_test.txt`, 'utf8')
  .split('\n\n')

solution(data)
