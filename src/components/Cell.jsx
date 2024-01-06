import React, { useRef, useEffect } from 'react'

const Cell = ({ cellVal, pixelSize }) => {
	const canvasRef = useRef(null)
	
	useEffect(() => {
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')

		context.clearRect(0, 0, pixelSize, pixelSize)
		context.fillStyle = cellVal ? 'white' : 'black'
		context.fillRect(0, 0, pixelSize, pixelSize)
	}, [cellVal, pixelSize])

	return (
		<canvas ref={canvasRef} width={pixelSize} height={pixelSize} />
		// <div
		// style={{
		// 	width: pixelSize,
		// 	height: pixelSize,
		// 	backgroundColor: cellVal ? 'white' : 'black',
		// 	color: cellVal ? 'black' : 'white',
		// 	border: `solid 1px ${!cellVal ? 'black' : 'white'}`
		// }}
		// >
		// </div>
	)
}

export default Cell