import React from 'react'
import { useState, useEffect } from 'react'
import Grid from './components/Grid'
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

const createGrid = (rows, cols) => {
  // Start with an empty grid
  let grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));

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
  for (let i = 0; i < rows*cols; i++) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * cols);
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

const aliveCount = (grid, i, j) => {
  const neighVals = neighbours(grid, i, j).map(([x, y]) => grid[x][y])
  return neighVals.reduce((a, b) => a + b, 0)
}

const rule2 = (prevGrid) => {
  let newGrid = prevGrid.map(row => [...row]);

  for (let i = 0; i < prevGrid.length; i++) {
    for (let j = 0; j < prevGrid[i].length; j++) {
      const aliveCells = aliveCount(prevGrid, i, j)
      const state = prevGrid[i][j]
      if (state === 0 && aliveCells === 3) {
        newGrid[i][j] = 1
      } else if (state === 1 && (aliveCells < 2 || aliveCells > 3)) {
        newGrid[i][j] = 0
      } else {
        newGrid[i][j] = state
      }
    }
  }

  return newGrid
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) return false
    }
  }
  return true
}

const App = () => {
  
  const [pixelSize, setPixelSizeState] = useState(2.5)
  // const yNumCells = Math.floor(window.innerWidth / pixelSize)
  // const xNumCells = Math.floor(window.innerHeight / pixelSize)
  const [xNumCells, setXNumCells] = useState(Math.floor(window.innerHeight/ pixelSize))
  const [yNumCells, setYNumCells] = useState(Math.floor(window.innerWidth / pixelSize))
  const [grid, setGrid] = useState(() => createGrid(xNumCells, yNumCells, false))
  console.log("GridSize: ", grid.length, grid[0].length)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let interval
    if (running) {
      interval = setInterval(() => {
        const nextGrid = rule2(grid)
        if (!arraysEqual(grid, nextGrid)) {
          setGrid(nextGrid)
        }
      }, 1)
    }
    return () => clearInterval(interval)
  }, [grid, running])

  
  useEffect(() => {
    const handleWheel = (event) => {
      // const factor = event.deltaY > 0 ? 1.1 : 0.9
      // const newPixelSize = pixelSize * factor;
      // console.log(newPixelSize)
      // setPixelSizeState(Math.min(Math.max(newPixelSize, 2.5)), 100)
      // setNumCells((prevNumCells) => {
      //   const factor = event.deltaY > 0 ? 1.1 : 0.9
      //   const newNumCells = prevNumCells * factor;
      //   console.log(newNumCells)
      //   return Math.max(Math.floor(newNumCells), 10)
      // });
      setPixelSizeState((prevPixelSize) => {
        const factor = event.deltaY > 0 ? 1.1 : 0.9
        const newPixelSize = prevPixelSize * factor;
        return Math.min(Math.max(newPixelSize, 2.5), 100)
      })
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let newXNumCells = Math.floor(screenHeight / pixelSize);
    let newYNumCells = Math.floor(screenWidth / pixelSize);

    if (newXNumCells * pixelSize < screenHeight) {
      newXNumCells = Math.ceil(screenHeight / pixelSize);
    }
    if (newYNumCells * pixelSize < screenWidth) {
      newYNumCells = Math.ceil(screenWidth / pixelSize);
    }
  
    setXNumCells(newXNumCells);
    setYNumCells(newYNumCells);
    setGrid(createGrid(newXNumCells,newYNumCells, false))
  }, [pixelSize]);

  // useEffect(() => {
  //   setGrid(createGrid(xNumCells, yNumCells, false))
  //   setRunning(false)
  // }, [numCells]);

  const handleReset = () => {
    setGrid(createGrid(xNumCells, yNumCells, false))
    setRunning(false)
  }

  return (
    <div >
    {/* <div style={{display: 'flex',  width: '100vw'}}> */}

      {/* <div style={{border: '1px solid red', display: 'flex', flex: 1, justifyContent:'center', alignItems: 'center', height: '100vh'}}> */}
      <div>
        <div>
          <div id='screen' style={{border: '1px solid red'}}>
            <Grid grid={grid} pixelSize={pixelSize}/>
          </div>
          <div id='control' style={{border: '1px solid red', display: 'flex', justifyContent: 'center'}}>
            <button onClick={() => setRunning(!running)}>{running ? 'Stop' : 'Start'}</button>
            <button onClick={() => handleReset()}>Reset</button>
            {pixelSize}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
