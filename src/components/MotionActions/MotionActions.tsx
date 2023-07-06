import { useState } from 'react';
import { ActionProps } from '../../../types/types';
import Icon from '../Icon';

const MotionActions = ({ onDragStart }: ActionProps) => {
  const [clockwise, setClockwise] = useState<number>(15);
  const [antiClockwise, setAntiClockwise] = useState<number>(15);
  const [positionOption, setPositionOption] = useState('random-position');
  const [XYPosition, setXYPosition] = useState({ x: 12, y: 11 });

  const motionClasses =
    'flex flex-row items-center flex-wrap bg-blue-500 text-white px-2 py-2 my-2 text-sm cursor-pointer';
  return (
    <div>
      <div
        className={motionClasses}
        onDragStart={event =>
          onDragStart(event, 'default', 'Move 10 steps', 'move')
        }
        draggable
      >
        {'Move 10 steps'}
      </div>
      <div
        className={motionClasses}
        onDragStart={event =>
          onDragStart(
            event,
            'default',
            `Turn ${antiClockwise} degrees anticlockwise`,
            'anticlockwise',
            antiClockwise
          )
        }
        draggable
      >
        {'Turn '}
        <input
          value={antiClockwise}
          className='rounded-lg text-black pl-2 mx-2 w-10 h-6'
          onChange={e => setAntiClockwise(parseInt(e.target.value))}
          name={antiClockwise as unknown as string}
          type='number'
        ></input>
        {'degrees'}
        <Icon name='undo' size={15} className='text-white mx-2' />
      </div>
      <div
        className={motionClasses}
        onDragStart={event =>
          onDragStart(
            event,
            'default',
            `Turn ${clockwise} degrees clockwise`,
            'clockwise',
            clockwise
          )
        }
        draggable
      >
        {'Turn '}
        <input
          value={clockwise}
          className='rounded-lg text-black pl-2 mx-2 w-10 h-6'
          onChange={e => setClockwise(parseInt(e.target.value))}
          name={clockwise as unknown as string}
          type='number'
        ></input>
        {'degrees'}
        <Icon name='redo' size={15} className='text-white mx-2' />
      </div>
      <div
        className={motionClasses}
        onDragStart={event =>
          onDragStart(
            event,
            'dropdown',
            `Go To ${positionOption}`,
            'goToPosition',
            undefined,
            positionOption
          )
        }
        draggable
      >
        go to
        <div className='ml-2'>
          <select
            value={positionOption}
            onChange={e => setPositionOption(e.target.value)}
            className='rounded-lg text-black'
            name={positionOption}
          >
            <option value='random-position'>random-position</option>
            <option value='mouse-pointer'>mouse-pointer</option>
          </select>
        </div>
      </div>
      <div
        className={motionClasses}
        onDragStart={event =>
          onDragStart(
            event,
            'doubleDropdown',
            `Go To X: ${XYPosition.x} Y: ${XYPosition.y}`,
            'goToPositionXY',
            undefined,
            undefined,
            XYPosition
          )
        }
        draggable
      >
        go to X
        <div className='ml-2'>
          <input
            value={XYPosition.x}
            className='rounded-lg text-black w-10 h-6'
            onChange={e =>
              setXYPosition(prev => ({
                ...prev,
                x: e.target.value as unknown as number
              }))
            }
            name={XYPosition.x as unknown as string}
            type='number'
          ></input>{' '}
          Y
          <input
            value={XYPosition.y}
            className='rounded-lg text-black w-10 h-6 ml-2'
            onChange={e =>
              setXYPosition(prev => ({
                ...prev,
                y: e.target.value as unknown as number
              }))
            }
            name={XYPosition.y as unknown as string}
            type='number'
          ></input>
        </div>
      </div>
    </div>
  );
};

export default MotionActions;
