import { useCustomEventListener } from 'react-custom-events';
import CatImg from '../assets/CatSprite.svg';
import { events } from '../../events/events';
import { useRef, useState } from 'react';

export default function CatSprite() {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const wait = (ms: any) =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(null);
      }, ms * 1000)
    );

  useCustomEventListener(events.COMPUTE_COMMANDS, async (data: any) => {
    console.log(data.connectedNodes);
    if (data.connectedNodes) {
      for (const code of data.connectedNodes) {
        if (code === 'move') {
          if (imageRef.current) {
            imageRef.current.style.transform =
              imageRef.current.style.transform + ` translateX(5rem)`;
          }
        }
        if (code === 'clockwise') {
          if (imageRef.current) {
            imageRef.current.style.transform =
              imageRef.current.style.transform + ` rotate(15deg)`;
          }
        }
        if (code === 'anticlockwise') {
          if (imageRef.current) {
            imageRef.current.style.transform =
              imageRef.current.style.transform + ` rotate(-15deg)`;
          }
        }
        if (code === 'goToPosition') {
          if (data.moveTo === 'random-position') {
            const x = Math.floor(Math.random() * 30);
            const y = Math.floor(Math.random() * 30);
            if (imageRef.current) {
              imageRef.current.style.transform =
                imageRef.current.style.transform +
                ` translateX(${x}rem) translateY(${y}rem)`;
            }
          }
          //  if (data.moveTo === "mouse-pointer") {
          //   document.addEventListener("mousemove", (e: MouseEvent) => {
          //     if (imageRef.current) {
          //       imageRef.current.style.backgroundPositionX = `${e.clientX}px`;
          //       imageRef.current.style.backgroundPositionY = `${e.clientY}px`
          //     }
          //   })
          // }
        }
        if (code === 'goToPositionXY') {
          if (imageRef.current) {
            const X = data.xyPosition.x;
            const Y = data.xyPosition.y;
            imageRef.current.style.transform =
              imageRef.current.style.transform + ` translateX(${X}rem)`;
            imageRef.current.style.transform =
              imageRef.current.style.transform + ` translateY(${Y}rem)`;
          }
        }
        if (code === 'saySomething') {
          setShowMessage(true);
          setMessage(data.message);
        }
        if (code === 'waitForSeconds' || code === 'waitForTimer') {
          await wait(data.timer);
        }
      }
    }
  });

  // RESET ALL STYLES
  useCustomEventListener(events.RESET_STATE, () => {
    if (imageRef.current) {
      imageRef.current.style.cssText = '';
    }
    setShowMessage(false);
  });

  return (
    <>
      <div className='relative'>
        <img ref={imageRef} src={CatImg} alt='' />
        {showMessage && (
          <>
            <span className='tooltip'>{message}</span>
          </>
        )}
      </div>
    </>
  );
}
