import { Box, TextField } from "@mui/material";
import { COLORS } from "../../constants/colors";

export default function CompanyFormFields({ info, onChangeInfo }) {
    const { name, industry, city, website, description } = info;

    const commonProps = {
        fullWidth: true,
        InputProps: {
            sx: {
                backgroundColor: COLORS.brown,
                borderRadius: 3,
                color: COLORS.bg,
                px: 1,
            },
        },
        inputProps: {
            style: { color: COLORS.bg },
        },
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
            }}
        >
            <TextField
                name="name"
                placeholder="기업명"
                value={name}
                onChange={(evt) => onChangeInfo(prev => ({ ...prev, name: evt.target.value }))
                }
                {...commonProps}
            />

            <TextField
                name="industry"
                placeholder="업계"
                value={industry}
                onChange={(evt) => onChangeInfo(prev => ({ ...prev, industry: evt.target.value }))
                }
                {...commonProps}
            />

            <TextField
                name="city"
                placeholder="기업 위치"
                value={city}
                onChange={(evt) => onChangeInfo(prev => ({ ...prev, city: evt.target.value }))
                }
                {...commonProps}
            />

            <TextField
                name="website"
                placeholder="홈페이지 주소"
                value={website}
                onChange={(evt) => onChangeInfo(prev => ({ ...prev, website: evt.target.value }))
                }
                {...commonProps}
            />

            <TextField
                name="description"
                placeholder="회사 설명"
                value={description}
                onChange={(evt) => onChangeInfo(prev => ({ ...prev, description: evt.target.value }))
                }
                multiline
                rows={5}
                {...commonProps}
            />
        </Box>
    );
}