import Icon from './Icon';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';
import { events } from '../../events/events';
import { useState } from 'react';

const TopBar = () => {
  const [codes, setCodes] = useState<string>('');

  useCustomEventListener(events.BLOCK_JOINED, (codes: string) => {
    setCodes(codes);
  });

  const onGreenFlagClick = () => {
    emitCustomEvent(events.COMPUTE_COMMANDS, codes);
  };

  const onRedFlagClick = () => {
    emitCustomEvent(events.RESET_STATE);
  };

  return (
    <div className='bg-white flex justify-between items-center'>
      <div className='w-28 h-16 rounded-t-2xl flex items-center justify-center border-2'>
        Code
      </div>
      <div className='flex'>
        <div
          className='w-14 h-14 bg-green-600 hover:text-white flex items-center justify-center border-2 rounded-lg'
          onClick={onGreenFlagClick}
        >
          <Icon name='flag' size={15} className='mx-2' />
        </div>
        <div
          className='w-14 h-14 bg-red-600 hover:text-white flex items-center justify-center border-2 rounded-lg'
          onClick={onRedFlagClick}
        >
          <Icon name='stop' size={15} className='mx-2' />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
