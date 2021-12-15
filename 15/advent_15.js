'use strict'
const fs = require('fs')

function calcPoint(newPoint, pointValue, data, field, pointsToHandle) {
  const newPointValue = pointValue + data[newPoint[0]][newPoint[1]]
  if (
    !field[newPoint[0]][newPoint[1]] ||
    field[newPoint[0]][newPoint[1]] > newPointValue
  ) {
    field[newPoint[0]][newPoint[1]] = newPointValue

    const point = pointsToHandle.find(
      (el) => el[0][0] === newPoint[0] && el[0][1] === newPoint[1]
    )
    if (point) {
      point[1] = newPointValue
    }
  }
}

function pointIsHandled(point, handledPonts) {
  return !!handledPonts.find((el) => el[0] === point[0] && el[1] === point[1])
}

function handlePoint(pointsToHandle, handledPonts, field, data) {
  const currentPoint = pointsToHandle[0][0]
  const dim = data.length
  const pointValue = field[currentPoint[0]][currentPoint[1]]
  const neighbors = []
  handledPonts.push(currentPoint)
  let newPointData
  if (currentPoint[0] > 0) {
    newPointData = data[currentPoint[0] - 1][currentPoint[1]]
    neighbors.push([[currentPoint[0] - 1, currentPoint[1]], newPointData])
  }
  if (currentPoint[0] < dim - 1) {
    newPointData = data[currentPoint[0] + 1][currentPoint[1]]
    neighbors.push([[currentPoint[0] + 1, currentPoint[1]], newPointData])
  }
  if (currentPoint[1] > 0) {
    newPointData = data[currentPoint[0]][currentPoint[1] - 1]
    neighbors.push([[currentPoint[0], currentPoint[1] - 1], newPointData])
  }
  if (currentPoint[1] < dim - 1) {
    newPointData = data[currentPoint[0]][currentPoint[1] + 1]
    neighbors.push([[currentPoint[0], currentPoint[1] + 1], newPointData])
  }

  neighbors.sort((a, b) => a[1] - b[1])
  neighbors.forEach((el) => {
    if (!pointIsHandled(el[0], handledPonts)) {
      !!pointsToHandle.find(
        (elem) => elem[0][0] === el[0][0] && elem[0][1] === el[0][1]
      ) || pointsToHandle.push([el[0]])
      calcPoint(el[0], pointValue, data, field, pointsToHandle)
    }
  })
}

function solution1(data) {
  const dim = data.length
  const field = Array(dim)
    .fill(null)
    .map(() => Array(dim).fill(null))

  const startPoint = [0, 0]
  field[0][0] = 0
  const handledPonts = []
  const pointsToHandle = []
  pointsToHandle.push([startPoint])

  while (pointsToHandle.length) {
    pointsToHandle.sort((a, b) => a[1] - b[1])
    handlePoint(pointsToHandle, handledPonts, field, data)
    pointsToHandle.shift()
  }

  console.log(field[dim - 1][dim - 1])
}

function solution2(data) {
  const tileDim = data.length
  const bigData = Array(tileDim * 5)
    .fill(null)
    .map(() => Array(tileDim * 5).fill(0))

  for (let i = 0; i < tileDim; i++) {
    for (let j = 0; j < tileDim; j++) {
      bigData[i][j] = data[i][j]
    }
  }

  for (let col = 1; col < 5; col++) {
    for (let j = 0; j < tileDim; j++) {
      for (let k = 0; k < tileDim; k++) {
        const element = (bigData[j][tileDim * (col - 1) + k] + 1) % 10
        bigData[j][tileDim * col + k] = element || 1
      }
    }
  }

  for (let row = 1; row < 5; row++) {
    for (let j = 0; j < tileDim; j++) {
      for (let k = 0; k < tileDim * 5; k++) {
        const element = (bigData[tileDim * (row - 1) + j][k] + 1) % 10
        bigData[tileDim * row + j][k] = element || 1
      }
    }
  }

  const dim = bigData.length
  const field = Array(dim)
    .fill(null)
    .map(() => Array(dim).fill(null))

  const startPoint = [0, 0]
  field[0][0] = 0
  const handledPonts = []
  const pointsToHandle = []
  pointsToHandle.push([startPoint, 0])

  while (pointsToHandle.length) {
    pointsToHandle.sort((a, b) => a[1] - b[1])
    handlePoint(pointsToHandle, handledPonts, field, bigData)
    pointsToHandle.shift()
  }

  console.log(field[dim - 1][dim - 1])
}

const data = fs
  .readFileSync(`${__dirname}/advent_15_input.txt`, 'utf8')
  .split('\n')
  .map((el) => el.split('').map((elem) => +elem))

solution1(data)
solution2(data)
