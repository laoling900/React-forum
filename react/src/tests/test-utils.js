import React, { useState } from 'react';
import {render} from '@testing-library/react';
import UserContext from "../contexts/UserContext";
import { BrowserRouter as Router } from 'react-router-dom';



//Set up a render environment to the renter component without any user login
const ContextsProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return(
        <UserContext.Provider value={{ user,setUser }}>
            <Router>
                {children}
            </Router>
        </UserContext.Provider>
    )
}

//Set up a render environment to the renter component with a user login
const ContextsProviderAlreadLogin = ({children}) => {
    
    let theUser ={
        user_id: 10,
        user_name: "testUser",
        user_email:"testUser@gmail.com",
        user_password:"testUserPassword"
    }

    const [user, setUser] = useState(theUser);
    return(
        <UserContext.Provider value={{ user,setUser }}>
            <Router>
                {children}
            </Router>
        </UserContext.Provider>
    )
}



const customRender = (ui, options) =>
    render(ui, {wrapper: ContextsProvider, ...options})

const customRenderAlreadLogin = (ui, options) =>
    render(ui, {wrapper: ContextsProviderAlreadLogin, ...options})


// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender,customRenderAlreadLogin}