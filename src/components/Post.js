import { Outlet } from "react-router-dom";
import React from "react";

export default function Post() {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}