export interface IconProps {
  name: string;
  size: number;
  className: string;
}

export interface CommandContextProps {
  commands: string[];
  imageRef: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > | null;
  setCommands: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ActionProps {
  onDragStart: (
    event: any,
    nodeType: string,
    text: string,
    code: string,
    moveTo?: string,
    XYPos?: { x: number; y: number },
    message?: string,
    timer?: number,
    delayTimer?: number
  ) => void;
}
