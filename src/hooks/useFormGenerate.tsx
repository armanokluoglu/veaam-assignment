import { useEffect, useState } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { FormGenerate, FormGenerateButtonType, FormGenerateItemType } from "../types/FormGenerate";
import { stringToJson } from "../utils/stringToJson";

type UseFormGenerate = {
    form: UseFormReturn<FormGenerate, any, undefined>;
    errorMessage: string | undefined;
    formMessage: string | undefined;
    configString: string | undefined;
    onSubmit: SubmitHandler<FormGenerate>;
    setConfigString: (value: string) => void;
    onResetClick: () => void;
    onApplyClick: () => void;
    onClear: () => void;
    onClose: () => void;
}

export function useFormGenerate(): UseFormGenerate {
    const [config, setConfig] = useState<FormGenerate>();
    const [configString, setConfigString] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [formMessage, setFormMessage] = useState<string>();

    const form = useForm<FormGenerate>();

    useEffect(() => {
        setErrorMessage(undefined);
    }, [configString])

    useEffect(() => {
        form.reset(config);
    }, [config, form])

    function onResetClick() {
        setConfigString("");
        onClose();
    }

    function onApplyClick() {
        if (configString) {
            try {
                const obj: FormGenerate = stringToJson(configString as string);
                validateConfig(obj);
                setConfig({
                    title: obj.title,
                    items: obj.items.map((val) => { return { ...val, type: val.type && enumFromStringValue(FormGenerateItemType, val.type.toUpperCase()) } }),
                    buttons: obj.buttons.map((val) => { return { ...val, type: val.type && enumFromStringValue(FormGenerateButtonType, val.type.toUpperCase()) } }),
                });
            } catch (e) {
                if (e instanceof Error) {
                    setErrorMessage(e.message);
                }
            }
        }
    }

    function validateConfig(obj: FormGenerate) {
        if (!obj.title || typeof obj.title !== "string") {
            throw new Error("Title is missing or is not in the correct format.");
        }
        if (!obj.items || !Array.isArray(obj.items)) {
            throw new Error("Items is missing or is not in the correct format.");
        }
        if (!obj.buttons || !Array.isArray(obj.buttons)) {
            throw new Error("Buttons is missing or is not in the correct format.");
        }
        if (obj.buttons.find((val) => !val.label || typeof val.label !== "string")) {
            throw new Error("Button label is missing or is not in the correct format.");
        }
        if (obj.buttons.find((val) => !val.type || !enumFromStringValue(FormGenerateButtonType, val.type.toUpperCase()))) {
            throw new Error("Button type is missing or is not in the correct format.");
        }
        if (obj.items.find((val) => !val.label || typeof val.label !== "string")) {
            throw new Error("Item label is missing or is not in the correct format.");
        }
        if (obj.items.find((val) => !val.type || !enumFromStringValue(FormGenerateItemType, val.type.toUpperCase()))) {
            throw new Error("Item type is missing or is not in the correct format.");
        }
        if (obj.items.find((val) => (
            val.type && enumFromStringValue(FormGenerateItemType, val.type.toUpperCase()) === FormGenerateItemType.ENUM &&
            (!val.enumItems || !Array.isArray(val.enumItems) || val.enumItems.find((enumItem) => typeof enumItem != "string") !== undefined)
        )
        )) {
            throw new Error("Enum items are missing or are not in the correct format.");
        }
        return;
    }

    function enumFromStringValue<T>(enm: { [s: string]: T }, value: string): T | undefined {
        const res = (Object.values(enm) as unknown as string[]).includes(value)
            ? value as unknown as T
            : undefined;
        return res;
    }

    const onSubmit: SubmitHandler<FormGenerate> = (data) => {
        setFormMessage("Submitted");
        console.log(data);
    };

    const onClear = () => {
        setFormMessage(undefined);
        form.reset();
    }

    const onClose = () => {
        setFormMessage(undefined);
        form.unregister(["buttons", "items", "title"]);
    }

    return {
        form,
        errorMessage,
        formMessage,
        configString,
        onResetClick,
        onSubmit,
        setConfigString,
        onApplyClick,
        onClear,
        onClose
    }
}