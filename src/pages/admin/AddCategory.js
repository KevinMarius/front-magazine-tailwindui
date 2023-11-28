import React, { useState, useEffect } from 'react';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';
import Input from '../../components/form/Input';
import Button from '../../components/Button';
import { useHttpClient } from '../../hooks/http-hook';
import { useAuth } from '../../hooks/auth-hook';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';

function AddCategory() {
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const { token } = useAuth();

    const [formState, inputHandle, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    },
        false
    );


    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = {
            title: formState.inputs.title.value,
            description: formState.inputs.description.value
        }
        try {
            const response = await sendRequest(`http://localhost:3500/api/category/create`, 'POST',
                category,
                {

                    "content-type": "application/json",
                    "Authorization": "Bearer " + token

                })
            toast.success(response.message);
        } catch (err) { }

    }

    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner />}
            <ErrorModal error={error} onClose={clearError} />
            <div className="mt-3 w-full bg-slate-50 rounded-md p-4 divide-y-2">
                <ToastContainer autoClose={2000} />
                <div className="text-align-center font-bold text-xl pb-1">
                    <h1>New category</h1>
                </div>
                <form className='pt-2' onSubmit={handleSubmit}>

                    <Input
                        element="input"
                        type="text"
                        label="Title"
                        placeholder="Title"
                        id="title"
                        errorText="please enter the valid title."
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
                        onInput={inputHandle}
                    />
                    <Input
                        element="textarea"
                        label="Description"
                        placeholder="Description"
                        id="description"
                        errorText="please enter the content with min 5 character."
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                        onInput={inputHandle}
                    />
                    <Button type="submit" bgColor="bg-orange-600" bgColorHover="bg-orange-500" disabled={!formState.isValid}>Saved</Button>
                </form>

            </div>
        </React.Fragment>
    )
}

export default AddCategory