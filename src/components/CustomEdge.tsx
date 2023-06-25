import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath
} from 'reactflow';

import './buttonedge.css';

const onEdgeClick = (
  evt: React.MouseEvent<SVGSVGElement, MouseEvent>,
  id: string
) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all'
          }}
          className='nodrag nopan'
        >
          {/* <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4 rotate-45 text-red-600 hover:text-red-500'
              onClick={event => onEdgeClick(event, id)}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div> */}
          <button
            className='edgebutton'
            onClick={(event: any) => onEdgeClick(event, id)}
          >
            X
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
