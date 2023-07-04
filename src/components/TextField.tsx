import React from 'react';
import { useFormContext } from 'react-hook-form';

type TextFieldProps = {
    title: string;
    fieldName: string;
}

export function TextField(props: TextFieldProps) {
    const { watch, register, formState: { isSubmitted } } = useFormContext();

    return (
        <div>
            <label>{props.title + ": "}</label>
            <input
                type={'text'}
                {...register(props.fieldName, { required: true })}
            />
            {watch(props.fieldName) === "" && isSubmitted && <p className='error-message'>This field is required.</p>}
        </div>
    )
}