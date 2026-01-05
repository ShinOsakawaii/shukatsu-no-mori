import { Box, TextField } from '@mui/material';
import React from 'react';

function AnalysisFormSubmit({ title, content, onChangeTitle, onChangeContent }) {
    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
                fullWidth
                placeholder='제목'
                value={title}
                onChange={(evt) => onChangeTitle(evt.target.value)}
                variant='outlined'
                sx={{ backgroundColor: '#b8cf86', borderRadius: 3, '& fieldset': { border: 'none' } }}
            />

            <TextField
                fullWidth
                placeholder='내용'
                value={content}
                onChange={(evt) => onChangeContent(evt.target.value)}
                variant='outlined'
                sx={{ backgroundColor: '#b8cf86', borderRadius: 3, '& fieldset': { border: 'none' }  }}
                multiline
                minRows={8}
            />

        </Box>
    );
}

export default AnalysisFormSubmit;