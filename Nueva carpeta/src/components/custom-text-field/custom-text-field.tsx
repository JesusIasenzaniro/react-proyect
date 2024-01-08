import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface TextFieldCustomProps {
    autoFocus?: boolean;
    margin?: TextFieldProps['margin'];
    id?: string;
    label: string;
    type?: React.HTMLInputTypeAttribute;
    variant?: TextFieldProps['variant'];
    value?: string;
    onChange?: (value: string) => void;
    fullWidth?: boolean;
}

const TextFieldCustom: React.FC<TextFieldCustomProps> = ({
    autoFocus = false,
    margin = 'dense',
    id,
    label,
    type = 'text',
    variant = 'standard',
    value,
    onChange,
    fullWidth = true,
}) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <TextField
            autoFocus={autoFocus}
            margin={margin}
            id={id}
            label={label}
            type={type}
            fullWidth={fullWidth}
            variant={variant}
            value={value}
            onChange={handleInputChange}
        />
    );
};

export default TextFieldCustom;
