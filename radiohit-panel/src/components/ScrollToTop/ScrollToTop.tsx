"use client";
import { useEffect } from "react";
import React from "react";

const ScrollToTop = () => {
    //Scroll to top on destination page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
};

export default ScrollToTop;
