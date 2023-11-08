import React, { createContext, useContext } from 'react';

const UserContext = createContext();
export const UserProvider = ({ children }) => {

    const checkLoggedIn = () => {
        const getData = localStorage.getItem('user');
        const result = getData ? true : false;
        return result;
    }
    const checkAdmin = () => {
        const getData = localStorage.getItem('user');
        if (getData) {
            const user = JSON.parse(getData);
            return user.idPermission === 1 ? true : false;
        }
        return false;
    }

    const getUserData = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            return false;
        }
        return JSON.parse(user);
    };
    return (
        <UserContext.Provider value={{ checkLoggedIn, checkAdmin, getUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext)
}
