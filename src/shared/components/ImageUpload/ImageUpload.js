import React, { useEffect, useRef, useState } from 'react';
import './ImageUpload.css';
import DefaultAvatar from '../../images/default-avatar.png';
const ImageUpload = props => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        };
        fileReader.readAsDataURL(file);
    }, [file])

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }
    return (
        <div className='row'>
            <input id={props.id} ref={filePickerRef} style={{ display: 'none' }} type="file" accept=".jpg,.png,.jpeg" onChange={pickedHandler} />
            <div className='col-md-10'>
                <div className={`image-upload ${props.center && 'center'}`}>
                    <div className='image-upload__preview'>
                        {previewUrl ? <img src={previewUrl} alt="" />
                            :
                            <img src={DefaultAvatar} alt="" />}
                    </div>
                    <button type='button' className='btn rounded-pill' onClick={pickImageHandler} style={{width: '40%'}}>Add Image</button>
                </div>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
}

export default ImageUpload;