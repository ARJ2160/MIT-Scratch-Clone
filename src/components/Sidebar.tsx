import Icon from './Icon';

export const Sidebar = () => {
  const onDragStart = (
    event: any,
    nodeType: string,
    text: string,
    code: string
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('nodeText', text);
    event.dataTransfer.setData('code', code);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200'>
      <div className='font-bold'> {'Events'} </div>
      <div
        onDragStart={event =>
          onDragStart(event, 'input', 'When flag clicked', 'flagClick')
        }
        className='flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer'
        draggable
      >
        {'When'}
        <Icon name='flag' size={15} className='text-green-600 mx-2' />
        {'clicked'}
      </div>
      <div
        className='flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer'
        onDragStart={event =>
          onDragStart(event, 'input', 'When this sprite clicked', 'spriteClick')
        }
        draggable
      >
        {'When this sprite clicked'}
      </div>
      <div className='font-bold'> {'Motion'} </div>
      <div
        className='flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer'
        onDragStart={event =>
          onDragStart(event, 'output', 'Move 10 steps', 'move')
        }
        draggable
      >
        {'Move 10 steps'}
      </div>
      <div
        className='flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer'
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
        className='flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer'
        onDragStart={event =>
          onDragStart(event, 'output', 'Turn 15 degrees clockwise', 'clockwise')
        }
        draggable
      >
        {'Turn '}
        <Icon name='redo' size={15} className='text-white mx-2' />
        {'15 degrees'}
      </div>
    </div>
  );
};
