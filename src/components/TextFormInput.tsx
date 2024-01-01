import { InputAdornment, TextField } from "@mui/material";
import React from "react";

type TextFormInputProps = {
    id: string,
    type: "number" | "text",
    label: string,
    adornment?: {
        position: "start" | "end" | "",
        text: string | "",
    },
    error: boolean,
    fieldProps: any,
    margin?: string,
};

type Adornment = {
    startAdornment: React.ReactNode | null,
    endAdornment: React.ReactNode | null,
}

const TextFormInput = ({id, type, label, adornment, error, fieldProps, margin}: TextFormInputProps) => {
    let componentAdornment:Adornment = { startAdornment: null, endAdornment: null};

    if (adornment?.position === "start") {
        componentAdornment["startAdornment"] = <InputAdornment position="start">{adornment.text}</InputAdornment>;
    }
    else if (adornment?.position === "end") {
        componentAdornment["endAdornment"] = <InputAdornment position="end">{adornment.text}</InputAdornment>;
    }
    
    return (<TextField
        id={id}
        type={type}
        label={label}
        InputLabelProps={{
            shrink: true,
        }}
        InputProps={componentAdornment}
        sx={{width: "100%", borderRadius: "4px", padding: "0", margin: margin || ""}}
        error={error}
        {...fieldProps}
    />)
};

export default TextFormInput;