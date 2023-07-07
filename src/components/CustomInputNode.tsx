import { memo } from 'react';
import { NodeProps, Position } from 'reactflow';
import CustomHandle from './CustomHandle';
import { shallow } from 'zustand/shallow';
import useStore from '../../store/store';

type NodeData = {
  label: string;
};

const CustomInputNode = (props: NodeProps<NodeData>) => {
  const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange
  });
  const { nodes, onNodesChange } = useStore(selector, shallow);

  const onDeleteNode = (node: NodeProps<NodeData>) => {
    const nodeToDeleteId = nodes.find((x: any) => {
      return x.id === node.id;
    }).id;
    const deleteNodeConfig = {
      id: nodeToDeleteId,
      type: 'remove'
    };
    onNodesChange([deleteNodeConfig]);
  };

  return (
    <div>
      <CustomHandle
        type='source'
        position={Position.Bottom}
        isConnectable={2}
      />
      <div className='custom-node relative'>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            onClick={() => onDeleteNode(props)}
            className='w-4 h-4 absolute top-[-9px] right-[-8px] rotate-45 text-red-600 hover:text-red-400'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        {props.data.label}
      </div>
    </div>
  );
};

export default memo(CustomInputNode);
