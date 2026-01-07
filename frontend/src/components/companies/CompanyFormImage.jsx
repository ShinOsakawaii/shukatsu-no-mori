import { Box, Button, Stack, Typography } from "@mui/material";
import { COLORS } from "../../constants/colors";


export default function CompanyFormImage({ handleChangeImage, uploading, imageName, imagePreview }) {

    return (
        <Box
            sx={{
                width: 240,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Box
                sx={{
                    width: 200,
                    height: 200,
                    border: `2px solid ${COLORS.brown}`,
                    backgroundColor: COLORS.light,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    color: COLORS.dark,
                }}
            >
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt="미리보기"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                ) : (
                    "이미지 없음"
                )}
            </Box>

            <Stack>
                <Button
                    component="label"
                    disabled={uploading}
                    variant="outliend"
                    sx={{
                        backgroundColor: 'background.box2',
                        "&:hover": { backgroundColor: 'background.box' },
                    }}
                >
                    이미지 업로드
                    {/* <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        onFileSelect(file);
                        e.target.value = '';
                    }}
                /> */}

                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleChangeImage}
                    />
                </Button>

                {uploading && (
                    <Typography variant='body2' sx={{ ml: 1 }}>
                        업로드 중...
                    </Typography>
                )}

                {!uploading && imageName && (
                    <Typography variant='body2' sx={{ ml: 1 }}>
                        {imageName}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}
