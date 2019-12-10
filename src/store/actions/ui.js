import { UI_STOP_LOADING, UI_START_LOADING } from './actionTypes';

export const startLoading = () => {
  return {
    type: UI_START_LOADING
  };
}

export const stopLoading = () => {
  return { 
    type: UI_STOP_LOADING
  };
}