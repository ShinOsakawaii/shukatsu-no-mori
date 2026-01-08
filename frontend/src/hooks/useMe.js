import { useQuery } from "@tanstack/react-query";
import { fetchMe, getToken, ME_QUERY_KEY } from "../api/authApi";

// useMe.js
export function useMe() {
    const token = getToken();

    return useQuery({
        queryKey: ME_QUERY_KEY,
        queryFn: fetchMe,
        enabled: !!token,
        retry: false,
        staleTime: 1000 * 60,
        onError: (error) => {
            //토큰 만료시
            if (error?.response?.status === 401) {
                localStorage.removeItem("accessToken");
            }
        }
    });
}
