import {
    CURRENT_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    UPDATE_CURRENT_TAB
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case CURRENT_TASKS:
            return {
                ...state,
                tasks: action.tasks,
            };

        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task],
            };

        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    return action.task.id === task.id ?
                        { ...action.task } : task
                })
            };

        case DELETE_TASK:
            let newState = state.tasks.filter(task => {
                return task.id !== action.id;
            });
            return {
                ...state,
                tasks: newState
            };

        case UPDATE_CURRENT_TAB:
            return {
                ...state,
                currentTab: action.currentTab
            };

        default:
            return state;
    }
};
