import React, { useRef, useEffect, useState } from 'react'
import './imageUpload.css'

const ImageUpload = props => {

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const fileChoiceRef = useRef();

    const choiceImageHandler = () => {
        fileChoiceRef.current.click();
    }

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file])

    const choiceHandler = (e) => {
        let choiceFile;
        let fileIsValid = isValid;
        if (e.target.files && e.target.files.length === 1) {
            choiceFile = e.target.files[0];
            setFile(choiceFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, choiceFile, fileIsValid);
    }

    return (
        <div className="my-8">
            <input
                type='file'
                id={props.id}
                ref={fileChoiceRef}
                style={{ display: 'none' }}
                accept=".jpg,.png,.jpeg"
                onChange={choiceHandler}
            />
            <div className={`flex justify-center gap-4 items-center flex-col ${props.center && 'center'}`}>
                <div className="w-1/2 md:w-1/3 rounded-sm h-28 border border-gray-400 flex justify-center items-center my-4 text-center">
                    {previewUrl && <img className='w-full h-28 my-3' src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <input type="button" className='bg-orange-700 rounded-md px-3 py-1 cursor-pointer' onClick={choiceImageHandler} value='Choice image' />
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload