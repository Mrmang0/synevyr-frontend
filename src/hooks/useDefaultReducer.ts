import { useReducer } from "react";

const defaultReducer =
  <T>() =>
  (state: T, action: { type: keyof T; payload: unknown }): T => {
    return { ...state, [action.type]: action.payload };
  };

export const useDefaultReducer = <T>(
  initialState: T
): [T, React.Dispatch<{ type: keyof T; payload: unknown }>] => {
  return useReducer(defaultReducer<T>(), initialState);
};