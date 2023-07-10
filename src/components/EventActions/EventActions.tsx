import { ActionProps } from '../../../types/types';
import Icon from '../Icon';

const EventActions = ({ onDragStart }: ActionProps) => {
  const eventClasses =
    'flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-2 my-2 text-sm cursor-pointer';
  return (
    <div>
      <div
        onDragStart={event =>
          onDragStart(event, 'input', 'When flag clicked', 'flagClick')
        }
        className={eventClasses}
        draggable
      >
        {'When'}
        <Icon name='flag' size={15} className='text-green-600 mx-2' />
        {'clicked'}
      </div>
      {/* <div
        className={eventClasses}
        onDragStart={event =>
          onDragStart(event, 'input', 'When this sprite clicked', 'spriteClick')
        }
        draggable
      >
        {'When this sprite clicked'}
      </div> */}
    </div>
  );
};

export default EventActions;
