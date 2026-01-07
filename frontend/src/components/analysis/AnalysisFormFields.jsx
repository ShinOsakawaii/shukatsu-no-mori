import { Box, TextField } from '@mui/material';
import React from 'react';

function AnalysisFormFields({ title, position, content, onChangeTitle, onChangePosition, onChangeContent }) {
    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
                fullWidth
                placeholder='제목'
                value={title}
                onChange={(evt) => onChangeTitle(evt.target.value)}
                variant='outlined'
                sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' } }}
                required
            />

            <TextField
                fullWidth
                placeholder='직군'
                value={position}
                onChange={(evt) => onChangePosition(evt.target.value)}
                variant='outlined'
                sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' } }}
                required
            />

            <TextField
                fullWidth
                placeholder='내용'
                value={content}
                onChange={(evt) => onChangeContent(evt.target.value)}
                variant='outlined'
                sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' }  }}
                multiline
                minRows={8}
                required
            />

        </Box>
    );
}

export default AnalysisFormFields;