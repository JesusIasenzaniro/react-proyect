import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { Data } from '../../types/shared';
import { Controller } from 'react-hook-form';

function Toggle({ control, name, labelName }: Data) {
    return (
        <FormControlLabel
            control={
                <Controller
                    name={name}
                    control={control}
                    // rules={{ required: true }}
                    render={({ field }) => {
                        return <Switch {...field} checked={field.value} />;
                    }}
                />
            }
            label={labelName}
            labelPlacement='top'
        />
    );
}

export default Toggle;
