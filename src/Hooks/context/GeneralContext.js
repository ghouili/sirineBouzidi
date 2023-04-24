import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const GeneralContext = createContext();

const ProviderContext = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const ToggleSidebar = () => {
        var sidebar = document.getElementById("main__sidebar");
        setSidebarOpen(!sidebarOpen);
        if (!sidebarOpen) {
            sidebar.style.width = "255px";
        } else {
            sidebar.style.width = "85px";
        }
    }
    // const handelCallBackResponse = async (response) => {
    //     console.log("encodd jwt id token " + response.credential);
    //     var useObject = jwt_decode(response.credential);
    //     console.log(useObject);

    // };
    // useEffect(() => {
    //     /* global google */
    //     google.accounts.id.initialize({
    //         client_id:
    //             "1028646392996-4d487tbr77eub6fen2oi1f3eumtsi03i.apps.googleusercontent.com",
    //         callback: handelCallBackResponse,
    //     });

    //     google.accounts.id.renderButton(document.getElementById("SignInID"), {
    //         theme: "outline",
    //         size: "large",
    //     });
    //     google.accounts.id.prompt();
    // }, []);



    const values = { sidebarOpen, setSidebarOpen, ToggleSidebar };
    return (
        <GeneralContext.Provider value={values} >
            {children}
        </GeneralContext.Provider>
    )
}

export { ProviderContext, GeneralContext }