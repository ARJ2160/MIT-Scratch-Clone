import EventActions from './EventActions/EventActions';
import MotionActions from './MotionActions/MotionActions';

export const Sidebar = () => {
  const onDragStart = (
    event: any,
    nodeType: string,
    text: string,
    code: string,
    moveTo?: string,
    XYPos?: { x: number; y: number }
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('nodeText', text);
    event.dataTransfer.setData('code', code);
    moveTo && event.dataTransfer.setData('moveTo', moveTo);
    if (XYPos && XYPos.x !== 0 && XYPos.y !== 0) {
      event.dataTransfer.setData('XPosition', XYPos?.x);
      event.dataTransfer.setData('YPosition', XYPos?.y);
    }
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200'>
      <div className='font-bold'> {'Events'} </div>
      <EventActions onDragStart={onDragStart} />
      <div className='font-bold'> {'Motion'} </div>
      <MotionActions onDragStart={onDragStart} />
    </div>
  );
};
