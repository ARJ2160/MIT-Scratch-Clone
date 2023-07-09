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

  useCustomEventListener(events.COMPUTE_COMMANDS, (data: any) => {
    console.log(data);
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
              imageRef.current.style.transform + ` rotate(${data.rotate}deg)`;
          }
        }
        if (code === 'anticlockwise') {
          if (imageRef.current) {
            imageRef.current.style.transform =
              imageRef.current.style.transform + ` rotate(-${data.rotate}deg)`;
          }
        }
        if (code === 'goToPosition') {
          const x = Math.floor(Math.random() * 30);
          const y = Math.floor(Math.random() * 30);
          if (imageRef.current) {
            imageRef.current.style.transform =
              imageRef.current.style.transform +
              ` translateX(${x}rem) translateY(${y}rem)`;
          }
        }
        if (code === 'goToPositionXY') {
          if (imageRef.current) {
            const X = data.xPosition;
            const Y = data.yPosition;
            imageRef.current.style.transform =
              imageRef.current.style.transform +
              ` translateX(${X}rem) translateY(${Y}rem)`;
          }
        }
        if (code === 'saySomething') {
          setShowMessage(true);
          setMessage(data.message);
        }
        if (code === 'saySomethingWithTimer') {
          setShowMessage(true);
          setMessage(data.message);
          if (data.message && data.timer) {
            setTimeout(() => {
              setShowMessage(false);
            }, data.timer * 1000);
          }
        }
        if (code === 'waitForSeconds' || code === 'waitForTimer') {
          wait(data.timer);
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
    <div id='preview' className='flex-none h-screen w-full overflow-y-auto p-2'>
      <div className='relative'>
        <img ref={imageRef} src={CatImg} alt='' />
        {showMessage && (
          <>
            <span className='tooltip'>{message}</span>
          </>
        )}
      </div>
    </div>
  );
}
