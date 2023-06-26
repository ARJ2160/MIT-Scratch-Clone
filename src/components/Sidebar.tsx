import ControlActions from './ControlActions/ControlActions';
import EventActions from './EventActions/EventActions';
import LooksActions from './LooksActions/LooksActions';
import MotionActions from './MotionActions/MotionActions';

export const Sidebar = () => {
  const onDragStart = (
    event: any,
    nodeType: string,
    text: string,
    code: string,
    moveTo?: string,
    XYPos?: { x: number; y: number },
    message?: string,
    timer?: number,
    delayTimer?: number
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('nodeText', text);
    event.dataTransfer.setData('code', code);
    moveTo && event.dataTransfer.setData('moveTo', moveTo);
    if (XYPos && XYPos.x !== 0 && XYPos.y !== 0) {
      event.dataTransfer.setData('XPosition', XYPos?.x);
      event.dataTransfer.setData('YPosition', XYPos?.y);
    }
    if (message && !timer) {
      event.dataTransfer.setData('message', message);
    }
    if (message && timer) {
      event.dataTransfer.setData('msgTimer1', message);
      event.dataTransfer.setData('msgTimer2', timer);
    }
    if (delayTimer) {
      event.dataTransfer.setData('delayTimer', delayTimer);
    }
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200'>
      <div className='font-bold flex'>
        {'Events'}
        <div className='w-6 h-6 rounded-full bg-yellow-500 ml-6'></div>
      </div>
      <EventActions onDragStart={onDragStart} />
      <div className='font-bold flex'>
        {'Motion'}
        <div className='w-6 h-6 rounded-full bg-blue-500 ml-6'></div>
      </div>
      <MotionActions onDragStart={onDragStart} />
      <div className='font-bold flex'>
        {'Looks'}
        <div className='w-6 h-6 rounded-full bg-purple-500 ml-6'></div>
      </div>
      <LooksActions onDragStart={onDragStart} />
      {/* <div className='font-bold flex'>
        {'Control'}
        <div className='w-6 h-6 rounded-full bg-orange-500 ml-6'></div>
      </div>
      <ControlActions onDragStart={onDragStart} /> */}
    </div>
  );
};
