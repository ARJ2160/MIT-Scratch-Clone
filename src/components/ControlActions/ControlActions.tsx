import { useState } from 'react';
import { ActionProps } from '../../../types/types';

const ControlActions = ({ onDragStart }: ActionProps) => {
  const [timer, setTimer] = useState<number>(0);
  const [repeatTimer, setRepeatTimer] = useState<number>(0);

  const eventClasses =
    'flex flex-row flex-wrap bg-orange-500 text-white px-2 py-2 my-2 text-sm cursor-pointer';

  return (
    <div>
      <div
        onDragStart={event =>
          onDragStart(
            event,
            'default',
            `Wait ${timer} seconds`,
            'waitForSeconds',
            undefined,
            undefined,
            undefined,
            timer
          )
        }
        className={eventClasses}
        draggable
      >
        {'Wait'}
        <input
          value={timer}
          onChange={e => setTimer(e.target.value as unknown as number)}
          className='rounded-3xl text-center w-24 ml-2 mx-2 hover:border-0 focus:border-0 text-black'
          type='number'
        />
        {'seconds'}
      </div>
      <div
        className={eventClasses}
        onDragStart={event =>
          onDragStart(
            event,
            'default',
            `Repeat ${repeatTimer}`,
            'waitRepeatTimer',
            undefined,
            undefined,
            undefined,
            repeatTimer
          )
        }
        draggable
      >
        {'Repeat'}
        <input
          value={repeatTimer}
          onChange={e => setRepeatTimer(e.target.value as unknown as number)}
          className='rounded-3xl text-center w-12 ml-2 mx-2 hover:border-0 focus:border-0 text-black'
          type='number'
        />
      </div>
    </div>
  );
};

export default ControlActions;
