import { Grid2, Card, CardContent, CardHeader, Box, Paper, Tooltip } from '@mui/material'
import React from 'react'
import ConfigureForm from './ConfigureForm'
import UserList from './UserList'
import { HelpOutline } from '@mui/icons-material'

const SettingComp = () => {
  return (
    <div className="company-form">
      <Grid2 container justifyContent="center">
        <Grid2 size={{ md: 8, sm: 12 }}>
          <Card className='mb-4'>
            <CardContent title='Control Panel'>
                <ConfigureForm />
            </CardContent>
          </Card>
          <Box component={"h3"}>All User's <Tooltip title="All users are listed for this current workspace"><HelpOutline fontSize="small" /></Tooltip></Box>
            <Paper >
                <UserList />
            </Paper>
        </Grid2>
      </Grid2>
    </div>
  )
}

export default SettingComp