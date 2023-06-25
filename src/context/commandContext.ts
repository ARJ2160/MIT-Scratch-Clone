import { createContext } from 'react';
import { CommandContextProps } from '../../types/types';

const CommandsContext = createContext<CommandContextProps>({
  commands: [],
  imageRef: null,
  setCommands: () => {}
});

export default CommandsContext;
