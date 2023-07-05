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
          console.log('GO TO POS', data);
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
            const X = data.xyPosition.x;
            const Y = data.xyPosition.y;
            imageRef.current.style.transform =
              imageRef.current.style.transform +
              ` translateX(${X}rem) translateY(${Y}rem)`;
          }
        }
        if (code === 'saySomething') {
          console.log('SAY THIS');
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
          console.log('waitForSeconds');
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
