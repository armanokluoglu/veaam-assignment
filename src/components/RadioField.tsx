import React from 'react';
import { useFormContext } from 'react-hook-form';

type RadioFieldProps = {
    title: string;
    fieldName: string;
    enumItems: string[];
}

export function RadioField(props: RadioFieldProps) {
    const { watch, register, formState: { isSubmitted } } = useFormContext();

    return (
        <div>
            <label>{props.title + ": "}</label>
            {props.enumItems && props.enumItems.map((item) => {
                return (
                    <>
                        <input
                            type={'radio'}
                            id={item}
                            {...register(props.fieldName, { required: true })}
                        />
                        <label htmlFor={item}>{item}</label>
                    </>
                )
            })}
            {watch(props.fieldName) === null && isSubmitted && <p className='error-message'>This field is required.</p>}
        </div>
    )
}