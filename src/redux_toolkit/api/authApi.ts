import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { RequestInit, BodyInit } from 'node-fetch'; // Correct import

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://vfmlbq9k-8000.uks1.devtunnels.ms/api/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
    fetchFn: async (url: RequestInfo, options) => {
        const response = await fetch(url, { ...options, credentials: 'include' });
        return response;
    },
    
    
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        try {
            const refreshResult = await api.dispatch(
                authApi.endpoints.refreshToken.initiate(Cookies.get("refresh"))
            );

            if (refreshResult?.data?.access) {
                localStorage.setItem('accessToken', refreshResult.data.access);
                result = await baseQuery(args, api, extraOptions);
            } else {
                localStorage.removeItem('accessToken');
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        } catch (refreshError) {
            console.error('Ошибка при обновлении токена:', refreshError);
            localStorage.removeItem('accessToken');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
    }

    return result;
};

interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthResponse {
    access: string;

}

interface Credentials {
    email:string;
    username: string;
    password: string;
}
interface Login{
    username:string;
    password: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, Credentials>({
            query: (credentials) => ({
                url: '/auth/users/',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation<AuthResponse, Login>({
            query: (credentials) => ({
                url: '/auth/jwt/create/',
                method: 'POST',
                body: credentials,
            }),
           
        }),
        refreshToken: builder.mutation<AuthResponse,string | undefined>({
            query: (refresh) => ({
                url: '/auth/jwt/refresh',
                method: 'POST',
                body:{refresh}
            }),
        }),
        getUser: builder.query<User, void>({
            query: () => '/user',
        }),
        getJWT: builder.mutation({
            query:(body) => ({
                url:"auth/jwt/create/",
                body,
                method:"POST"
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    
                    localStorage.setItem('accessToken', data.access);
                    Cookies.set("refresh",data.refresh,{expires:30})
                    
                } catch (error) {
                    console.error('Ошибка при входе в систему:', error);
                }
            },
        }),
        logOut: builder.mutation({
            query:() => ({
                url:"auth/token/token/logout",
                method:"POST"
            })
        })
       

    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    useRefreshTokenMutation,
    useGetJWTMutation,
    useLogOutMutation,
} = authApi;
