import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  ReactFlowProvider,
  Node,
  Edge,
  OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";
import { Sidebar } from "./Sidebar";
import CommandsContext from "../context/commandContext";

let id = 0;
const getId = () => `dndnode_${id++}`;

export const MidArea = () => {
  const { commands, setCommands } = useContext(CommandsContext);
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect: OnConnect = (params) => {
    if (params.source !== params.target) {
      setEdges((eds) => addEdge(params, eds));
      const connectedNodes = nodes.map((node: Node) => {
        if (params.source || params.target === node.id) {
          return node.data.label
        }
      })
      console.log("connected", nodes, connectedNodes);
      setCommands("");
    }
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const name = event.dataTransfer.getData("nodeText");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: name },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
      <ReactFlowProvider>
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar />
          <div className="flex-1">
            <div
              className="reactflow-wrapper h-full w-full"
              ref={reactFlowWrapper}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                // edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
                nodesDraggable
              >
                {/* <Controls /> */}
                <Background />
              </ReactFlow>
            </div>
          </div>
        </div>
      </ReactFlowProvider>
  );
};

export default MidArea;
