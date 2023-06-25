import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';

export default function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd
}: any) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  // const onEdgeClick = (evt, id) => {
  //   evt.stopPropagation();
  //   const params = {
  //     type: "remove",
  //     id,
  //   };
  //   setEdges((els) => applyEdgeChanges([params], els));
  // };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all'
          }}
          className='nodrag nopan'
        >
          <button
            className='edgebutton'
            // onClick={(event) => onEdgeClick(event, id)}
          >
            X
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
