'use strict'
const fs = require('fs')

function solution(data) {
  const xRange = data[0]
    .split('=')[1]
    .split('..')
    .map((el) => +el)
  const yRange = data[1]
    .split('=')[1]
    .split('..')
    .map((el) => +el)

  const inRange = (point) => {
    return (
      point[0] >= xRange[0] &&
      point[0] <= xRange[1] &&
      point[1] >= yRange[0] &&
      point[1] <= yRange[1]
    )
  }

  const maxY = []
  const shots = []
  for (let y = yRange[0]; y < yRange[1] + 500; y++) {
    for (let x = 1; x < 400; x++) {
      const vel = [x, y]
      let keep = true
      let point = [0, 0]
      let maxStepY = 0
      while (keep) {
        point[0] += vel[0]
        point[1] += vel[1]
        maxStepY = Math.max(maxStepY, point[1])
        if (vel[0] !== 0) {
          vel[0] = vel[0] > 0 ? vel[0] - 1 : vel[0] + 1
        }
        vel[1] = vel[1] - 1
        if (inRange(point)) {
          shots.push([x, y])
          maxY.push(maxStepY)
          keep = false
        } else if (point[0] > xRange[1] || point[1] < yRange[0]) {
          keep = false
        }
      }
    }
  }

  console.log('Part 1:', Math.max(...maxY))
  console.log('Part 2:', shots.length)
}

const data = fs
  .readFileSync(`${__dirname}/advent_17_input.txt`, 'utf8')
  .split(': ')[1]
  .split(', ')

solution(data)
