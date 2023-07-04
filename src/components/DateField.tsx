import React from 'react';
import { useFormContext } from 'react-hook-form';

type DateFieldProps = {
    title: string;
    fieldName: string;
}

export function DateField(props: DateFieldProps) {
    const { watch, register, formState: { isSubmitted } } = useFormContext();

    return (
        <div>
            <label>{props.title + ": "}</label>
            <input
                type={'date'}
                {...register(props.fieldName, { required: true })}
            />
            {watch(props.fieldName) === "" && isSubmitted && <p className='error-message'>This field is required.</p>}
        </div>
    )
}