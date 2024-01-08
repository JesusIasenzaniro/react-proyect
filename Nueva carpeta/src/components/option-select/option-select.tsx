import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { IFormInputs } from '../../types/shared';

interface Props {
    control: Control<IFormInputs>;
    name: string;
    data: string[];
    label: boolean;
    labelId?: string;
    selectId?: string;
    labelName?: string;
    error?: boolean;
}
const OptionSelect = ({
    control,
    name,
    data,
    label,
    labelId,
    selectId,
    labelName,
    error,
}: Props) => {
    return (
        <FormControl fullWidth>
            {label && <InputLabel id={labelId}>{labelName}</InputLabel>}
            <Controller
                name={
                    name as
                        | 'type'
                        | 'format'
                        | 'status'
                        | 'year'
                        | 'month'
                        | 'quarter'
                        | 'assetManagerDSLinkedToTheReport'
                        | 'entityType'
                }
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <Select
                        labelId={labelId}
                        label={labelName}
                        id={selectId}
                        {...field}
                        error={error}
                    >
                        {data.map((d) => (
                            <MenuItem value={d} key={d}>
                                {d}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </FormControl>
    );
};

export default OptionSelect;
