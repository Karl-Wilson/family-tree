import { useEffect, useState } from "react"

export const useDragFunction = (slideWindow) =>{
  const [posX, setX] = useState();
  const [posY, setY] = useState();
  const [top, setTop] = useState();
  const [left, setLeft] = useState();

  const mousePosition = (event) =>{
      let x = event.clientX;
      let y = event.clientY;
      return {x: x, y: y};
  }
  const mouseDown = (event) =>{
      let mousePos = mousePosition(event)
      let elem = document.getElementById('draggable-window');
      setX(mousePos.x)
      setY(mousePos.y)
      setTop(elem.scrollTop)
      setLeft(elem.scrollLeft)
      slideWindow.addEventListener('mousemove', mouseMove)
      slideWindow.addEventListener('mouseup', mouseUp)
  }
  const mouseMove = (event) =>{
      let mousePos = mousePosition(event)
      let elem = document.getElementById('draggable-window');
      let dx =  mousePos.x - posX
      let dy =  mousePos.y - posY
      let scrollLeft = left - dx
      let scrollTop = top - dy
      elem.scrollTop = scrollTop
      elem.scrollLeft = scrollLeft    
  }
  const mouseUp = (event) =>{
    slideWindow.removeEventListener('mousemove', mouseMove)
    slideWindow.removeEventListener('mouseup', mouseUp)
  }
  return {mouseDown, mouseMove, mouseUp, posX, posY, top, left}
}