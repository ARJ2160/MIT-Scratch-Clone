import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Background,
  OnConnect,
  Controls,
  NodeAddChange,
  Connection
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Sidebar } from './Sidebar';
import { events } from '../../events/events';
import { emitCustomEvent } from 'react-custom-events';
import CustomInputNode from './CustomInputNode';
import CustomEdge from './CustomEdge';
import { v4 as uuidv4 } from 'uuid';
import 'reactflow/dist/base.css';
import useStore from '../../store/store';
import { shallow } from 'zustand/shallow';
import CustomDefaultNode from './CustomDefaultNode';

const nodeTypes = {
  input: CustomInputNode,
  default: CustomDefaultNode
};

const edgeTypes = {
  default: CustomEdge
};

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onDragOver: state.onDragOver,
  onConnect: state.onConnect,
  clickNodeCommand: state.clickNodeCommand,
  setClickNodeCommand: state.setClickNodeCommand
});

export const MidArea = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [commands, setCommands] = useState({});

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onDragOver,
    onConnect,
    // clickNodeCommand,
    setClickNodeCommand
  } = useStore(selector, shallow);

  const onConnectNode: OnConnect = (params: Connection) => {
    let connectedNodes: string[] = [];
    let rotate: any = 0;
    let randomPosition: any = '';
    let XYPos: any = {};
    let message: any = '';
    let messageWithTimer: any = 0;
    let move = '';
    if (params.source !== params.target) {
      onConnect(params);
      connectedNodes = nodes.map((node: any) => {
        if (params.source || params.target === node.id) {
          return node.code;
        }
      });
      move = nodes.find((node: any) => node.code === 'move')?.code;
      rotate = nodes.find((node: any) => node.rotate)?.rotate;
      randomPosition = nodes.find(
        (node: any) => node.moveTo === 'random-position'
      )?.moveTo;
      XYPos = nodes.find((node: any) => node.XYPosition.x && node.XYPosition.y);
      message = nodes.find((node: any) => node.message)?.message;
      messageWithTimer = nodes.find(
        (node: any) =>
          node.messageWithTimer.message && node.messageWithTimer.timer
      );
    }
    setClickNodeCommand({ connectedNodes });
    if (
      connectedNodes.find(node => node === 'flagClick') &&
      connectedNodes.length > 1
    ) {
      if (move === 'move') {
        setCommands(prev => {
          return {
            ...prev,
            move
          };
        });
        setClickNodeCommand({
          move
        });
      }
      if (rotate) {
        setCommands(prev => {
          return {
            ...prev,
            rotate
          };
        });
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          rotate,
          ...commands
        });
        setClickNodeCommand({
          rotate
        });
      }
      if (randomPosition) {
        setCommands(prev => {
          return {
            ...prev,
            randomPosition
          };
        });
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          randomPosition,
          ...commands
        });
        setClickNodeCommand({
          randomPosition
        });
      }
      if (XYPos?.XYPosition) {
        setCommands(prev => {
          return {
            ...prev,
            xPosition: XYPos.XYPosition.x,
            yPosition: XYPos.XYPosition.y
          };
        });
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          xPosition: XYPos.XYPosition.x,
          yPosition: XYPos.XYPosition.y,
          ...commands
        });
        setClickNodeCommand({
          xPosition: XYPos.XYPosition.x,
          yPosition: XYPos.XYPosition.y
        });
      }
      if (message) {
        setCommands(prev => {
          return {
            ...prev,
            message
          };
        });
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          message,
          ...commands
        });
        setClickNodeCommand({
          message
        });
      }
      if (messageWithTimer) {
        setCommands(prev => {
          return {
            ...prev,
            message: messageWithTimer.messageWithTimer.message,
            timer: messageWithTimer.messageWithTimer.timer
          };
        });
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          message: messageWithTimer.messageWithTimer.message,
          timer: messageWithTimer.messageWithTimer.timer,
          ...commands
        });
        setClickNodeCommand({
          message: message.message,
          timer: messageWithTimer.messageWithTimer.timer
        });
      }
    }
  };

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const name = event.dataTransfer.getData('nodeText');
      const code = event.dataTransfer.getData('code');
      const rotate = event.dataTransfer.getData('rotate');
      const moveTo = event.dataTransfer.getData('moveTo');
      const XPosition = event.dataTransfer.getData('XPosition');
      const YPosition = event.dataTransfer.getData('YPosition');
      const message = event.dataTransfer.getData('message');
      const msgTimer1 = event.dataTransfer.getData('msgTimer1');
      const msgTimer2 = event.dataTransfer.getData('msgTimer2');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });
      const newNode: any =
        type === 'input'
          ? {
              uid: uuidv4(),
              id: uuidv4(),
              type,
              position,
              data: { label: name },
              deletable: true,
              code,
              rotate,
              moveTo,
              XYPosition: { x: XPosition, y: YPosition },
              message: message,
              messageWithTimer: {
                message: msgTimer1,
                timer: msgTimer2
              }
            }
          : {
              id: uuidv4(),
              type,
              position,
              data: { label: name },
              deletable: true,
              code,
              rotate,
              moveTo,
              XYPosition: { x: XPosition, y: YPosition },
              message: message,
              messageWithTimer: {
                message: msgTimer1,
                timer: msgTimer2
              }
            };
      const addNewNode: NodeAddChange = {
        item: newNode,
        type: 'add'
      };
      onNodesChange([addNewNode]);
    },
    [reactFlowInstance]
  );

  return (
    <div className='flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2'>
      <Sidebar />
      <div className='flex-1'>
        <div
          className='reactflow-wrapper h-screen w-full'
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnectNode}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            nodesDraggable
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default MidArea;
