'use strict'
const fs = require('fs')

function solution(data) {
  const grid = [...data]
  const rows = 10
  const columns = 10
  const steps = 300
  let flashes = 0
  let flashedPoints

  const handleStep = (pointRowIdx, pointColIdx) => {
    //console.log({ pointRowIdx, pointColIdx })
    //console.log(flashedPoints)
    const findInFlashed = flashedPoints.find((el) => {
      return el[0] === pointRowIdx && el[1] === pointColIdx
    })
    if (findInFlashed) {
      return
    }

    grid[pointRowIdx][pointColIdx]++

    if (grid[pointRowIdx][pointColIdx] === 10) {
      flashes++
      flashedPoints.push([pointRowIdx, pointColIdx])
      grid[pointRowIdx][pointColIdx] = 0
      if (pointRowIdx > 0) {
        // handle top row
        if (pointColIdx > 0) {
          handleStep(pointRowIdx - 1, pointColIdx - 1)
        }
        handleStep(pointRowIdx - 1, pointColIdx)
        if (pointColIdx < columns - 1) {
          handleStep(pointRowIdx - 1, pointColIdx + 1)
        }
      }
      if (pointRowIdx < rows - 1) {
        // handle bottom row
        if (pointColIdx > 0) {
          handleStep(pointRowIdx + 1, pointColIdx - 1)
        }
        handleStep(pointRowIdx + 1, pointColIdx)
        if (pointColIdx < columns - 1) {
          handleStep(pointRowIdx + 1, pointColIdx + 1)
        }
      }
      if (pointColIdx > 0) {
        // handle left
        handleStep(pointRowIdx, pointColIdx - 1)
      }
      if (pointColIdx < columns - 1) {
        // handle right
        handleStep(pointRowIdx, pointColIdx + 1)
      }
    }
  }

  let flashesAtStep100 = 0
  for (let step = 1; step <= steps; step++) {
    flashedPoints = []
    for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
      for (let colIdx = 0; colIdx < columns; colIdx++) {
        handleStep(rowIdx, colIdx)
      }
    }
    if (step === 100) {
      flashesAtStep100 = flashes
    }
    if (flashedPoints.length === 100) {
      console.log('All octopuses flash at step', step)
      break
    }
  }
  return `Flashes at step 100: ${flashesAtStep100}`
}

const data = fs
  .readFileSync(`${__dirname}/advent_11_input.txt`, 'utf8')
  .split('\n')
  .map((el) => el.split('').map((elem) => +elem))

console.log(solution(data))
