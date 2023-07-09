import { useState } from 'react';
import { ActionProps } from '../../../types/types';

const LooksActions = ({ onDragStart }: ActionProps) => {
  const [message, setMessage] = useState<string>('Hello');
  const [messageWithTimer, setMessageWithTimer] = useState<string>('Hello');
  const [timer, setTimer] = useState<number>(2);

  const eventClasses =
    'flex flex-row flex-wrap bg-purple-500 text-white px-2 py-2 my-2 text-sm cursor-pointer';
  return (
    <div>
      <div
        onDragStart={event =>
          onDragStart(
            event,
            'default',
            `Say ${message}`,
            'saySomething',
            undefined,
            undefined,
            undefined,
            message
          )
        }
        className={eventClasses}
        draggable
      >
        {'Say'}
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          className='rounded-3xl text-center w-24 ml-2 mx-2 hover:border-0 focus:border-0 text-black'
          type='text'
        />
      </div>
      <div
        className={eventClasses}
        onDragStart={event =>
          onDragStart(
            event,
            'default',
            `Say ${messageWithTimer} for ${timer} seconds`,
            'saySomethingWithTimer',
            undefined,
            undefined,
            undefined,
            messageWithTimer,
            timer
          )
        }
        draggable
      >
        {'Say'}
        <input
          value={messageWithTimer}
          onChange={e => setMessageWithTimer(e.target.value)}
          className='rounded-3xl text-center w-12 ml-2 mx-2 hover:border-0 focus:border-0 text-black'
          type='text'
        />{' '}
        {'for '}
        <input
          value={timer}
          onChange={e =>
            parseInt(e.target.value) > 0 &&
            setTimer(parseInt(e.target.value) as unknown as number)
          }
          className='rounded-3xl text-center w-8 ml-2 mx-2 hover:border-0 focus:border-0 text-black'
          type='number'
        />{' '}
        {'seconds'}
      </div>
    </div>
  );
};

export default LooksActions;
