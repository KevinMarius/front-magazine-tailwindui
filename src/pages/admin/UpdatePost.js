import React, { useState, useEffect } from 'react'
import Input from '../../components/form/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_FILE } from '../../utils/validators';
import { useForm } from '../../hooks/form-hook';
import ImageUpload from '../../components/form/ImageUpload';
import Button from '../../components/Button';
import MultiTags from '../../components/form/MultiTags';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { useAuth } from '../../hooks/auth-hook';
import { ToastContainer, toast } from 'react-toastify';


function UpdatePost() {
    const id = useParams().id;
    const [tags, setTags] = useState([]);
    const [post, setPost] = useState([])
    const [categories, setCategories] = useState([])
    const [state, setState] = useState([])
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const { token } = useAuth();

    const [formState, inputHandle, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        content: {
            value: '',
            isValid: false
        }
    },
        false
    );

    useEffect(() => {
        const getPostData = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:3500/api/post/get/${id}`);
                setPost(responseData.post);
                setTags(JSON.parse(responseData.post.tags));

                setFormData({
                    title: {
                        value: responseData.post.title,
                        isValid: true
                    },
                    content: {
                        value: responseData.post.content,
                        isValid: true
                    },
                    picture: {
                        value: responseData.post.picture,
                        isValid: true
                    },
                    category: {
                        value: responseData.post.categoryId,
                        isValid: true
                    },
                    state: {
                        value: responseData.post.stateId,
                        isValid: true
                    }
                }, true);
            } catch (err) { }

        }
        getPostData();
    }, [sendRequest, id, setFormData])

    useEffect(() => {
        const getCategoriesData = async () => {
            let responseCategoriesData;
            try {
                responseCategoriesData = await sendRequest(`http://localhost:3500/api/category/get`);
                setCategories(responseCategoriesData.categories)
            } catch (err) { }
        }
        const getStateData = async () => {
            let responseStatesData;
            try {
                responseStatesData = await sendRequest(`http://localhost:3500/api/state/get`);
                setState(responseStatesData.states)
            } catch (err) { }
        }

        getStateData()
        getCategoriesData()
    }, [sendRequest]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData;

        formData.append('title', formState.inputs.title.value)
        formData.append('content', formState.inputs.content.value)
        formData.append('picture', formState.inputs.picture.value)
        formData.append('category', formState.inputs.category.value)
        formData.append('state', formState.inputs.state.value)
        formData.append('tags', JSON.stringify(tags))

        try {
            const response = await sendRequest(`http://localhost:3500/api/post/${id}`, 'PUT',
                formData, {
                "Authorization": "Bearer " + token
            })
            toast.success(response.message)
        } catch (err) { }

    }

    return (
        <React.Fragment>
            <ToastContainer autoClose={2000} />
            <ErrorModal error={error} onClose={clearError} />
            {isLoading && <LoadingSpinner />}
            <div className=" bg-transparent w-full p-4 my-6 divide-y-2">
                <div className="text-align-center pb-2">
                    <h1 className="text-xl text-gray-800 font-semibold font-sans">Update post</h1>
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
                            initialValue={post.title}
                            initialValid={true}
                        />
                        <Input
                            element="select"
                            label="Category"
                            id="category"
                            errorText="please choice the category"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandle}
                            items={categories}
                            initialValid={true}
                            initialValue={post.categoryId}
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
                        initialValid={true}
                        initialValue={post.stateId}
                    />
                    <MultiTags tags={tags} setTags={setTags} />
                    <ImageUpload
                        id='picture'
                        initialValue={post.picture}
                        onInput={inputHandle}
                        validators={[VALIDATOR_FILE()]}
                        initialValid={true}
                    />

                    <Input
                        element="textarea"
                        label="Content"
                        placeholder="Content"
                        id="content"
                        errorText="Please enter the content with min 5 character."
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                        onInput={inputHandle}
                        initialValid={true}
                        initialValue={post.content}
                    />
                    <Button type="submit" bgColor="bg-orange-700" disabled={!formState.isValid}>Save</Button>
                </form>

            </div>
        </React.Fragment>
    )
}

export default UpdatePost