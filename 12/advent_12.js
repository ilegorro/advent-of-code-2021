'use strict'
const fs = require('fs')

function solution1(data) {
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

  const routes = []

  const findRoute = (point, route) => {
    route += `,${point}`
    const pointSet = cons.get(point)
    pointSet.forEach((el) => {
      const lowCase = el.match(/[a-z]+/)
      const routeSteps = route.split(',')
      if (el === 'end') {
        route += `,${el}`
        routes.push(route)
      } else if (!lowCase || !routeSteps.includes(el)) {
        findRoute(el, route)
      }
    })
  }

  const startSet = cons.get('start')
  startSet.forEach((el) => {
    findRoute(el, 'start')
  })

  return `Number of routes: ${routes.length}`
}

function solution2(data) {
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

  const routes = []

  const findRoute = (point, route) => {
    route += `,${point}`
    const pointSet = cons.get(point)
    pointSet.forEach((el) => {
      const lowCase = el.match(/[a-z]+/)
      const routeSteps = route.split(',')
      const allSmall = route.split(',').filter((step) => {
        return step !== 'start' && step !== 'end' && step.match(/[a-z]+/)
      })
      const allSmallSet = new Set(allSmall)
      const isSmallTwiceAttended = allSmall.length !== allSmallSet.size
      if (el === 'start') {
        return
      } else if (el === 'end') {
        route += ',end'
        routes.push(route)
      } else if (
        !lowCase ||
        !routeSteps.includes(el) ||
        !isSmallTwiceAttended
      ) {
        findRoute(el, route)
      }
    })
  }

  const startSet = cons.get('start')
  startSet.forEach((el) => {
    findRoute(el, 'start')
  })

  return `Number of routes: ${routes.length}`
}

const data = fs
  .readFileSync(`${__dirname}/advent_12_input.txt`, 'utf8')
  .split('\n')
  .map((el) => el.split('-'))

console.log(solution1(data))
console.log(solution2(data))
