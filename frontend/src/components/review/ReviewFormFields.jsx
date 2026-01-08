import { Box, MenuItem, TextField } from '@mui/material';
import React from 'react';

function ReviewFormFields({ title, position, content, stage, result, onChangeTitle, onChangePosition, onChangeContent, onChangeStage, onChangeResult }) {

    const stages = ["ES", "1차 면접", "2차 면접", "최종 면접", "적성 검사", "기타"];
    const results = ["합격", "불합격", "대기 중"];

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
                select
                label='전형 단계'
                placeholder='전형단계'
                value={stage}
                onChange={(evt) => onChangeStage(evt.target.value)}
                fullWidth
                sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' } }}
                size="small"
            >
                <MenuItem value="">
                    선택하세요
                </MenuItem>
                {stages.map((s) => (
                    <MenuItem key={s} value={s}>
                        {s}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="결과"
                placeholder='결과'
                value={result}
                onChange={(evt) => onChangeResult(evt.target.value)}
                fullWidth
                sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' } }}
                size="small"
            >
                <MenuItem value="">
                    선택하세요
                </MenuItem>
                {results.map((s) => (
                    <MenuItem key={s} value={s}>
                        {s}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                placeholder='내용'
                value={content}
                onChange={(evt) => onChangeContent(evt.target.value)}
                variant='outlined'
                sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' } }}
                multiline
                minRows={8}
                required
            />

        </Box>
    );
}

export default ReviewFormFields;