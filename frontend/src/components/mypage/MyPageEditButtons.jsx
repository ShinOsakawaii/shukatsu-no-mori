import { Stack, Button } from "@mui/material";

function MyPageEditButtons({ onSave, onCancel }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        onClick={onCancel}
      >
        취소
      </Button>

      <Button
        variant="contained"
        onClick={onSave}
      >
        저장
      </Button>
    </Stack>
  );
}

export default MyPageEditButtons;
