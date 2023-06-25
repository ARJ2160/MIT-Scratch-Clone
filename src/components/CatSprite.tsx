import { useCustomEventListener } from 'react-custom-events';
import CatImg from "../assets/CatSprite.svg";
import { events } from '../../events/events';
import { useRef } from 'react';

export default function CatSprite() {
const imageRef = useRef<HTMLImageElement>(null);

  useCustomEventListener(events.COMPUTE_COMMANDS, (data: any) => {
    data.connectedNodes.forEach((code: string) => {
      if (code === "move") {
        if (imageRef.current) {
          imageRef.current.style.transform = `translateX(5rem)`
        }
          } else if (code === "clockwise") {
        if (imageRef.current) {
          imageRef.current.style.transform = `rotate(15deg)`
        }
      } else if (code === "anticlockwise") {
        if (imageRef.current) {
          imageRef.current.style.transform = `rotate(-15deg)`
        }
      }
      })
  })
  
  // RESET ALL STYLES
  useCustomEventListener(events.RESET_STATE, () => {
    if (imageRef.current) {
      imageRef.current.style.cssText = ""
    }
  })
  
  return <img ref={imageRef} src={CatImg} alt="" />;
}
