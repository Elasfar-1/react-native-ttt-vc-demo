import { createContext } from "react";
// context to manage the timing for current action. 
export const actionContex = createContext({
    actionManager: { start: new Date(), end: null, rout: 'Index' },
    setActionManager: null,
  });