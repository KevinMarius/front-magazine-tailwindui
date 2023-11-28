import { Outlet } from "react-router-dom";
import React from "react";

export default function User() {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}