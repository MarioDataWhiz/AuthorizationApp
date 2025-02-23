import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = { userName: 'Mario' };

// Reducer function to handle updates
const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_NAME':
            return { ...state, userName: action.payload };
        default:
            return state;
    }
};

// Create Context
export const UserContext = createContext();

// Context Provider Component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ userName: state.userName, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};