import React, { useState, useEffect } from 'react'
import Input from '../../components/form/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';
import { useForm } from '../../hooks/form-hook';
import ImageUpload from '../../components/form/ImageUpload';
import Button from '../../components/Button';
import MultiTags from '../../components/form/MultiTags';
import { useHttpClient } from '../../hooks/http-hook';
import { useAuth } from '../../hooks/auth-hook';
import LoadingSpinner from '../../components/LoadingSpinner';
import Modal from '../../components/Modal';
import ErrorModal from '../../components/ErrorModal';
import { ToastContainer, toast } from 'react-toastify';

function AddPost() {
    const [categories, setCategories] = useState([]);
    const [state, setState] = useState([]);
    const [tags, setTags] = useState([]);
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const { token } = useAuth();

    const formData = new FormData;

    const [formState, inputHandle, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        content: {
            value: '',
            isValid: false
        },
        picture: {
            value: null,
            isValid: false
        },
        category: {
            value: '',
            isValid: false
        },
        state: {
            value: '',
            isValid: false
        }
    },
        false
    );

    useEffect(() => {
        const getCategoriesData = async () => {
            let responseCategoriesData;
            try {
                responseCategoriesData = await sendRequest(`http://localhost:3500/api/category/get`)
                setCategories(responseCategoriesData.categories);
            } catch (err) { };
        }
        const getStateData = async () => {
            let responseStatesData;
            try {
                responseStatesData = await sendRequest(`http://localhost:3500/api/state/get`)
                setState(responseStatesData.states);
            } catch (err) { }
        }
        getCategoriesData();
        getStateData();

    }, [sendRequest]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.append('title', formState.inputs.title.value)
        formData.append('content', formState.inputs.content.value)
        formData.append('picture', formState.inputs.picture.value)
        formData.append('category', formState.inputs.category.value)
        formData.append('state', formState.inputs.state.value)
        /* var newTags = tags.map(tag => {
            return tag['text']
        }); */
        formData.append('tags', JSON.stringify(tags))

        try {
            const response = await sendRequest(`http://localhost:3500/api/post/create`, 'post',
                formData,
                {
                    "Authorization": "Bearer " + token
                }
            );
            toast.success(response.message);
        } catch (err) {}
    }

    return (
        <React.Fragment>
            <ToastContainer autoClose={2000}/>
            { isLoading && <LoadingSpinner /> }
            <ErrorModal error={error} onClose={clearError} />
            <div className=" bg-transparent w-full p-4 my-6 divide-y-2">
            <div className="text-align-center pb-2">
                <h1 className="text-xl text-gray-800 font-semibold font-sans">New post</h1>
            </div>

            <form className='pt-3 relative' onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
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
                        element="select"
                        label="Category"
                        id="category"
                        errorText="please choice the category"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandle}
                        items={categories}
                    />
                </div>
                <Input
                    element="select"
                    label="State"
                    id="state"
                    errorText="please choice the state"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandle}
                    items={state}
                />
                <MultiTags tags={tags} setTags={setTags} />
                <ImageUpload
                    id='picture'
                    onInput={inputHandle}
                />
                <Input
                    element="textarea"
                    label="Content"
                    placeholder="Content"
                    id="content"
                    errorText="Please enter the content with min 5 character."
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                    onInput={inputHandle}
                />
                <Button type="submit" bgColor="bg-orange-700" disabled={!formState.isValid}>Save</Button>
            </form>

        </div>
        </React.Fragment>
    )
}

export default AddPost