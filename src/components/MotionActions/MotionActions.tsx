import { useState } from 'react';
import { ActionProps } from '../../../types/types';
import Icon from '../Icon';

const MotionActions = ({ onDragStart }: ActionProps) => {
  const [positionOption, setPositionOption] = useState('random-position');
  const [XYPosition, setXYPosition] = useState({ x: 12, y: 12312 });

  const motionClasses =
    'flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer';
  return (
    <div>
      <div
        className={motionClasses}
        onDragStart={event =>
          onDragStart(event, 'output', 'Move 10 steps', 'move')
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
            'output',
            'Turn 15 degrees anticlockwise',
            'anticlockwise'
          )
        }
        draggable
      >
        {'Turn '}
        <Icon name='undo' size={15} className='text-white mx-2' />
        {'15 degrees'}
      </div>
      <div
        className={motionClasses}
        onDragStart={event =>
          onDragStart(event, 'output', 'Turn 15 degrees clockwise', 'clockwise')
        }
        draggable
      >
        {'Turn '}
        <Icon name='redo' size={15} className='text-white mx-2' />
        {'15 degrees'}
      </div>
      <div
        className={motionClasses}
        onDragStart={event =>
          onDragStart(
            event,
            'output',
            `Go To ${positionOption}`,
            'goToPosition',
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
            'output',
            `Go To X: ${XYPosition.x} Y: ${XYPosition.y}`,
            'goToPositionXY',
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
