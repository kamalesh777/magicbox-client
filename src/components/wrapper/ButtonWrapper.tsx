import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react'

interface ExtendButtonProps extends ButtonProps {
    loading?: boolean
}

const ButtonWrapper = (props: ExtendButtonProps) => {
  return (
    <Button
      startIcon={props?.loading ? <CircularProgress size={18}/> : null}
      disabled={props?.loading}
      variant={props?.variant || "contained"}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default ButtonWrapper