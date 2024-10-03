import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export const App = () => {
  const canvasRef = useRef(null);
  const [text, setText] = useState<string>('abc');
  const [fontSize, setFontSize] = useState<number>(100);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    fabric.Image.fromURL('/metal.jpg', (img) => {
      img.scaleToWidth(800);
      img.scaleToHeight(600);

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    const gradient = new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 100
      },
      colorStops: [
        { offset: 0, color: '#000' },
        { offset: 1, color: 'rgba(255,255,255,0.2)' }
      ]
    });

    const engravedText = new fabric.Text(text, {
      fontFamily: 'Georgia',
      fontSize: fontSize,
      fontWeight: 800,
      fill: 'rgba(0, 0, 0, .1)',
      stroke: gradient,
      strokeWidth: 3,
      left: 50,
      top: 100,
    });

    const shadowText = new fabric.Text(text, {
      fontFamily: 'Georgia',
      fontSize: fontSize,
      fontWeight: 800,
      fill: '',
      stroke: 'rgba(0,0,0,.4)',
      strokeWidth: 8,
      left: 50,
      top: 100,
      clipPath: engravedText
    });

    const group = new fabric.Group([engravedText, shadowText], {
      shadow: {
        color: 'rgba(0, 0, 0, 0.5)',
        blur: 15,
        offsetX: 5,
        offsetY: 5
      },
    });

    canvas.add(group);
    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, [text, fontSize]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid #ccc' }}
      />
      <div className="my-5 w-64 flex justify-between items-center">
        <label>Text: </label>
        <input
          className="border-2 border-solid border-[#000] rounded-md w-32 px-2 py-1"
          type="text"
          value={text}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            if (e.target) setText(value);
          }}
        />
      </div>
      <div className="w-64 flex justify-between items-center">
        <label>Font Size: </label>
        <input
          className="border-2 border-solid border-[#000] rounded-md w-32 px-2 py-1"
          type="number"
          value={fontSize}
          min={100}
          max={300}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            if (e.target) setFontSize(Number(value));
          }}
        />
      </div>
    </>
  );
};

