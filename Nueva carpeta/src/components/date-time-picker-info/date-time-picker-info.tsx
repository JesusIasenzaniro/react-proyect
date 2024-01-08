import React from 'react';
import { Controller } from 'react-hook-form';
import { Data } from '../../types/shared';
import { DateTimePicker } from '@mui/x-date-pickers';

function DateTimePickerInfo({ labelName, name, control }: Data) {
    return (
        <Controller
            name={name as 'dateTimeReportsList'}
            control={control}
            // rules={{ required: true }}
            render={({ field }) => (
                <DateTimePicker
                    sx={{ width: '100%' }}
                    label={labelName}
                    {...field}
                />
            )}
        />
    );
}

export default DateTimePickerInfo;
