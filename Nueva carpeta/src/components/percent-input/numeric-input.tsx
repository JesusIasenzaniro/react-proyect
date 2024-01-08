import { InputBaseComponentProps, TextField } from '@mui/material';
import React, { ElementType } from 'react';
import { Data } from '../../types/shared';
import { Controller } from 'react-hook-form';
import NumericFormatCustom from './numeric-format-custom/numeric-format-custom';

type NumericFormat =
    | 'moneyMarket'
    | 'fixedIncome'
    | 'balance'
    | 'alternatives'
    | 'equity'
    | 'fundOfFunds'
    | 'othersProductSegmentation'
    | 'totalProductSegmentation'
    | 'retail'
    | 'othersClientSegmentation'
    | 'captive'
    | 'totalClientSegmentation'
    | 'institutional'
    | 'yOne'
    | 'yTwo'
    | 'yThree'
    | 'yFour'
    | 'yFive';

function NumericInput({ control, name, labelName }: Data) {
    return (
        <Controller
            name={name as NumericFormat}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label={labelName}
                    name='numberformat'
                    id={`formatted-numberformat-input-${name}`}
                    InputProps={{
                        inputComponent:
                            NumericFormatCustom as ElementType<InputBaseComponentProps>,
                    }}
                    variant='outlined'
                    size='small'
                    disabled={
                        name === 'totalProductSegmentation' ||
                        name === 'totalClientSegmentation'
                    }
                />
            )}
        />
    );
}

export default NumericInput;
