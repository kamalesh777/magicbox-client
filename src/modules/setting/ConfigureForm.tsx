import ButtonWrapper from '@/components/wrapper/ButtonWrapper'
import InputFieldWrapper from '@/components/wrapper/InputFieldWrapper'
import { PRIMARY_DOMAIN } from '@/constants/AppConstant'
import { Checkbox, FormControlLabel, Grid2, InputAdornment } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

const ConfigureForm = () => {

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      company_name: "",
      workspace_name: "",
    },
  });
  return (
    <form>
      <h3>Control Panel</h3>
      
      <FormControlLabel className='d-block' control={<Checkbox defaultChecked />} label="Ready to play?" />
      <FormControlLabel className='d-block' control={<Checkbox defaultChecked />} label="Stop profile updation" />
    </form>
  )
}

export default ConfigureForm