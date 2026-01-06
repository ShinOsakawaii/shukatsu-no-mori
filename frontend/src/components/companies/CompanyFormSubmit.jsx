// import { Box, Button } from "@mui/material";
// import { COLORS } from "../../constants/colors";

// function CompanyFormSubmit({ mode, disabled, onCancel }) {
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: 3,
//                 mt: 6,
//             }}
//         >
//             {/* 취소 버튼 - 왼쪽 */}
//             {mode === "edit" && (
//                 <Button
//                     type="button"
//                     onClick={onCancel}
//                     sx={{
//                         width: 120,
//                         height: 44,
//                         minHeight: 44,
//                         padding: 0,
//                         lineHeight: "44px",
//                         fontSize: 14,
//                         backgroundColor: COLORS.primary,
//                         color: COLORS.dark,
//                         borderRadius: 2,
//                         fontWeight: 600,
//                         "&:hover": {
//                             backgroundColor: COLORS.primary,
//                         },
//                     }}
//                 >
//                     취소
//                 </Button>
//             )}

//             {/* 수정 / 등록 버튼 */}
//             <Button
//                 type="submit"
//                 disabled={disabled}
//                 sx={{
//                     width: 120,
//                     height: 44,
//                     minHeight: 44,
//                     padding: 0,
//                     lineHeight: "44px",
//                     fontSize: 14,
//                     backgroundColor: COLORS.primary,
//                     color: COLORS.dark,
//                     borderRadius: 2,
//                     fontWeight: 600,
//                     "&:hover": {
//                         backgroundColor: COLORS.primary,
//                     },
//                 }}
//             >
//                 {mode === "edit" ? "수정" : "등록"}
//             </Button>
//         </Box>
//     );
// }

// export default CompanyFormSubmit;
import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

function AnalysisFormSubmit({ isEdit }) {

    const navigate = useNavigate();

    return (
        <>

            {/* 하단 버튼 */}
            < Stack direction="row" spacing={1.5} justifyContent="center" mt={4} >
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(-1)}
                    sx={{
                        borderColor: '#6C584C',
                        color: '#6C584C',
                        px: 5,
                    }}
                >
                    취소
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                        color: '#6C584C',
                        backgroundColor: '#ADC178',
                        px: 5,
                        '&:hover': { backgroundColor: '#96b85f' },
                    }}
                >
                    {isEdit ? '수정' : '저장'}
                </Button>
            </Stack >
        </>
    );
}
export default AnalysisFormSubmit;
