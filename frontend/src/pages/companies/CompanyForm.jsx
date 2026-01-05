import React from 'react';
import { createCompany, updateCompany, fetchCompany } from '../../api/companyApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';

//기업정보 등록, 수정
function CompanyForm(props) {

    const { companyId: companyIdParam } = useParams();
    const companyId = Number(companyIdParam);
    const isEdit = !!companyId;

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    //Api 관련 TanStaks Query=============
    //1. 기업 정보 등록
    const createMutation = useMutation({
        mutationFn: createCompany,
        onSuccess: (payload) => {
            queryClient.invalidateQueries({ queryKey: ['companies']});
            navigate(`/companies/${payload.companyId}`);
        },
        onError: () => {
            alert('기업 정보 등록에 실패했습니다.')
        }
    });

    //2. 수정모드일 때 기존 데이터 조회
    const { data: company, isLoading, isError, error } = useQuery({
        queryKey: ['company', companyId],
        queryFn: () => fetchCompany(companyId),
        enabled: isEdit
    })
    //3. 기업 정보 수정
    const updateMutation = useMutation({
        mutationFn: (payload) => updateCompany(companyId, payload),
        onSuccess: (update) => {
            //목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            queryClient.invalidateQueries({ queryKey: ['company', companyId] }); 
            
            //이동
            navigate(`/companies/${update.companyId}`);

        },
        onError: () => {
            alert('기업 정보 수정에 실패했습니다.');
        }
    });

    // 이미지 업로드 (React Query 세팅만)
    const uploadMutation = useMutation({
        mutationFn: uploadImage,
        onSuccess: () => {
            
        },
        onError: () => {
            alert('이미지 업로드에 실패했습니다.');
        }
    });

    return (
        <div>

        </div>
    );
}

export default CompanyForm;