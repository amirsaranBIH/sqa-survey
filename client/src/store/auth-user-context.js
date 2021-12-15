import React from 'react';

const AuthUserContext = React.createContext({
    user: null,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
});

export function AuthUserContextProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const context = { user, isAuthenticated, setUser, setIsAuthenticated };

    return (
        <AuthUserContext.Provider value={context}>
            {children}
        </AuthUserContext.Provider>
    );
}

export default AuthUserContext;