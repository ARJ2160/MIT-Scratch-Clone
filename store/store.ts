import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges
} from 'reactflow';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  clickNodeCommand: {};
  setClickNodeCommand: (command: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>()(
  devtools((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes)
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges)
      });
    },
    onDragOver: (event: any) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge(connection, get().edges)
      });
    },
    clickNodeCommand: {},
    setClickNodeCommand: (command: any) => {
      set(state => ({
        ...state,
        clickNodeCommand: {
          ...state.clickNodeCommand,
          ...command
        }
      }));
    }
  }))
);

export default useStore;
