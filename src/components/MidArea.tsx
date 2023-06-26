import { useState, useRef, useCallback, useContext } from 'react';
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
import CommandsContext from '../context/commandContext';
import { events } from '../../events/events';
import { emitCustomEvent } from 'react-custom-events';
import CustomInputNode from './CustomInputNode';
import CustomOutputNode from './CustomOutputNode';
import CustomEdge from './DeleteEdge';
import { v4 as uuidv4 } from 'uuid';
import 'reactflow/dist/base.css';

const nodeTypes = {
  input: CustomInputNode,
  output: CustomOutputNode
};

const edgeTypes = {
  input: CustomEdge,
  output: CustomEdge
};

export const MidArea = () => {
  const { setCommands } = useContext(CommandsContext);
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect: OnConnect = params => {
    let connectedNodes: string[] = [];
    let randomPosition: any = '';
    let XYPos: any = {};
    let message: any = '';
    let timer: any = 0;
    if (params.source !== params.target) {
      setEdges(eds => addEdge(params, eds));
      connectedNodes = nodes.map((node: any) => {
        if (params.source || params.target === node.id) {
          return node.code;
        }
      });
      setCommands(prevCommands => [...prevCommands, ...connectedNodes]);
      randomPosition = nodes.find(
        (node: any) => node.moveTo === 'random-position'
      );
      XYPos = nodes.find((node: any) => node.XYPosition.x && node.XYPosition.y);
      message = nodes.find((node: any) => node.message);
      timer = nodes.find((node: any) => node.timer);
    }
    if (
      connectedNodes.find(node => node === 'flagClick') &&
      connectedNodes.length > 1
    ) {
      if (!randomPosition?.moveTo) {
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes
        });
      } else if (randomPosition?.moveTo) {
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          moveTo: randomPosition.moveTo
        });
      }
      if (XYPos?.XYPosition) {
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          xyPosition: XYPos.XYPosition
        });
      }
      if (message && !timer) {
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          message: message.message
        });
      }
      if (message && timer) {
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          timer: timer.timer
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
      const moveTo = event.dataTransfer.getData('moveTo');
      const XPosition = event.dataTransfer.getData('XPosition');
      const YPosition = event.dataTransfer.getData('YPosition');
      const message = event.dataTransfer.getData('message');

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
        moveTo,
        XYPosition: { x: XPosition, y: YPosition },
        message: message
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
