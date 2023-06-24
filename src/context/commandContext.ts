import { createContext } from "react";
import { CommandContextProps } from "../types/types";

const CommandsContext = createContext<CommandContextProps>({
  commands: "",
  setCommands: () => {},
});

export default CommandsContext;