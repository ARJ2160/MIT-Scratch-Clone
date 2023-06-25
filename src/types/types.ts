export interface IconProps {
  name: string;
  size: number;
  className: string;
}

export interface CommandContextProps {
  commands: string[];
  imageRef: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>,HTMLImageElement> | null,
  setCommands: React.Dispatch<React.SetStateAction<string[]>>
}