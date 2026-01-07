import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';

function ReviewFormFields({
    title,
    position,
    stage,
    result,
    content,
    onChangeTitle,
    onChangePosition,
    onChangeStage,
    onChangeResult,
    onChangeContent
}) {
    // 백엔드 엔티티가 String 타입이므로, 여기에 적힌 value들이 그대로 DB에 저장됩니다.
    const stageOptions = [
        { label: '서류 전형(ES)', value: 'ES' },
        { label: '1차 면접', value: 'FIRST_INTERVIEW' },
        { label: '2차 면접', value: 'SECOND_INTERVIEW' },
        { label: '최종 면접', value: 'FINAL_INTERVIEW' },
        { label: '인적성/필기', value: 'TEST' },
        { label: '기타', value: 'ETC' }
    ];

    const resultOptions = [
        { label: '합격', value: 'PASS' },
        { label: '불합격', value: 'FAIL' },
        { label: '대기중', value: 'PENDING' }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 제목 */}
            <TextField
                id="review-title"
                fullWidth
                label="제목"
                placeholder='후기 제목을 입력하세요'
                value={title}
                onChange={(evt) => onChangeTitle(evt.target.value)}
                variant='outlined'
                sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' } }}
                required
            />

            {/* 직군 */}
            <TextField
                id="review-position"
                fullWidth
                label="직군"
                placeholder='지원 직무 (예: 프론트엔드)'
                value={position}
                onChange={(evt) => onChangePosition(evt.target.value)}
                variant='outlined'
                sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' } }}
                required
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
                {/* 선고 단계 (Select) */}
                <TextField
                    id="review-stage"
                    select
                    fullWidth
                    label="선고 단계"
                    value={stage}
                    onChange={(evt) => onChangeStage(evt.target.value)}
                    variant='outlined'
                    sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' } }}
                    required
                >
                    {stageOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                {/* 결과 (Select) */}
                <TextField
                    id="review-result"
                    select
                    fullWidth
                    label="결과"
                    value={result}
                    onChange={(evt) => onChangeResult(evt.target.value)}
                    variant='outlined'
                    sx={{ backgroundColor: '#ADC178', borderRadius: 3, '& fieldset': { border: 'none' } }}
                    required
                >
                    {resultOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            {/* 내용 */}
            <TextField
                id="review-content"
                fullWidth
                label="내용"
                placeholder='면접 질문이나 전형 팁을 공유해 주세요'
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