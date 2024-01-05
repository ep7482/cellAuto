import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'

// const createGrid = (rows, cols, half) => {
//   if (half) {
//     const grid = Array.from({ length: rows }, (_, rowIndex) =>
//       Array.from({ length: cols }, (_, colIndex) =>
//         rowIndex < rows / 2 ? true : false
//       )
//     )
//     return grid
//   }
//   // const grid = Array.from({ length: rows },
//   //   () =>Array.from({ length: cols },
//   //     () => Math.random() > 0.9))
//   // const grid = Array.from({ length: rows },
//   //   () =>Array.from({ length: cols },
//   //     () => false))

//     // Start with an empty grid
//     let grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));

//     // Define the glider pattern
//     const glider = [
//       [1, 0, 0],
//       [0, 1, 1],
//       [1, 1, 0]
//     ];
  
//     // Calculate the starting position for the glider so it's in the middle of the grid
//     const startRow = Math.floor(rows / 2) - 1;
//     const startCol = Math.floor(cols / 2) - 1;
  
//     // Place the glider pattern onto the grid
//     for (let i = 0; i < glider.length; i++) {
//       for (let j = 0; j < glider[i].length; j++) {
//         grid[startRow + i][startCol + j] = glider[i][j] === 1;
//       }
//     }
//   return grid
// }

const createGrid = () => {
  // Start with an empty grid
  let grid = Array.from({ length: 80 }, () => Array.from({ length: 80 }, () => 0));

  // Define the glider and small exploder patterns
  const glider = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
  ];

  // Place the glider pattern onto the grid at two different locations
  for (let i = 0; i < glider.length; i++) {
    for (let j = 0; j < glider[i].length; j++) {
      grid[i + 1][j + 1] = glider[i][j];
      // grid[i + 10][j + 15] = glider[i][j]; // Second glider
    }
  }

  // // Place the small exploder pattern onto the grid
  // for (let i = 0; i < smallExploder.length; i++) {
  //   for (let j = 0; j < smallExploder[i].length; j++) {
  //     grid[i + 3][j + 3] = smallExploder[i][j];
  //   }
  // }

  // Randomize some cells
  for (let i = 0; i < 1000; i++) {
    const x = Math.floor(Math.random() * 80);
    const y = Math.floor(Math.random() * 80);
    grid[x][y] = 1;
  }

  return grid;
}

const neighbours = (grid, x, y) => {
  const rows = grid.length
  const cols = grid[0].length
  const offsets = [-1, 0, 1]

  let neighbours = []

  offsets.forEach(dx => {
    offsets.forEach(dy => {
      if (dx !== 0 || dy !== 0) {
        const newX = ((x + dx % rows) + rows) % rows
        const newY = ((y + dy % cols) + cols) % cols
        neighbours.push([newX, newY])
      }
    })
  })
  // if (grid[x][y]) {
  //   console.log(grid[x][y], [x, y], neighbours)
  //   console.log(neighbours.map(([x, y]) => grid[x][y]))
  //   console.log(neighbours.map(([x, y]) => grid[x][y]).reduce((a, b) => a + b, 0))
  // }
  return neighbours
}

const rule1 = (prevGrid) => {
  const randLoc = [Math.floor(Math.random() * prevGrid.length), Math.floor(Math.random() * prevGrid[0].length)]
  const neighbors = neighbours(prevGrid, ...randLoc)
  const randNeigh = neighbors[Math.floor(Math.random() * neighbors.length)]

  const newGrid = [...prevGrid]
  newGrid[randLoc[0]] = [...prevGrid[randLoc[0]]]
  newGrid[randNeigh[0]] = [...prevGrid[randNeigh[0]]]

  const randLocVal = newGrid[randLoc[0]][randLoc[1]]
  const randNeighVal = newGrid[randNeigh[0]][randNeigh[1]]
  newGrid[randLoc[0]][randLoc[1]] = randNeighVal
  newGrid[randNeigh[0]][randNeigh[1]] = randLocVal

  if (JSON.stringify(newGrid) !== JSON.stringify(prevGrid)) {
    return newGrid;
  }
  return newGrid
}

const rule2 = (prevGrid) => {
  let newGrid = JSON.parse(JSON.stringify(prevGrid));

  for (let i = 0; i < prevGrid.length; i++) {
    for (let j = 0; j < prevGrid[i].length; j++) {
      const neighs = neighbours(prevGrid, i, j)
      const neighVals = neighs.map(([x, y]) => prevGrid[x][y])
      const aliveCount = neighVals.reduce((a, b) => a + b, 0)
      const state = prevGrid[i][j]

      // console.log("****************************************")
      // console.log(`Cell [${i}-${j}] Alive Count ${aliveCount} NeighVals ${neighVals}`)
  
      // const aliveCount = neighVals.map(bool => bool ? 1 : 0).reduce((a, b) => a + b, 0)
      if (state === 0 && aliveCount === 3) {
        newGrid[i][j] = 1
        // console.log('born', [i, j], aliveCount)
      } else if (state === 1 && (aliveCount < 2 || aliveCount > 3)) {
        newGrid[i][j] = 0
        // console.log('died', [i, j], aliveCount) 
      } else {
        // console.log('lived', [i, j], aliveCount)s
        newGrid[i][j] = state
      }
      // if (prevGrid[i][j] && deadCount === 3) {
      //   newGrid[i][j] = false
      // } else if (!prevGrid[i][j] && (deadCount < 2 || deadCount > 3)) {
      //   newGrid[i][j] = true
      // } else if (!prevGrid[i][j] && (deadCount === 2 || deadCount === 3))
      // continue
    }
  }

  return newGrid
}

const App = () => {
  const [grid, setGrid] = useState(() => createGrid(100, 100, false))
  const [highlighted, setHighlighted] = useState([])
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let interval
    if (running) {
      // const animationId = requestAnimationFrame(() => {
      //   setGrid((prevGrid) => {
      //     const newGrid = rule2(prevGrid)
      //     return newGrid
      //   })
      // })
      // return () => cancelAnimationFrame(animationId)
      interval = setInterval(() => {
        setGrid((prevGrid) => {
          return rule2(prevGrid)
        })
      }, 1)
    }
    return () => clearInterval(interval)
  }, [grid, running])

  const handleClick = (x, y) => {
    const neighbors = neighbours(grid, x, y)
    setHighlighted(neighbors.map(([x, y]) => `${x},${y}`))
    setTimeout(() => {
      setHighlighted([])
    }, 100)
  }

  const handleReset = () => {
    setGrid(createGrid(100, 100, false))
    setRunning(false)
  }

  const pixelSize = 10

  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, ${pixelSize}px)`}}>
        {grid.map((rows, i) =>
          rows.map((col, k) =>
            <div
              key={`${i}-${k}`}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: grid[i][k] ? 'white' : 'black',
                color: grid[i][k] ? 'black' : 'white',
                border: `solid 1px ${!grid[i][k] ? 'black' : 'white'}`
              }}
              onClick={() => {
                handleClick(i, k)
              }}
            >
              {/* {`${i}-${k}`} */}
            </div>
          )
        )}
      </div>
    <button onClick={() => setRunning(!running)}>{running ? 'Stop' : 'Start'}</button>
    <button onClick={() => handleReset()}>Reset</button>
  </>
  )
}

export default App
