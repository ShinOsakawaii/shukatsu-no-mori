import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { createCompany, updateCompany, fetchCompany } from '../../api/companyApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';

import CompanyFormFields from '../../components/companies/CompanyFormFields';
import CompanyFormImage from '../../components/companies/CompanyFormImage';
import CompanyFormSubmit from '../../components/companies/CompanyFormSubmit';
import { COLORS } from '../../constants/colors';

//홈 화면에서 새 글 작성하는 입력 폼, 페이지
//기업정보 등록, 수정
function CompanyForm({ mode }) {

    const isEdit = mode === 'edit';
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        name: '',
        industry: '',
        city: '',
        website: '',
        description: '',
        companyImage: '',
    });

    const { companyId: companyIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const [companyImage, setCompanyImage] = useState("");
    const [imageName, setImageName] = useState("");

    // TanStack Query============
    // 기업 정보 등록
    const createMutation = useMutation({
        mutationFn: (payload) => createCompany(payload),
        onSuccess: (payload) => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            navigate(`/companies/${payload.companyId}`);
        },
        onError: () => {
            alert('기업 정보 등록에 실패했습니다.');
        },
    });

    //기존 기업정보 조회
    const { data: company, isLoading, isError, error } = useQuery({
        queryKey: ['company', companyId],
        queryFn: () => fetchCompany(companyId),
        enabled: isEdit
    });


    //3. 기업 정보 수정
    const updateMutation = useMutation({
        mutationFn: (payload) => updateCompany(companyId, payload),
        onSuccess: (update) => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            queryClient.invalidateQueries({ queryKey: ['company', companyId] });
            navigate(`/companies/${update.companyId}`);
        },
        onError: () => {
            alert('기업 정보 수정에 실패했습니다.');
        },
    });

    // 이미지  Mutation
    const updateImageMutation = useMutation({
        mutationFn: (file) => uploadImage(file),
        onSuccess: (result) => {
            setImageFile(result.imagefile)
        },
        onError: () => {
            alert('기업 이미지 수정에 실패했습니다.');
        }
    });

    if (isEdit && isLoading) return <Loader />
    if (isEdit && isError) return <ErrorMessage error={error} />

    // 이벤트 핸들러 =====
    // 이미지 업로드
    const handleChangeImage = async (evt) => {
        const file = evt.target.files?.[0];
        if (!file) return;

        setImageName(file.name);

        if (file.size > 5 * 1024 * 1024) {
            alert('이미지는 5MB 이하만 가능합니다.')
            return;
        }

        updateImageMutation.mutate(file);
    }

    // 폼 전송
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const payload = {
            name: name.trim(),
            industry: industry.trim(),
            city: city.trim(),
            website: website.trim(),
            description: description.trim(),
            companyImage: companyImage || null
        }

        // 검증
        if (!city.trim() || !name.trim() || !industry.trim()) {
            alert('위치, 회사명, 업계는 필수입니다.');
            return;
        }

        // 이미지 업로드 중이면 저장 막기
        if (updateImageMutation.isPending) {
            alert('이미지 업로드 중입니다.');
            return;
        }

        // mode에 따라 수정or등록 호출
        if (isEdit) {
            updateMutation.mutate(info);
        } else {
            createMutation.mutate(info);
        }
    }

    // registerMutation.mutate({
    //     email: form.email.trim(),
    //     password: form.password.trim(),
    //     nickname: form.nickname.trim()
    // });


    return (
        <Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                <Typography variant="h4" sx={{ color: COLORS.dark }}>
                    {isEdit ? '기업 정보 수정' : '기업 정보 등록'}
                </Typography>
            </Box>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    minHeight: '100vh',
                    backgroundColor: COLORS.bg,
                    px: 8,
                    py: 6,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                    <Box sx={{ width: 520 }}>
                        {/* 입력 필드 */}
                        <CompanyFormFields
                            info={info}
                            onChangeInfo={setInfo} />

                        {/* 이미지 */}
                        <CompanyFormImage
                            handleChangeImage={handleChangeImage}
                            Uploading={updateImageMutation.isPending}
                            imageName={imageName} />

                        {/* 등록 / 수정 버튼 */}
                        <CompanyFormSubmit isEdit={isEdit} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CompanyForm;