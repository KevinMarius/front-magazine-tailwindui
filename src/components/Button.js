import React from 'react';
import { Link } from 'react-router-dom';

const Button = props => {
  if (props.href) {
    return (
      <a
        className={`bg-${props.bgColor} ${props.underline} text-gray-400 hover:bg-${props.bgHoverColor} ${props.pointer} outline-${props.outlineColor} text-${props.textSize} font-sans font-semibold sm:text-md p-2`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`bg-${props.bgColor} w-${props.width || "[100%]"} hover:bg-${props.bgColorHover} ${props.pointer} ${props.disabled} outline-${props.outlineColor} rounded-md text-md font-sans font-semibold sm:text-lg p-2 sm:p-2`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${props.bgColor} hover:${props.bgColorHover} w-[100%] disabled:cursor-not-allowed text-sm flex justify-center sm:w-${props.width || "[100%]"} ${props.pointer} ${props.disabled} outline rounded-md text-md text-white font-sans font-semibold focus:${props.outlineColor} focus:ring-transparent sm:text-lg my-2 p-2 sm:p-2`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
