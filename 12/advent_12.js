'use strict'
const fs = require('fs')

function solution(data) {
  const cons = new Map()
  data.forEach((el) => {
    const left = el[0]
    const right = el[1]
    const leftSet = cons.get(left) || new Set()
    leftSet.add(right)
    const rightSet = cons.get(right) || new Set()
    rightSet.add(left)
    cons.set(left, leftSet)
    cons.set(right, rightSet)
  })
  console.log(cons)

  let visitedPoints
  const routes = []

  const findRoute = (point, route) => {
    if (point[0].match(/[a-z]/)) {
      visitedPoints.push(point)
    }
    route += `${point}-`
    const pointSet = cons.get(point)
    pointSet.forEach((el) => {
      if (el === 'end') {
        route += 'end'
        console.log(visitedPoints)
        console.log(route)
        routes.push(route)
      } else if (!visitedPoints.includes(el)) {
        findRoute(el, route)
      }
    })
  }

  const startSet = cons.get('start')
  startSet.forEach((el) => {
    visitedPoints = ['start']
    findRoute(el, 'start-')
  })

  //console.log(routes)
  console.log(routes.length)
}

const data = fs
  .readFileSync(`${__dirname}/advent_12_input_test.txt`, 'utf8')
  .split('\n')
  .map((el) => el.split('-'))

console.log(solution(data))
