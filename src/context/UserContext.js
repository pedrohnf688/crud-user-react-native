import React, { createContext, useReducer } from "react";
import users from '../data/users';


const initialStatae = { users };
const UserContext = createContext({});


const actions = {
    deleteUser(state, action) {
        const user = action.payload;
        return {
            ...state,
            users: state.users.filter(u => u.id !== user.id)
        }
    },
    createUser(state, action) {
        const user = action.payload;
        user.id = Math.random();
        return {
            ...state,
            users: [...state.users, user]
        }
    },
    updateUser(state, action) {
        const updated = action.payload;
        return {
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u)
        }
    }
};


export const UserProvider = props => {

    function reducer(state, action) {
        const fn = actions[action.type];
        return fn ? fn(state, action) : state;
    }

    const [state, dispatch] = useReducer(reducer, initialStatae);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;