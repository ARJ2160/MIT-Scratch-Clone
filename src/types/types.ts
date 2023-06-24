export interface IconProps {
  name: string;
  size: number;
  className: string;
}

export interface CommandContextProps {
  commands: string;
  setCommands: (command: string) => void;
}