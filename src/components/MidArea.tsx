import { useState, useRef, useCallback, useContext } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  ReactFlowProvider,
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

let id = 0;
const getId = () => `dndnode_${id++}`;

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
    }
    if (connectedNodes.length > 1) {
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
      if (XYPos.XYPosition) {
        emitCustomEvent(events.BLOCK_JOINED, {
          connectedNodes: connectedNodes,
          xyPosition: XYPos.XYPosition
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

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });
      const newNode: any = {
        id: getId(),
        type,
        position,
        data: { label: name },
        deletable: true,
        code,
        moveTo,
        XYPosition: { x: XPosition, y: YPosition }
      };
      setNodes(nds => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
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
    </ReactFlowProvider>
  );
};

export default MidArea;
