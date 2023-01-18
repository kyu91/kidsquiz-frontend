import { border } from "@mui/system"
import React, { useCallback, useEffect, useRef, useState } from "react"
import "./css/Puzzle.css"
import socket from "./socketExport"

function Puzzle({puzzleurl,setpuzzleurl}) {

  // socket.on("puzzleStart", function(data) {
  //   setpuzzleurl(data)
  // })

  // props.url

  // const [tempvalue, settempvalue] = useState('0')

  const clamp = (value, min, max) => {
    if (value < min) {
      return min
    }
    if (value > max) {
      return max
    }
    return value
  }
  const solveTolerancePercentage = 0.028

  const JigsawPuzzle = ({
    imageSrc,
    rows = 2,
    columns = 2,
    onSolved = () => {}
  }) => {
    const [tiles, setTiles] = useState()
    const [imageSize, setImageSize] = useState()
    const [rootSize, setRootSize] = useState()
    const [calculatedHeight, setCalculatedHeight] = useState()
    const rootElement = useRef()
    const resizeObserver = useRef()
    const draggingTile = useRef()
    const draggingTileBYS = useRef()
    const onImageLoaded = useCallback(
      image => {
        setImageSize({ width: image.width, height: image.height })
        if (rootSize) {
          setCalculatedHeight((rootSize.width / image.width) * image.height)
        }
        setTiles(
          Array.from(Array(rows * columns).keys()).map(position => ({
            correctPosition: position,
            tileHeight: image.height / rows,
            tileWidth: image.width / columns,
            tileOffsetX: (position % columns) * (image.width / columns),
            tileOffsetY: Math.floor(position / columns) * (image.height / rows),
            currentPosXPerc: Math.random() * (1 - 1 / rows),
            currentPosYPerc: Math.random() * (1 - 1 / columns),
            solved: false
          }))
        )
      },
      [rows, columns]
    )

    const onRootElementResized = useCallback(
      args => {
        const contentRect = args.find(it => it.contentRect)?.contentRect
        if (contentRect) {
          setRootSize({
            width: contentRect.width,
            height: contentRect.height
          })
          if (imageSize) {
            setCalculatedHeight(
              (contentRect.width / imageSize.width) * imageSize.height
            )
          }
        }
      },
      [setRootSize, imageSize]
    )

    const onRootElementRendered = useCallback(
      element => {
        if (element) {
          rootElement.current = element
          const observer = new ResizeObserver(onRootElementResized)
          observer.observe(element)
          resizeObserver.current = observer
          setRootSize({
            width: element.offsetWidth,
            height: element.offsetHeight
          })
          if (imageSize) {
            setCalculatedHeight(
              (element.offsetWidth / imageSize.width) * imageSize.height
            )
          }
        }
      },
      [setRootSize, imageSize, rootElement, resizeObserver]
    )

    useEffect(() => {
      const image = new Image()
      image.onload = () => onImageLoaded(image)
      image.src = imageSrc
    }, [imageSrc, rows, columns])

    const onTileMouseDown = useCallback(
      (tile, event) => {
        if (!tile.solved) {
          if (event.type === "touchstart") {
            document.documentElement.style.setProperty("overflow", "hidden")
          }
          // console.log(tile.correctPosition);
          const eventPos = {
            x: event.pageX ?? event.touches[0].pageX,
            y: event.pageY ?? event.touches[0].pageY
          }
          draggingTile.current = {
            tile,
            elem: event.target,
            mouseOffsetX: eventPos.x - event.target.getBoundingClientRect().x,
            mouseOffsetY: eventPos.y - event.target.getBoundingClientRect().y
          }
          event.target.classList.add("jigsaw-puzzle__piece--dragging")
        }
      },
      [draggingTile]
    )

    const onRootMouseMove = useCallback(
      event => {
        if (draggingTile.current) {
          event.stopPropagation()
          event.preventDefault()
          const eventPos = {
            x: event.pageX ?? event.touches[0].pageX,
            y: event.pageY ?? event.touches[0].pageY
          }

          const draggedToRelativeToRoot = {
            x: clamp(
              eventPos.x -
                rootElement.current.getBoundingClientRect().left -
                draggingTile.current.mouseOffsetX,
              0,
              rootSize.width - draggingTile.current.elem.offsetWidth
            ),
            y: clamp(
              eventPos.y -
                rootElement.current.getBoundingClientRect().top -
                draggingTile.current.mouseOffsetY,
              0,
              rootSize.height - draggingTile.current.elem.offsetHeight
            )
          }

          const movepuzzledata = {
            tileCopos: draggingTile.current.tile,
            tileId: event.target.id,
            tileXval: draggedToRelativeToRoot.x,
            tileYval: draggedToRelativeToRoot.y
          }
          socket.emit("move-puzzle", movepuzzledata)

          // console.log(draggedToRelativeToRoot.x);
          draggingTile.current.elem.style.setProperty(
            "left",
            `${draggedToRelativeToRoot.x}px`
          )
          draggingTile.current.elem.style.setProperty(
            "top",
            `${draggedToRelativeToRoot.y}px`
          )
        }
      },
      [draggingTile, rootSize]
    )

    let movingdata

    socket.on("movesinglepuzzle", data => {
      movingdata = data
      // settempvalue(tempvalue+1)
      moving()
    })

    function moving() {
      const { tileCopos, tileId, tileXval, tileYval } = movingdata

      draggingTileBYS.current = {
        tile: tileCopos,
        elem: document.getElementById(tileId)
      }

      draggingTileBYS.current.elem.style.setProperty("left", `${tileXval}px`)
      draggingTileBYS.current.elem.style.setProperty("top", `${tileYval}px`)
    }

    const onRootMouseUp = useCallback(
      event => {
        if (draggingTile.current) {
          if (event.type === "touchend") {
            document.documentElement.style.removeProperty("overflow")
          }
          draggingTile.current?.elem.classList.remove(
            "jigsaw-puzzle__piece--dragging"
          )
          const draggedToPercentage = {
            x: clamp(
              draggingTile.current.elem.offsetLeft / rootSize.width,
              0,
              1
            ),
            y: clamp(
              draggingTile.current.elem.offsetTop / rootSize.height,
              0,
              1
            )
          }
          const draggedTile = draggingTile.current.tile
          const targetPositionPercentage = {
            x: (draggedTile.correctPosition % columns) / columns,
            y: Math.floor(draggedTile.correctPosition / columns) / rows
          }
          const isSolved =
            Math.abs(targetPositionPercentage.x - draggedToPercentage.x) <=
              solveTolerancePercentage &&
            Math.abs(targetPositionPercentage.y - draggedToPercentage.y) <=
              solveTolerancePercentage

          const clickpuzzledata = {
            tileCopos: draggingTile.current.tile.correctPosition,
            tileId: event.target.id,
            rootSizeW: rootSize.width,
            rootSizeH: rootSize.height
          }
          socket.emit("clickup-puzzle", clickpuzzledata)
          console.log("clickup-emit")

          setTiles(prevState => {
            const newState = [
              ...prevState.filter(
                it => it.correctPosition !== draggedTile.correctPosition
              ),
              {
                ...draggedTile,
                currentPosXPerc: !isSolved
                  ? draggedToPercentage.x
                  : targetPositionPercentage.x,
                currentPosYPerc: !isSolved
                  ? draggedToPercentage.y
                  : targetPositionPercentage.y,
                solved: isSolved
              }
            ]
            if (newState.every(tile => tile.solved)) {
              onSolved()
            }
            return newState
          })
          draggingTile.current = undefined
        }
      },
      [draggingTile, setTiles, rootSize, onSolved]
    )

    let solveddata

    socket.on("solvedpuzzle", data => {
      console.log("solvedpuzzle 진입")
      solveddata = data
      clickon()
      console.log("solved")
      console.log(data)
    })

    function clickon() {
      const { rootSizeW, rootSizeH } = solveddata
      if (draggingTileBYS.current) {
        const draggedToPercentageBYS = {
          x: clamp(draggingTileBYS.current.elem.offsetLeft / rootSizeW, 0, 1),
          y: clamp(draggingTileBYS.current.elem.offsetTop / rootSizeH, 0, 1)
        }
        console.log("함수내부 1")
        const draggedTileBYS = draggingTileBYS.current.tile
        const targetPositionPercentageBYS = {
          x: (draggedTileBYS.correctPosition % columns) / columns,
          y: Math.floor(draggedTileBYS.correctPosition / columns) / rows
        }
        const isSolved =
          Math.abs(targetPositionPercentageBYS.x - draggedToPercentageBYS.x) <=
            solveTolerancePercentage &&
          Math.abs(targetPositionPercentageBYS.y - draggedToPercentageBYS.y) <=
            solveTolerancePercentage

        setTiles(prevState => {
          const newState = [
            ...prevState.filter(
              it => it.correctPosition !== draggedTileBYS.correctPosition
            ),
            {
              ...draggedTileBYS,
              currentPosXPerc: !isSolved
                ? draggedToPercentageBYS.x
                : targetPositionPercentageBYS.x,
              currentPosYPerc: !isSolved
                ? draggedToPercentageBYS.y
                : targetPositionPercentageBYS.y,
              solved: isSolved
            }
          ]
          if (newState.every(tile => tile.solved)) {
            onSolved()
          }
          return newState
        })
      }
    }

    return (
      <div
        ref={onRootElementRendered}
        onTouchMove={onRootMouseMove}
        onMouseMove={onRootMouseMove}
        onTouchEnd={onRootMouseUp}
        onMouseUp={onRootMouseUp}
        onTouchCancel={onRootMouseUp}
        onMouseLeave={onRootMouseUp}
        className="jigsaw-puzzle"
        style={{
          height: !calculatedHeight ? undefined : `${calculatedHeight}px`,
          border: '2px solid black'
        }}
        onDragEnter={event => {
          event.stopPropagation()
          event.preventDefault()
        }}
        onDragOver={event => {
          event.stopPropagation()
          event.preventDefault()
        }}
      >
        {tiles &&
          rootSize &&
          imageSize &&
          tiles.map(tile => (
            <div
              draggable={false}
              onMouseDown={event => onTileMouseDown(tile, event)}
              onTouchStart={event => onTileMouseDown(tile, event)}
              id={"C" + tile.correctPosition}
              key={tile.correctPosition}
              className={`jigsaw-puzzle__piece ${
                tile.solved ? " jigsaw-puzzle__piece--solved" : ""
              } `}
              style={{
                position: "absolute",
                height: `${(1 / rows) * 100}%`,
                width: `${(1 / columns) * 100}%`,
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: `${rootSize.width}px ${rootSize.height}px`,
                // backgroundSize: `800px 800px`,
                backgroundPositionX: `${((tile.correctPosition % columns) /
                  (columns - 1)) *
                  100}%`,
                backgroundPositionY: `${(Math.floor(
                  tile.correctPosition / columns
                ) /
                  (rows - 1)) *
                  100}%`,
                left: `${tile.currentPosXPerc * rootSize.width}px`,
                top: `${tile.currentPosYPerc * rootSize.height}px`
              }}
            />
          ))}
      </div>
    )
  }

  return (
    <div style={{ margin : 'auto', height: "580px", width: "580px" }}>

      <JigsawPuzzle
        imageSrc={puzzleurl}
        rows={2}
        columns={2}
        onSolved={() => alert("참 잘했어요")}
      />
    </div>
  )
}

export default Puzzle
