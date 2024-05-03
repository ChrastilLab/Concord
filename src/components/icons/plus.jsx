import React from "react";

export const PlusIcon = ({ ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-48 h-48"
            strokeWidth={.1}
            stroke="currentColor"
            fill="None"
            {...props}
        >
            <path
                xmlns="http://www.w3.org/2000/svg"
                id="Path 0"
                strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
    );
};
