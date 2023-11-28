import React from 'react'
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_DATE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_PASSWORD, VALIDATOR_REQUIRE } from '../../utils/validators';
import Input from '../../components/form/Input';
import ImageUpload from '../../components/form/ImageUpload';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth-hook';
import { useHttpClient } from '../../hooks/http-hook';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import ErrorModal from '../../components/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner';

function AddUser() {
    const [roles, setRoles] = useState([]);
    const { token } = useAuth();
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const [formState, inputHandle, setFormData] = useForm({
        name: {
            value: '',
            isValid: false
        },
        surname: {
            value: '',
            isValid: false
        },
        dateBorn: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: null,
            isValid: false
        },
        password1: {
            value: null,
            isValid: false
        },
        picture: {
            value: '',
            isValid: false
        },
        phone: {
            value: '',
            isValid: false
        },
        role: {
            value: '',
            isValid: false
        }
    },
        false
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData;
        formData.append('name', formState.inputs.name.value);
        formData.append('surname', formState.inputs.surname.value);
        formData.append('dateBorn', formState.inputs.dateBorn.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('picture', formState.inputs.picture.value);
        formData.append('phone', formState.inputs.phone.value);
        formData.append('role', formState.inputs.role.value);
        formData.append('password1', formState.inputs.password1.value);
        formData.append('password', formState.inputs.password.value);
        //const token = currentUser.userData.token;

        try {
            const response = await sendRequest(`http://localhost:3500/api/user/create`,
                'post', formData, {
                "Authorization": "Bearer " + token
            });
            toast.success(response.message);
        } catch (err) { }

    }

    useEffect(() => {

        const getRoleData = async () => {
            let responseRoleData;
            try {
                responseRoleData = await sendRequest(`http://localhost:3500/api/role/get`)
                setRoles(responseRoleData.roles);
            } catch (err) { }
        }

        getRoleData();

    }, [sendRequest]);


    return (
        <React.Fragment>
            <ToastContainer autoClose={2000} />
            {isLoading && <LoadingSpinner />}
            <ErrorModal error={error} onClose={clearError} />
            <div className=" bg-transparent w-full p-4 my-6 divide-y-2">
                <div className="text-align-center pb-2">
                    <h1 className="text-xl text-gray-800 font-semibold font-sans">New User</h1>
                </div>
                <form className='pt-3 relative' onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <Input
                            element="input"
                            type="text"
                            label="Name"
                            placeholder="Name"
                            id="name"
                            errorText="please enter the valid name."
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]}
                            onInput={inputHandle}
                        />
                        <Input
                            element="input"
                            type="text"
                            label="Surname"
                            placeholder="Surname"
                            id="surname"
                            errorText="please enter the valid surname."
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]}
                            onInput={inputHandle}
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <Input
                            element="input"
                            type="date"
                            label="Birthday"
                            id="dateBorn"
                            errorText="please enter the valid birthday."
                            validators={[VALIDATOR_DATE(), VALIDATOR_REQUIRE()]}
                            onInput={inputHandle}
                        />
                        <Input
                            element="input"
                            type="email"
                            label="Email"
                            placeholder="Email"
                            id="email"
                            errorText="please enter the valid email."
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                            onInput={inputHandle}
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <Input
                            element="input"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            id="password"
                            errorText="please enter the valid password."
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD()]}
                            onInput={inputHandle}
                        />
                        <Input
                            element="input"
                            type="password"
                            label="Confirm this Password"
                            placeholder="Password"
                            id="password1"
                            errorText="please enter the valid password."
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD()]}
                            onInput={inputHandle}
                        />
                    </div>

                    <div className="my-3">
                        <ImageUpload
                            center
                            id="picture"
                            onInput={inputHandle}
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <Input
                            element="input"
                            label="Phone"
                            type="tel"
                            placeholder="Phone"
                            id="phone"
                            errorText="please enter the valid phone number."
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandle}
                        />
                        <Input
                            element="select"
                            label="Role"
                            id="role"
                            errorText="please choice the role"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandle}
                            items={roles}
                        />
                    </div>

                    <Button type="submit" bgColor="bg-orange-600" bgColorHover="bg-orange-500" disabled={!formState.isValid}>Save</Button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default AddUser