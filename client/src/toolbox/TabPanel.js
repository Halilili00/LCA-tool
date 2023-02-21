import React, { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'

const TabPanel = (tabValues) => {
    const [tabValue, setValue] = useState(tabValues[0].value)

    const handleTabChange = (e, newValue) => {
        setValue(newValue)
    }

    console.log(tabValue)
    console.log(tabValues)
    const TabsP = () => {
        return (
            <Box sx={{ width: '100%', backgroundColor: "white" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        {tabValues.map((tabValue, index) => (
                            <Tab key={index} label={tabValue.label} value={tabValue.value}/>
                        ))}
                    </Tabs>
                </Box>
            </Box>
        )
    }

    return [TabsP, tabValue]
}

export default TabPanel