import { FormGenerateItem, FormGenerateItemType } from "../types/FormGenerate";
import { CheckboxField } from "./CheckboxField";
import { DateField } from "./DateField";
import { NumericField } from "./NumericField";
import { RadioField } from "./RadioField";
import { TextAreaField } from "./TextAreaField";
import { TextField } from "./TextField";

type FormFieldProps = {
    fieldName: string;
    item: FormGenerateItem;
}

export function FormField(props: FormFieldProps) {
    const { fieldName, item } = props;

    if (item.type === FormGenerateItemType.NUMERIC) {
        return (
            <NumericField
                title={item.label}
                fieldName={fieldName}
            />
        )
    }
    if (item.type === FormGenerateItemType.STRING) {
        return (
            <TextField
                title={item.label}
                fieldName={fieldName}
            />
        )
    }
    if (item.type === FormGenerateItemType.BOOLEAN) {
        return (
            <CheckboxField
                title={item.label}
                fieldName={fieldName}
            />
        )
    }
    if (item.type === FormGenerateItemType.DATE) {
        return (
            <DateField
                title={item.label}
                fieldName={fieldName}
            />
        )
    }
    if (item.type === FormGenerateItemType.ENUM) {
        return (
            <RadioField
                title={item.label}
                fieldName={fieldName}
                enumItems={item.enumItems as string[]}
            />
        )
    }
    if (item.type === FormGenerateItemType.MULTILINE) {
        return (
            <TextAreaField
                title={item.label}
                fieldName={fieldName}
            />
        )
    }
    return <></>
}