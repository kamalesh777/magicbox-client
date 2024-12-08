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
  textFieldProps?: any
}

const InputFieldWrapper = ({ label, name, rules, required, control, errors, textFieldProps }: PropTypes) => {
  return (
    <div className="mb-3">
      <Controller
        rules={{
          ...(required && {
          required: {
            value: required || false,
            message: "Field is required",
          }}),
          validate: (value) => {
            console.log("===value", value)
            const trimmed = value && value.trim();
            if (!trimmed) {
              return "Please enter valid input";
            }
            return true; // Valid input
          },
          ...rules,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            className="w-100"
            label={`${label} ${required ? "*" : ""}`}
            {...textFieldProps}
            rows={4}
          />
        )}
        name={name}
        control={control}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <Box sx={{ color: "error.main", fontSize: "fontSize" }}>
            {message}
          </Box>
        )}
      />
    </div>
  );
};

export default InputFieldWrapper