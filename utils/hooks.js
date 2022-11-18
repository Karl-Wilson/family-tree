import { useEffect, useState, useRef } from "react"

export const useDragFunction = () =>{
  const [posX, setX] = useState();
  const [posY, setY] = useState();
  const [top, setTop] = useState();
  const [left, setLeft] = useState();
  const refPosX = useRef(posX)
  const refPosY = useRef(posY)
  const refTop = useRef(top)
  const refLeft = useRef(left)

  const setPosX = (data) =>{
      refPosX.current = data
      setX(data)
  }
  const setPosY = (data) =>{
      refPosY.current = data
      setY(data)
  }
  const setRefTop = (data) =>{
      refTop.current = data
      setTop(data)
  }
  const setRefLeft = (data) =>{
      refLeft.current = data
      setLeft(data)
  }

  const mousePosition = (event) =>{
      let x = event.pageX;
      let y = event.pageY;
      return {x: x, y: y};
  } 
  const mouseMove = (event) =>{
      let mousePos = mousePosition(event)
      let elem = document.getElementById('draggable-window');
      let dx =  mousePos.x - refPosX.current
      let dy =  mousePos.y - refPosY.current
      let scrollLeft = refLeft.current - dx
      let scrollTop = refTop.current - dy
      elem.scrollTop = scrollTop
      elem.scrollLeft = scrollLeft    
  }
  const mouseUp = (event) =>{
    document.getElementById('draggable-window').removeEventListener('mousemove', mouseMove)//originally for slideWindow
    document.getElementById('draggable-window').removeEventListener('mouseup', mouseUp)//originally for slideWindow
  }
  const mouseDown = (event) =>{
      let mousePos = mousePosition(event)
      let elem = document.getElementById('draggable-window');
      setPosX(mousePos.x)
      setPosY(mousePos.y)
      setRefTop(elem.scrollTop)
      setRefLeft(elem.scrollLeft)
      document.getElementById('draggable-window').addEventListener('mousemove', mouseMove)//originally for slideWindow
      document.getElementById('draggable-window').addEventListener('mouseup', mouseUp)//originally for slideWindow
  }
  const removeMouseDown = () =>{
    console.log("touch")
    document.getElementById('draggable-window').removeEventListener('mousedown', mouseDown)
  }
  const addMouseDown = () =>{
    console.log("remove")
    document.getElementById('draggable-window').addEventListener('mousedown', mouseDown)
  }
  return {mouseDown, removeMouseDown, addMouseDown}
}