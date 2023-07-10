import { memo } from 'react';
import {
  // EdgeRemoveChange,
  NodeProps,
  NodeRemoveChange,
  Position,
  // getConnectedEdges
} from 'reactflow';
import { shallow } from 'zustand/shallow';
import useStore from '../../store/store';
import CustomHandle from './CustomHandle';

type NodeData = {
  label: string;
};

const CustomDefaultNode = (props: NodeProps<NodeData>) => {
  const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    clickNodeCommand: state.clickNodeCommand,
    setClickNodeCommand: state.setClickNodeCommand
  });
  const {
    nodes,
    // edges,
    onNodesChange,
    // onEdgesChange,
    clickNodeCommand,
    setClickNodeCommand
  } = useStore(selector, shallow);

  const onDeleteNode = (node: NodeProps<NodeData>) => {
    //<---------- TO DELETE NODES FROM STORE ----------->
    const nodeToDeleteId = nodes.find((x: any) => {
      return x.id === node.id;
    }).id;
    const deleteNodeConfig: NodeRemoveChange = {
      id: nodeToDeleteId,
      type: 'remove'
    };
    onNodesChange([deleteNodeConfig]);
    const nodeToDeleteCode = nodes.find(
      (x: any) => x.id === nodeToDeleteId
    )?.code;

    //<---------- TO DELETE EDGES FROM STORE ----------->
    // const edgesToDeleteId = getConnectedEdges(nodes, edges)?.map(x => x.id);
    // edgesToDeleteId.forEach((id: string) => {
    //   const params: EdgeRemoveChange = {
    //     type: 'remove',
    //     id
    //   };
    //   onEdgesChange([params]);
    // });

    //<---------- TO DELETE CODES FROM STORE ----------->
    if (nodeToDeleteCode) {
      switch (nodeToDeleteCode) {
        case 'clockwise':
        case 'anticlockwise':
          const { rotate, ...rest } = clickNodeCommand;
          setClickNodeCommand(rest, true);
          break;
        case 'move':
          const { move, ...rest1 } = clickNodeCommand;
          setClickNodeCommand(rest1, true);
          break;
        case 'goToPosition':
          const { randomPosition, ...rest2 } = clickNodeCommand;
          setClickNodeCommand(rest2, true);
          break;
        case 'goToPositionXY':
          const { xPosition, yPosition, ...rest3 } = clickNodeCommand;
          setClickNodeCommand(rest3, true);
          break;
        case 'saySomething':
          const { message, timer, ...rest4 } = clickNodeCommand;
          setClickNodeCommand(rest4, true);
          break;
      }
    }
  };

  return (
    <div>
      <CustomHandle type='target' position={Position.Top} isConnectable={10} />
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
      <CustomHandle
        type='source'
        position={Position.Bottom}
        isConnectable={10}
      />
    </div>
  );
};

export default memo(CustomDefaultNode);
