import React, { useEffect } from 'react';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';
import Input from '../../components/form/Input';
import Button from '../../components/Button';
import { useHttpClient } from '../../hooks/http-hook';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../components/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../hooks/auth-hook';
import { ToastContainer, toast } from 'react-toastify';

function UpdateCategory() {
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const id = useParams().id;
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

    useEffect(() => {
        const getCategoryData = async () => {
            try {
                const response = await sendRequest(`http://localhost:3500/api/category/get/${id}`);
                setFormData({
                    title: {
                        value: response.category.title,
                        isValid: true
                    },
                    description: {
                        value: response.category.description,
                        isValid: true
                    }
                }, true);
            } catch (err) { }
        }

        getCategoryData()
    }, [sendRequest, setFormData, id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = {
            title: formState.inputs.title.value,
            description: formState.inputs.description.value
        }

        try {
            const response = await sendRequest(`http://localhost:3500/api/category/update/${id}`, 'PUT', 
                category, 
                { 
                    "Authorization": "Bearer "+ token
                }
            );
            toast.success(response.message)
        }catch(err) {}

    }

    return (
        <React.Fragment>
            <ToastContainer autoClose={2000}/>
            <ErrorModal error={error} onClose={clearError} />
            <div className="mt-3 w-full bg-slate-50 rounded-md p-4 divide-y-2">
                <div className="text-align-center font-bold text-xl pb-1">
                    <h1>Update category</h1>
                </div>
                {isLoading ? <LoadingSpinner /> : (
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
                            initialValue={formState.inputs.title.value}
                            initialValid={formState.inputs.title.isValid}
                        />
                        <Input
                            element="textarea"
                            label="Description"
                            placeholder="Description"
                            id="description"
                            errorText="please enter the content with min 5 character."
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                            onInput={inputHandle}
                            initialValue={formState.inputs.description.value}
                            initialValid={formState.inputs.title.isValid}
                        />
                        <Button type="submit" bgColor="bg-orange-600" bgColorHover="bg-orange-500" disabled={!formState.isValid}>Saved</Button>
                    </form>
                )}


            </div>
        </React.Fragment>
    )
}

export default UpdateCategory