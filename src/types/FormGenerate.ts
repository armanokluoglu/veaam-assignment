export type FormGenerate = {
    title: string;
    buttons: FormGenerateButton[];
    items: FormGenerateItem[];
}

export type FormGenerateButton = {
    label: string;
    type: FormGenerateButtonType | undefined;
}

export type FormGenerateItem = {
    label: string;
    type: FormGenerateItemType | undefined;
    enumItems?: string[];
}

export enum FormGenerateItemType {
    NUMERIC = "NUMERIC",
    STRING = "STRING",
    MULTILINE = "MULTILINE",
    BOOLEAN = "BOOLEAN",
    DATE = "DATE",
    ENUM = "ENUM"
}

export enum FormGenerateButtonType {
    SUBMIT = "SUBMIT",
    CLOSE = "CLOSE",
    CLEAR = "CLEAR"
}