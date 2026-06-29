"use client";

import { createContext, useState } from "react";

const stateHandler = createContext()

export const ApiProvider = ({children}) => {
    const [overlay,setOverlay] = useState(false)
    const [burgerIcon,setBurgerIcon] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)
    const [routeLoading, setRouteLoading] = useState(false)


    const ContactOverlayHandler = () =>{
        setOverlay(true)
    }

    function burgerIconHandler() {
        setBurgerIcon(true)
    }

    const stateData ={
        overlay,
        burgerIcon,
        selectedProject,
        routeLoading,
        setOverlay,
        ContactOverlayHandler,
        setBurgerIcon,
        setSelectedProject,
        burgerIconHandler,
        setRouteLoading
    }





    return <stateHandler.Provider value={stateData}>
        {children}
    </stateHandler.Provider>
}

export default stateHandler;