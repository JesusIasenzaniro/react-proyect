import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Data } from '../../types/shared';

function TextInput({ name, control, labelName }: Data) {
    return (
        <Controller
            name={name}
            control={control}
            // rules={{ required: true }}
            render={({ field }) => {
                return (
                    <TextField
                        {...field}
                        label={labelName}
                        id={labelName}
                        fullWidth
                    />
                );
            }}
        />
    );
}

export default TextInput;
