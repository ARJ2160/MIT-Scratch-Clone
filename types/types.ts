export interface IconProps {
  name: string;
  size: number;
  className: string;
}

export interface ActionProps {
  onDragStart: (
    event: any,
    nodeType: string,
    text: string,
    code: string,
    rotate?: number,
    moveTo?: string,
    XYPos?: { x: number; y: number },
    message?: string,
    timer?: number
  ) => void;
}
