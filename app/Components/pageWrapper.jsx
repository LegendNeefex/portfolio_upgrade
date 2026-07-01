"use client"

import { useContext, useEffect, useState } from "react";
import stateHandler from "../Context/stateHandler";
import PageLoader from "./pageLoader";

export default function PageWrapper({ children }) {
    const ctx = useContext(stateHandler);
    const routeLoading = ctx?.routeLoading;
    const [initialLoad, setInitialLoad] = useState(true);

    // handle initial page load lock
    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoad(false);
        }, 2500); // matches PageLoader duration
        return () => clearTimeout(timer);
    }, []);

    const isLocked = routeLoading || initialLoad;

    useEffect(() => {
        const html = document.documentElement;
        if (isLocked) {
            html.style.overflow = "hidden";
            html.style.height = "100%";
            html.style.position = "fixed";
            html.style.width = "100%";
        } else {
            html.style.overflow = "";
            html.style.height = "";
            html.style.position = "";
            html.style.width = "";
            // scroll to top when unlocked
            window.scrollTo(0, 0);
        }

        return () => {
            html.style.overflow = "";
            html.style.height = "";
            html.style.position = "";
            html.style.width = "";
        };
    }, [isLocked]);

    return (
        <>
            <PageLoader />
            {children}
        </>
    );
}