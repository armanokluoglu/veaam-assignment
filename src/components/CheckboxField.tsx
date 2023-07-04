import React from 'react';
import { useFormContext } from 'react-hook-form';

type CheckboxFieldProps = {
    title: string;
    fieldName: string;
}

export function CheckboxField(props: CheckboxFieldProps) {
    const { register } = useFormContext();

    return (
        <div>
            <label>{props.title + ": "}</label>
            <input
                type={'checkbox'}
                {...register(props.fieldName)}
            />
        </div>
    )
}