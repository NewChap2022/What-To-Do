import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';

const preloadedState = {
    tasks: [],
    currentTab: "todo"
}

export const store = configureStore({
    reducer,
    preloadedState
})
