import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';

import '../styles/Canvas.css';

const socket = io('http://localhost:3001', { transports: ['websocket'] });

const Canvas = ({ currentUserColor, brushSize }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleDrawing = (data) => {
      ctx.beginPath();
      ctx.arc(data.x, data.y, brushSize, 0, Math.PI * 2);
      ctx.fillStyle = data.color;
      ctx.fill();
    };

    socket.on('drawing', handleDrawing);

    return () => {
      socket.off('drawing', handleDrawing);
    };
  }, [brushSize]);

  const handleMouseDown = (e) => {
    setDrawing(true);
    draw(e);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    draw(e);
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const data = {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop,
      color: currentUserColor,
    };
    socket.emit('drawing', data);

    ctx.beginPath();
    ctx.arc(data.x, data.y, brushSize, 0, Math.PI * 2);
    ctx.fillStyle = currentUserColor;
    ctx.fill();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className='canvas'
      />
    </div>
  );
};

export default Canvas;
