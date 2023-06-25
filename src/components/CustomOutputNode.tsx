import CustomHandle from './CustomHandle';
import { NodeProps, Position } from 'reactflow';
import { memo } from 'react';

type NodeData = {
  label: string;
};

const CustomOutputNode = ({ data }: NodeProps<NodeData>) => {
  return (
    <div>
      <CustomHandle type='target' position={Position.Top} isConnectable={1} />
      <div className='custom-node relative'>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 absolute top-[-9px] right-[-8px] rotate-45 text-red-600 hover:text-red-400'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        {data.label}
      </div>
    </div>
  );
};

export default memo(CustomOutputNode);
