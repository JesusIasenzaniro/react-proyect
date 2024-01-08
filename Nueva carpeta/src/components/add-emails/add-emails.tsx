import { IFormInputs } from '../../types/shared';
import { CustomTextFieldStyles } from '../custom-text-field-styles/custom-text-field-styles';
import { Control, Controller } from 'react-hook-form';

interface Props {
    control: Control<IFormInputs>;
}

const AddEmails = ({ control }: Props) => {
    return (
        <Controller
            name='addEmail'
            control={control}
            render={({ field }) => (
                <CustomTextFieldStyles
                    {...field}
                    id='add-email-input'
                    placeholder='Add emails separated by ";" and ending in "@allfunds"'
                    label='Add emails'
                    fullWidth
                    type='search'
                />
            )}
        />
    );
};

export default AddEmails;
