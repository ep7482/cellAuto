// import React, { useState } from 'react'
// import Cell from './Cell'

// const Grid = ({ grid, pixelSize }) => {
// 	return (
// 		<div style={{display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, ${pixelSize}px)`}}>
// 		{grid.map((rows, i) =>
// 			rows.map((col, k) =>
// 				<Cell cellVal={grid[i][k]} pixelSize={pixelSize} key={`${i}-${k}`} />
// 			)
// 		)}
// 	</div>
// 	)
// }

import React, { useRef, useEffect } from 'react';
import  { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Grid = ({ grid, pixelSize}) => {
  const canvasRef = useRef(null);
	// let lastX = canvasRef.current ? canvasRef.current.width / 2 : 0
	// let lastY = canvasRef.current ? canvasRef.current.height / 2 : 0
	// let dragStart, dragged

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

		// const canvas = new fabric.Canvas('canvas', { selection: false });
		
		// for (let i = 0; i < grid.length; i++) {
		// 	for (let j = 0; j < grid[i].length; j++) {
		// 		// Vertical line
		// 		canvas.add(new fabric.Line([i * pixelSize, 0, i * pixelSize, grid.length * pixelSize], { stroke: '#ccc', selectable: false }));
		// 		// Horizontal line
		// 		canvas.add(new fabric.Line([0, j * pixelSize, grid[i].length * pixelSize, j * pixelSize], { stroke: '#ccc', selectable: false }));
		// 	}
		// }

		// let zoom = 1;
    // canvas.on('mouse:wheel', function(opt) {
    //   const delta = opt.e.deltaY;
    //   zoom = canvas.getZoom();
    //   zoom *= 0.999 ** delta;
    //   if (zoom > 20) zoom = 20;
    //   if (zoom < 0.01) zoom = 0.01;
    //   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //   opt.e.preventDefault();
    //   opt.e.stopPropagation();
    // });

    // let panning = false;
    // canvas.on('mouse:down', function(opt) {
    //   panning = true;
    //   canvas.setCursor('grab');
    //   canvas.renderAll();
    // });

		// canvas.on('mouse:up', function(opt) {
    //   panning = false;
    //   canvas.setCursor('default');
    //   canvas.renderAll();
    // });

    // canvas.on('mouse:move', function(opt) {
    //   if (panning && opt.e.buttons) {
    //     const delta = new fabric.Point(opt.e.movementX, opt.e.movementY);
    //     canvas.relativePan(delta);
    //   }
    // });

		// const handleMouseDown = (event) => {
		// 	lastX = event.offsetX || (event.pageX - canvas.offsetLeft)
		// 	lastY = event.offsetY || (event.pageY - canvas.offsetTop)
		// 	dragStart = context.transformedPoint(lastX, lastY)
		// 	dragged = false
		// }

		// const handleMouseUp = (event) => {
		// 	dragStart = null
		// 	if (!dragged) zoom(event.shiftKey ? -1 : 1)
		// }

		// const handleMouseMove = (event) => {
		// 	lastX = event.offsetX || (event.pageX - canvas.offsetLeft)
		// 	lastY = event.offsetY || (event.pageY - canvas.offsetTop)
		// 	dragged = true
		// 	if (dragStart) {
		// 		const pt = context.transformedPoint(lastX, lastY)
		// 		context.translate(pt.x - dragStart.x, pt.y - dragStart.y)
		// 		drawScene(context, grid, pixelSize)
		// 	}
		// }

		// const zoom = (clicks) => {
		// 	const factor = 1.1
		// 	const pt = context.transformedPoint(lastX, lastY)
		// 	context.translate(pt.x, pt.y)
		// 	const scale = Math.pow(factor, clicks)
		// 	context.scale(scale, scale)
		// 	context.translate(-pt.x, -pt.y)
		// 	
		// }

		// const handleScroll = (event) => {
		// 	const delta = event.wheelDelta ? event.wheelDelta / 40 : event.detail ? -event.detail : 0
		// 	if (delta) zoom(delta)
		// 	return event.preventDefault() && false
		// }

		// canvas.addEventListener('mousedown', handleMouseDown, false)
		// canvas.addEventListener('mouseup', handleMouseUp, false)
		// canvas.addEventListener('mousemove', handleMouseMove, false)
		// canvas.addEventListener('wheel', handleScroll, false)

		
		// return () => {
		// 	canvas.removeEventListener('mousedown', handleMouseDown, false)
		// 	canvas.removeEventListener('mouseup', handleMouseUp, false)
		// 	canvas.removeEventListener('mousemove', handleMouseMove, false)
		// 	canvas.removeEventListener('wheel', handleScroll, false)
		// }
		drawScene(context, grid, pixelSize)
  }, [grid, pixelSize]);

	const drawScene = (context, grid, pixelSize) => {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        context.fillStyle = !grid[i][j] ? 'white' : 'black';
        context.fillRect(j * pixelSize, i * pixelSize, pixelSize + 1, pixelSize + 1);
      }
    }
	}

	// function drawScene(canvas, grid, cellSize) {

	// 	canvas.clear();
	
	// 	// Draw the grid
	// 	const gridLines = [];
	// 	for (let i = 0; i < grid.length; i++) {
	// 		for (let j = 0; j < grid[i].length; j++) {
	// 			// Vertical line
	// 			gridLines.push(new fabric.Line([i * cellSize, 0, i * cellSize, grid.length * cellSize], { stroke: '#ccc', selectable: false }));
	// 			// Horizontal line
	// 			gridLines.push(new fabric.Line([0, j * cellSize, grid[i].length * cellSize, j * cellSize], { stroke: '#ccc', selectable: false }));
	// 		}
	// 	}
	// 	const gridGroup = new fabric.Group(gridLines, { selectable: false });
	// 	canvas.add(gridGroup);
	// }

  return (
		// <ZoomPanPinch>
		// 	<canvas
		// 		ref={canvasRef}
		// 		width={window.innerWidth}
		// 		height={window.innerHeight}
		// 	/>
		// </ZoomPanPinch>
		<canvas
			ref={canvasRef}
			width={window.innerWidth}
			height={window.innerHeight}
		/>
  );
};

// const Grid = ({ grid, pixelSize }) => {
//   useEffect(() => {
//     const stage = new Konva.Stage({
//       container: 'container',
//       width: window.innerWidth,
//       height: window.innerHeight,
//     });

//     const layer = new Konva.Layer();
//     stage.add(layer);

//     // Draw the grid
//     for (let i = 0; i < grid.length; i++) {
//       for (let j = 0; j < grid[i].length; j++) {
//         const lineV = new Konva.Line({
//           points: [i * pixelSize, 0, i * pixelSize, grid.length * pixelSize],
//           stroke: '#ccc',
//         });
//         layer.add(lineV);

//         const lineH = new Konva.Line({
//           points: [0, j * pixelSize, grid[i].length * pixelSize, j * pixelSize],
//           stroke: '#ccc',
//         });
//         layer.add(lineH);
//       }
//     }

//     // Zooming and Panning
//     stage.on('wheel', (e) => {
//       e.evt.preventDefault();
//       const oldScale = stage.scaleX();

//       const mousePointTo = {
//         x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
//         y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
//       };

//       const newScale = e.evt.deltaY > 0 ? oldScale * 1.1 : oldScale * 0.9;

//       stage.scale({ x: newScale, y: newScale });

//       const newPos = {
//         x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
//         y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
//       };
//       stage.position(newPos);
//       stage.batchDraw();
//     });

//     stage.on('dragstart dragmove', () => {
//       stage.container().style.cursor = 'move';
//     });

//     stage.on('dragend', () => {
//       stage.container().style.cursor = 'default';
//     });

//     stage.draggable(true);
//   }, [grid, pixelSize]);

//   return <div id="container" />;
// };

export default Grid;
