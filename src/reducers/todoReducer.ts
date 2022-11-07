import { Todo } from "../model";

export type Actions = { type: "update"; payload: Todo[]}

const TodoReducer = (state: Todo[], action: Actions): Todo[] => { 
    const { type, payload } = action;   
        
    switch (type) {
        case 'update':
            return payload;
        default:
            return state;
    };
};

export default TodoReducer;