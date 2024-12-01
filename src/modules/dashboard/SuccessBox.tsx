import React from 'react'
import { Container, Grid2, Card, CardContent, Box } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessBox = () => {
  return (
    <div className="company-form my-5">
      <Container>
        <Grid2 container offset={3} size={6}>
          <Card>
            <CardContent >
                <div className='text-center p-3'>
                <CheckCircleOutlineIcon sx={{'color': 'success.main', fontSize: '80px'}} />
                <Box component="h1" sx={{'color': 'success.main'}}>Successfully Created!</Box>
                <p className="mt-2">
                    To get started, please check your email for further details and take the necessary actions to set up and personalize your workspace.
                </p>
                </div>
            </CardContent>
          </Card>
        </Grid2>
      </Container>
    </div>
  )
}

export default SuccessBox