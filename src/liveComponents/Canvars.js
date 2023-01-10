import React from 'react'

const Canvars = () => {
    //canvas에 마우스로 그릴수 있는 리액트 코드 짜줘
    const drawRef = React.useRef(null)
    const [isDrawing, setIsDrawing] = React.useState(false)
    const [x, setX] = React.useState(0)
    const [y, setY] = React.useState(0)
    const [color, setColor] = React.useState('black')
    const [lineWidth, setLineWidth] = React.useState(5)

    // React.useEffect(() => {
    //     const canvas = drawRef.current
    //     canvas.width = window.innerWidth
    //     canvas.height = window.innerHeight
    // }, [])


    const handleMouseDown = (e) => {
        setIsDrawing(true)
        setX(e.nativeEvent.offsetX)
        setY(e.nativeEvent.offsetY)
    }

    const handleMouseMove = (e) => {
        if (isDrawing) {
            const canvas = drawRef.current
            const ctx = canvas.getContext('2d')
            ctx.strokeStyle = color
            ctx.lineWidth = lineWidth
            ctx.lineJoin = 'round'
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            ctx.closePath()
            ctx.stroke()
            setX(e.nativeEvent.offsetX)
            setY(e.nativeEvent.offsetY)
        }
    }

    const handleMouseUp = () => {
        setIsDrawing(false)
    }

    const handleMouseOut = () => {
        setIsDrawing(false)
    }

    const handleClear = () => {
        const canvas = drawRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const handleColor = (e) => {
        setColor(e.target.value)
    }

    const handleLineWidth = (e) => {
        setLineWidth(e.target.value)
    }

    const handleSave = () => {
        const canvas = drawRef.current
        const dataURL = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataURL
        a.download = 'canvas.png'
        a.click()
    }

  return (
    <div>
        <div>
            <button onClick={handleClear}>지우기</button>
            <button onClick={handleSave}>저장</button>
            <input type="color" value={color} onChange={handleColor} />
            <input type="range" min="1" max="50" value={lineWidth} onChange={handleLineWidth} />
        </div>
        <canvas
            ref={drawRef}
            width="640"
            height="400"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseOut}
        ></canvas>

    </div>
  )
}

export default Canvars