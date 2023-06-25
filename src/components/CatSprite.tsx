import { useCustomEventListener } from 'react-custom-events';
import CatImg from '../assets/CatSprite.svg';
import { events } from '../../events/events';
import { useRef } from 'react';

export default function CatSprite() {
  const imageRef = useRef<HTMLImageElement>(null);

  useCustomEventListener(events.COMPUTE_COMMANDS, (data: any) => {
    data.connectedNodes &&
      data.connectedNodes.forEach((code: string) => {
        if (code === 'move') {
          if (imageRef.current) {
            imageRef.current.style.transform = `translateX(5rem)`;
          }
        } else if (code === 'clockwise') {
          if (imageRef.current) {
            imageRef.current.style.transform = `rotate(15deg)`;
          }
        } else if (code === 'anticlockwise') {
          if (imageRef.current) {
            imageRef.current.style.transform = `rotate(-15deg)`;
          }
        } else if (code === 'goToPosition') {
          if (data.moveTo === 'random-position') {
            const x = Math.floor(Math.random() * 30);
            const y = Math.floor(Math.random() * 30);
            if (imageRef.current) {
              imageRef.current.style.transform = `translateX(${x}rem) translateY(${y}rem)`;
            }
          }
          // else if (data.moveTo === "mouse-pointer") {
          //   document.addEventListener("mousemove", (e: MouseEvent) => {
          //     if (imageRef.current) {
          //       imageRef.current.style.backgroundPositionX = `${e.clientX}px`;
          //       imageRef.current.style.backgroundPositionY = `${e.clientY}px`
          //     }
          //   })
          // }
        } else if (code === 'goToPositionXY') {
          if (imageRef.current) {
            const X = data.xyPosition.x;
            const Y = data.xyPosition.y;
            imageRef.current.style.transform = `translateX(${X}rem)`;
            imageRef.current.style.transform = `translateY(${Y}rem)`;
          }
        }
      });
  });

  // RESET ALL STYLES
  useCustomEventListener(events.RESET_STATE, () => {
    if (imageRef.current) {
      imageRef.current.style.cssText = '';
    }
  });

  return <img ref={imageRef} src={CatImg} alt='' />;
}
