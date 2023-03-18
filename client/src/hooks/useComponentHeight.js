import React, { useEffect, useRef, useState } from 'react'

const useComponentHeight = () => {
    const componentRef = useRef(null);
  const [componentHeight, setComponentHeight] = useState(0);

  useEffect(() => {
    function updateComponentHeight() {
      if (componentRef.current) {
        setComponentHeight(componentRef.current.clientHeight);
      }
    }

    updateComponentHeight(); // Update height on first render

    window.addEventListener('resize', updateComponentHeight);

    return () => {
      window.removeEventListener('resize', updateComponentHeight);
    };
  }, [componentRef, componentHeight]);

  return [componentRef, componentHeight];
}

export default useComponentHeight