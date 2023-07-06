import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Node,
  Edge,
  OnConnect,
  Controls
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Sidebar } from './Sidebar';
import { events } from '../../events/events';
import { emitCustomEvent } from 'react-custom-events';
import CustomInputNode from './CustomInputNode';
import CustomOutputNode from './CustomOutputNode';
import CustomEdge from './CustomEdge';
import { v4 as uuidv4 } from 'uuid';
import 'reactflow/dist/base.css';
// import CustomDropdownNode from './CustomDropdownNode';
// import CustomDoubleDropdownNode from './CustomDoubleDropdownNode';

const nodeTypes = {
  input: CustomInputNode,
  output: CustomOutputNode
  // dropdown: CustomDropdownNode,
  // doubleDropdown: CustomDoubleDropdownNode
};

const edgeTypes = {
  default: CustomEdge
};

export const MidArea = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [commands, setCommands] = useState({});

  useEffect(() => {
    console.log('>>', commands);
  }, [commands]);
  const onConnect: OnConnect = params => {
    console.log(params);
    let connectedNodes: string[] = [];
    let rotate: any = 0;
    let randomPosition: any = '';
    let XYPos: any = {};
    let message: any = '';
    let messageWithTimer: any = 0;
    let delayTimer: any = 0;
    if (params.source !== params.target) {
      setEdges(eds => addEdge(params, eds));
      connectedNodes = nodes.map((node: any) => {
        if (params.source || params.target === node.id) {
          return node.code;
        }
      });
      rotate = nodes.find((node: any) => node.rotate);
      randomPosition = nodes.find(
        (node: any) => node.moveTo === 'random-position'
      );
      XYPos = nodes.find((node: any) => node.XYPosition.x && node.XYPosition.y);
      message = nodes.find((node: any) => node.message);
      messageWithTimer = nodes.find(
        (node: any) =>
          node.messageWithTimer.message && node.messageWithTimer.timer
      );
      delayTimer = nodes.find((node: any) => node.delayTimer);
      console.log('xypos', XYPos);
    }
    if (
      connectedNodes.find(node => node === 'flagClick') &&
      connectedNodes.length > 1
    ) {
      if (rotate) {
        setCommands(prev => {
          return {
            ...prev,
            rotate: rotate.rotate
          };
        });
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          rotate: rotate.rotate,
          ...commands
        });
      }
      if (randomPosition?.moveTo) {
        setCommands(prev => {
          return {
            ...prev,
            moveTo: randomPosition.moveTo
          };
        });
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          moveTo: randomPosition.moveTo,
          ...commands
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
        console.log('>>', XYPos);
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          xPosition: XYPos.XYPosition.x,
          yPosition: XYPos.XYPosition.y,
          ...commands
        });
      }
      if (message) {
        setCommands(prev => {
          return {
            ...prev,
            message: message.message
          };
        });
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          message: message.message,
          ...commands
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
      }
      if (delayTimer) {
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          delayTimer: delayTimer.delayTimer
        });
      }
    }
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

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
      const delayTimer = event.dataTransfer.getData('delayTimer');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });
      const newNode: any = {
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
        },
        delayTimer
      };
      setNodes(nds => nds.concat(newNode));
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
            onConnect={onConnect}
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
