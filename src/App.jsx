import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'

const createGrid = (rows, cols, half) => {
  if (half) {
    const grid = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) =>
        rowIndex < rows / 2 ? true : false
      )
    )
    return grid
  }
  const grid = Array.from({ length: rows },
    () =>Array.from({ length: cols },
      () => Math.random() > 0.5))
  return grid
}

// const neighbours = (grid, x, y) => {
//   const rows = grid.length
//   const cols = grid[0].length
//   const neighs = [[x - 1 < 0 ? x - 1 + rows : x - 1    , y - 1 < 0 ? y - 1 + cols : y - 1    ],
//                   [x - 1 < 0 ? x - 1 + rows : x - 1    , y                                   ], 
//                   [x - 1 < 0 ? x - 1 + rows : x - 1    , y + 1 >= cols ? y + 1 - cols : y + 1],
//                   [x                                   , y - 1 < 0 ? y - 1 + cols : y - 1    ],             
//                   [x                                   , y + 1 >= cols ? y + 1 - cols : y + 1],
//                   [x + 1 >= rows ? x + 1 - rows : x + 1, y - 1 < 0 ? y - 1 + cols : y - 1    ], 
//                   [x + 1 >= rows ? x + 1 - rows : x + 1, y                                   ], 
//                   [x + 1 >= rows ? x + 1 - rows : x + 1, y + 1 >= cols ? y + 1 - cols : y + 1]]
//   return neighs
// }

const neighbours = (grid, x, y) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const offsets = [-1, 0, 1];

  let neighbours = [];

  offsets.forEach(dx => {
    offsets.forEach(dy => {
      if (dx !== 0 || dy !== 0) {
        const newX = ((x + dx % rows) + rows) % rows;
        const newY = ((y + dy % cols) + cols) % cols;
        neighbours.push([newX, newY]);
      }
    });
  });

  return neighbours;
};

const App = () => {
  const [grid, setGrid] = useState(() => createGrid(50, 50, true))
  const [highlighted, setHighlighted] = useState([])
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let interval
    if (running) {
      interval = setInterval(() => {
        // const randLoc = [Math.floor(Math.random() * grid.length), Math.floor(Math.random() * grid[0].length)]
        // const neighbors = neighbours(grid, ...randLoc)
        // const randNeigh = neighbors[Math.floor(Math.random() * neighbors.length)]
        // // console.log("Before")
        // // console.log("         randLoc", randLoc, "randLocVal", grid[randLoc[0]][randLoc[1]])
        // // console.log("         randNeigh", randNeigh, "randNeighVal", grid[randNeigh[0]][randNeigh[1]])

        // const randLocVal = grid[randLoc[0]][randLoc[1]]
        // const randNeighVal = grid[randNeigh[0]][randNeigh[1]]
        // grid[randLoc[0]][randLoc[1]] = randNeighVal
        // grid[randNeigh[0]][randNeigh[1]] = randLocVal
        // // console.log("After")
        // // console.log("         randLoc", randLoc, "randLocVal", grid[randLoc[0]][randLoc[1]])
        // // console.log("         randNeigh", randNeigh, "randNeighVal", grid[randNeigh[0]][randNeigh[1]])
        // // console.log("****************************")
        setGrid((prevGrid) => {
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
        })
      }, 1)
      
    }
    return () => clearInterval(interval)
  }, [running])

  const handleClick = (x, y) => {
    const neighbors = neighbours(grid, x, y)
    setHighlighted(neighbors.map(([x, y]) => `${x},${y}`))
    setTimeout(() => {
      setHighlighted([])
    }, 1000)
  }

  const handleReset = () => {
    setGrid(createGrid(20, 20, true))
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
                backgroundColor: grid[i][k] ? 'purple' : 'yellow',
                // backgroundColor: highlighted.includes(`${i},${k}`) ? 'blue' : (grid[i][k] ? 'yellow' : undefined),
                // color: grid[i][k] ? 'purple' : undefined, 
                // backgroundColor: highlighted.includes(`${i},${k}`) ? 'blue' : (grid[i][k] ? 'yellow' : undefined),
                // border: 'solid 1px white'
                border: `solid 1px ${grid[i][k] ? 'purple' : 'yellow'}`
              }}
              onClick={() => {
                handleClick(i, k)
              }}
            >
              {/* {`${i},${k}`} */}
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
