import { Avatar, Box, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";

function MyPageEditImage({ imageUrl, onChangeImage }) {
  const DEFAULT_IMAGE = "/default-profile.png"; // 기본 이미지 경로
  const [preview, setPreview] = useState(imageUrl || DEFAULT_IMAGE);

  useEffect(() => {
    setPreview(imageUrl || DEFAULT_IMAGE);
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChangeImage(file);
  };

  const handleImageRemove = () => {
    setPreview(DEFAULT_IMAGE);
    onChangeImage(null); // 상위 컴포넌트에도 null 전달
  };

  return (
    <Box textAlign="center">
      <Avatar
        src={preview}
        sx={{ width: 100, height: 100, margin: "0 auto" }}
      />

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
        <Button component="label" variant="contained" size="small">
          이미지 업로드
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleImageRemove}
        >
          이미지 삭제
        </Button>
      </Stack>
    </Box>
  );
}

export default MyPageEditImage;
