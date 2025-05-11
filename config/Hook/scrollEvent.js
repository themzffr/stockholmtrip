import React, {useState} from 'react'

export default function useScrollEvent(containerRef) {

  
    
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setStartPosition({ x: event.pageX, y: event.pageY });
      containerRef.current.classList.add("dragging");
    };
  
    const handleMouseMove = (event) => {
      if (isDragging) {
        const distance = {
          x: event.pageX - startPosition.x,
          y: event.pageY - startPosition.y
        };
        containerRef.current.scrollLeft -= distance.x;
    
        setStartPosition({ x: event.pageX, y: event.pageY });
      }
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
      containerRef.current.classList.remove("dragging");
    };
  
    
  
 
  
  
return {handleMouseDown, handleMouseUp, handleMouseMove}

}
