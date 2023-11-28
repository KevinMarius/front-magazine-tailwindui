import React, { useReducer, useEffect } from 'react';

import { validate } from "../../utils/validators";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

const Input = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || "",
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const touchHandle = (e) => {
        dispatch({ type: 'TOUCH' })
    }

    const changeHandle = (e) => {
        dispatch({
            type: "CHANGE",
            val: e.target.value,
            validators: props.validators
        })
    }


    let array = []

    if (props.items && props.items.length > 0) {
        props.items.map((item, index) => {
            array.push(<option key={index} value={item._id} >{item.title}</option>)
        });
    }

    const element = props.element === "input" ?
        (
            <input
                className={`p-2 mt-1 border w-full border-gray-300 rounded-lg placeholder:font-alata placeholder:text-md focus:outline-none active:outline-none focus:shadow-md focus:ring-orange-600 focus:border-none ${!inputState.isValid && inputState.isTouched && 'border-red-500 text-red-600'}`}
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandle}
                onBlur={touchHandle}
                value={inputState.value}
            />
        ) : props.element === "select" ? (
            <select id={props.id} value={inputState.value} onChange={changeHandle} onBlur={touchHandle} className={`p-2 mt-1 border w-[100%] border-gray-300 rounded-lg placeholder:font-alata placeholder:text-md focus:border-none focus:ring-orange-600 focus:outline-none active:outline-none ${!inputState.isValid && inputState.isTouched && 'border-red-500 text-red-600'}`} aria-label="Default select example">
                <option>Select the {props.label}</option>
                {array}
            </select>
        ) : (
            <textarea
                className={`p-2 mt-1 border w-[100%] border-gray-300 rounded-lg placeholder:font-alata placeholder:text-md active:outline-none focus:ring-orange-600 focus:shadow-md focus:border-none focus:outline-none ${!inputState.isValid && inputState.isTouched && 'border-red-500 text-red-600'}`}
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandle}
                placeholder={props.placeholder}
                onBlur={touchHandle}
                value={inputState.value}
            />
        )

    return (
        <div className='my-3 flex flex-col w-full'>
            <label className='font-semibold font-alata text-sm' htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p className="text-red-600 text-sm">{props.errorText}</p>}
        </div>
    )
}

export default Input;