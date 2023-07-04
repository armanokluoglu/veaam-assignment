import React from 'react';
import { useFormContext } from 'react-hook-form';

type NumericFieldProps = {
    title: string;
    fieldName: string;
}

export function NumericField(props: NumericFieldProps) {
    const { watch, register, formState: { isSubmitted } } = useFormContext();

    return (
        <div>
            <label>{props.title + ": "}</label>
            <input
                type={'number'}
                {...register(props.fieldName, { required: true })}
            />
            {watch(props.fieldName) === "" && isSubmitted && <p className='error-message'>This field is required.</p>}
        </div>
    )
}