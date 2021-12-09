'use strict'
const fs = require('fs')

function solution1(data) {
  let result = 0
  for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
    const row = data[rowIdx]
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const element = data[rowIdx][colIdx]
      const neighbors = []
      if (rowIdx > 0) {
        neighbors.push(data[rowIdx - 1][colIdx])
      }
      if (rowIdx + 1 < data.length) {
        neighbors.push(data[rowIdx + 1][colIdx])
      }
      if (colIdx > 0) {
        neighbors.push(data[rowIdx][colIdx - 1])
      }
      if (colIdx + 1 < row.length) {
        neighbors.push(data[rowIdx][colIdx + 1])
      }
      if (Math.min(...neighbors) > element) {
        result += element + 1
      }
    }
  }
  return result
}
function solution2(data) {
  const lowPoints = []
  for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
    const row = data[rowIdx]
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const element = data[rowIdx][colIdx]
      const neighbors = []
      if (rowIdx > 0) {
        neighbors.push(data[rowIdx - 1][colIdx])
      }
      if (rowIdx + 1 < data.length) {
        neighbors.push(data[rowIdx + 1][colIdx])
      }
      if (colIdx > 0) {
        neighbors.push(data[rowIdx][colIdx - 1])
      }
      if (colIdx + 1 < row.length) {
        neighbors.push(data[rowIdx][colIdx + 1])
      }
      if (Math.min(...neighbors) > element) {
        lowPoints.push([rowIdx, colIdx])
      }
    }
  }

  const countPoints = (start, pointsGroup) => {
    const rowIdx = start[0]
    const colIdx = start[1]
    if (
      rowIdx >= 0 &&
      rowIdx < data.length &&
      colIdx >= 0 &&
      colIdx < data[rowIdx].length &&
      data[rowIdx][colIdx] !== 9 &&
      pointsGroup.filter((point) => point[0] === rowIdx && point[1] === colIdx)
        .length === 0
    ) {
      pointsGroup.push(start)
      countPoints([rowIdx - 1, colIdx], pointsGroup)
      countPoints([rowIdx + 1, colIdx], pointsGroup)
      countPoints([rowIdx, colIdx - 1], pointsGroup)
      countPoints([rowIdx, colIdx + 1], pointsGroup)
    }
  }

  const sizes = []
  lowPoints.forEach((point) => {
    const pointsGroup = []
    countPoints(point, pointsGroup)
    sizes.push(pointsGroup.length)
  })
  sizes.sort((a, b) => b - a)

  let result = 1
  for (let i = 0; i < 3; i++) {
    result *= sizes[i]
  }

  return result
}

const data = fs
  .readFileSync(`${__dirname}/advent_09_input.txt`, 'utf8')
  .split('\n')
  .map((el) => el.split('').map((elInner) => +elInner))

console.log(solution1(data))
console.log(solution2(data))
