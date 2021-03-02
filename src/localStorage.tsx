import { RootState } from "./App";

export const loadState = () => { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state: RootState) => { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
}