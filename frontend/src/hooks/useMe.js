import { useQuery } from "@tanstack/react-query";
import { fetchMe, getToken, ME_QUERY_KEY } from "../api/authApi";

export function useMe() {
    const token = getToken();

    const query = useQuery({
        queryKey: ME_QUERY_KEY,
        queryFn: fetchMe,
        enabled: !!token,
        retry: false,
        staleTime: 1000 * 60,
    });

    // query.data 안에 서버에서 가져온 { nickname: "...", email: "..." } 등이 들어있습니다.
    return {
        me: query.data,
        isLoading: query.isLoading,
        isError: query.isError
    };
}