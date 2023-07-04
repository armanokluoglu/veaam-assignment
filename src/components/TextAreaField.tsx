import React from 'react';
import { useFormContext } from 'react-hook-form';

type TextAreaFieldProps = {
    title: string;
    fieldName: string;
}

export function TextAreaField(props: TextAreaFieldProps) {
    const { watch, register, formState: { isSubmitted } } = useFormContext();

    return (
        <div>
            <label>{props.title + ": "}</label>
            <textarea
                {...register(props.fieldName, { required: true })}
            />
            {watch(props.fieldName) === "" && isSubmitted && <p className='error-message'>This field is required.</p>}
        </div>
    )
}