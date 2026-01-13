import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { boardReducer, initialState } from "../lib/boardReducer";

const BoardStateContext = createContext(null);
const BoardDispatchContext = createContext(null);

export function BoardProvider({ initialTasks = [], children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  useEffect(() => {
    dispatch({ type: "TASKS_INIT", payload: initialTasks });
  }, [initialTasks]);

  // stable references (nice for performance)
  const stateValue = useMemo(() => state, [state]);

  return (
    <BoardStateContext.Provider value={stateValue}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
}

export function useBoardState() {
  const ctx = useContext(BoardStateContext);
  if (!ctx) throw new Error("useBoardState must be used inside <BoardProvider />");
  return ctx;
}

export function useBoardDispatch() {
  const ctx = useContext(BoardDispatchContext);
  if (!ctx) throw new Error("useBoardDispatch must be used inside <BoardProvider />");
  return ctx;
}
