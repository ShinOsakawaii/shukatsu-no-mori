import { Stack, Button, Typography } from '@mui/material';

function CompanyPagination({ page, totalPages, onPrev, onNext }) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
            <Stack direction="row" alignItems='center' spacing={1.6}>
                <Button variant='contained' size='small' sx={{ bgcolor: 'background.button' }}
                    disabled={page === 0}
                    onClick={onPrev}
                >이전</Button>
                <Typography variant='body2'>
                    {page + 1} / {totalPages}
                </Typography>
                <Button variant='contained' size='small' sx={{ bgcolor: 'background.button' }}
                    disabled={page + 1 >= totalPages}
                    onClick={onNext}
                >다음</Button>
            </Stack>
        </Stack>
    );
}

export default CompanyPagination;