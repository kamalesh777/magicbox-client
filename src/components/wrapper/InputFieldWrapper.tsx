import { ErrorMessage } from '@hookform/error-message';
import { Box, TextField } from '@mui/material';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

interface PropTypes {
  label?: string;
  name: string;
  rules?: Record<string, any>;
  required?: boolean;
  control: any;
  errors?: Record<string, any>;
}

const InputFieldWrapper = ({ label, name, rules, required, control, errors }: PropTypes) => {
  return (
    <div className="mb-3">
      <Controller
        rules={{
            required: {
                value: required || false,
                message: "Field is required",
            },
            ...rules,
        }}
        render={({ field }) => (
          <TextField {...field} size="small" className="w-100" label={label} />
        )}
        name={name}
        control={control}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <Box sx={{ color: "error.main" }}>{message}</Box>
        )}
      />
    </div>
  );
};

export default InputFieldWrapper