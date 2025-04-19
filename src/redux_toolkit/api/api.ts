import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
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
                authApi.endpoints.refreshToken.initiate()
            );

            if (refreshResult?.data?.accessToken) {
                localStorage.setItem('accessToken', refreshResult.data.accessToken);
                result = await baseQuery(args, api, extraOptions);
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        } catch (refreshError) {
            console.error('Ошибка при обновлении токена:', refreshError);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
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
    accessToken: string;
    refreshToken: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, any>({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation<AuthResponse, any>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                } catch (error) {
                    console.error('Ошибка при входе в систему:', error);
                }
            },
        }),
        refreshToken: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: '/refresh',
                method: 'POST',
                body: { refreshToken: localStorage.getItem('refreshToken') },
            }),
        }),
        getUser: builder.query<User, void>({
            query: () => '/user',
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    useRefreshTokenMutation,
} = authApi;
