import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'; // fetchBaseQuery может быть неявно доступен

import Cookies from 'js-cookie';

// Базовый URL вашего API
const baseUrl = 'https://vfmlbq9k-8000.uks1.devtunnels.ms/api/';

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`); // Предполагаем Bearer токен
        }
        return headers;
    },
    credentials: 'include',
});

// Эта версия baseQueryWithReauth содержит логику, которая может привести к зацикливанию
// при попытке рефреша, если запрос на рефреш сам получит 401.
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // Это условие СРАБОТАЕТ даже для запроса на /auth/jwt/refresh/
    if (result?.error?.status === 401) {
        console.log('Sending refresh token');
        const refresh_token = Cookies.get("refresh");

        if (refresh_token) {
            try {
                // Инициируем запрос на обновление токена. Этот вызов
                // снова пройдет через baseQueryWithReauth, потенциально вызывая зацикливание.
                const refreshResult = await api.dispatch(
                    authApi.endpoints.refreshToken.initiate(undefined) // Передача токена здесь не указана в оригинале, но нужна в query
                );

                if (refreshResult?.data?.access) {
                    console.log('New accessToken');
                    // Обновление токена успешно, сохраняем новый access токен
                    localStorage.setItem('accessToken', refreshResult.data.access);
                    // Повторяем исходный запрос с новым access токеном
                    result = await baseQuery(args, api, extraOptions);
                } else {
                     // Обновление токена не удалось
                     console.log('Refresh failed, redirecting');
                     localStorage.removeItem('accessToken');
                     Cookies.remove("refresh"); // Удаляем refresh куку
                     window.location.href = '/login'; // Перенаправление
                }
            } catch (refreshError) {
                console.error('Ошибка при обновлении токена (в baseQueryWithReauth):', refreshError);
                 // Ошибка при выполнении самого запроса на обновление токена
                 localStorage.removeItem('accessToken');
                 Cookies.remove("refresh");
                 window.location.href = '/login'; // Перенаправление
            }
        } else {
             console.log('No refresh token found, redirecting to login');
             // Нет refresh токена
             localStorage.removeItem('accessToken');
            //  window.location.href = '/login'; // Перенаправление
        }
    }

    return result;
};


// Определяем интерфейс для ответа на логин/рефреш
interface AuthResponse {
    access: string;
    refresh?: string; // refresh токен может приходить при логине
}
interface DeleteInterface{
    current_password:[string]
}
export interface PassInterface {
        id:number;
        name:string;
        price:string;
        duration:number;
        tokens_per_month:number;
}
export interface User {
    id: number;
    username: string;
    email: string;
    available_tokens:number;
    subscription:null | PassInterface
}

interface Credentials {
    email?: string;
    username: string;
    password: string;
}

interface LoginCredentials {
    username: string;
    password: string;
}


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth, // Базовый запрос для всего API
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, Credentials>({
            query: (credentials) => ({
                url: '/auth/users/',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('accessToken', data.access);
                    if (data?.refresh) {
                        Cookies.set("refresh", data.refresh, { expires: 30 }); // Опции secure/sameSite отсутствуют
                    }
                    // Диспатч setAuth не вызывается здесь в предыдущем коде
                } catch (error) {
                    console.error('Ошибка при входе в систему (onQueryStarted):', error);
                    // Очистка токенов при ошибке в onQueryStarted отсутствует в предыдущем коде
                }
           },
        }),
        // Этот эндпоинт использовался для логина
        login: builder.mutation<AuthResponse, LoginCredentials>({
            query: (credentials) => ({
                url: '/auth/jwt/create/',
                method: 'POST',
                body: credentials,
            }),
             async onQueryStarted(args, { dispatch, queryFulfilled }) {
                 try {
                     const { data } = await queryFulfilled;
                     localStorage.setItem('accessToken', data.access);
                     if (data?.refresh) {
                         Cookies.set("refresh", data.refresh, { expires: 30 }); // Опции secure/sameSite отсутствуют
                     }
                     // Диспатч setAuth не вызывается здесь в предыдущем коде
                 } catch (error) {
                     console.error('Ошибка при входе в систему (onQueryStarted):', error);
                     // Очистка токенов при ошибке в onQueryStarted отсутствует в предыдущем коде
                 }
            },
        }),
        // Эндпоинт для обновления токена
        refreshToken: builder.mutation<AuthResponse, string | undefined>({ // Тип аргумента был undefined, хотя нужен refresh token
            query: (refresh_token) => ({
                 url: '/auth/jwt/refresh', // Отсутствует конечный слэш
                 method: 'POST',
                 body: { refresh: refresh_token }, // Отправляем refresh токен в теле
            }),
            // **** ЭТА СТРОКА ВЫЗЫВАЕТ ОШИБКУ СИНТАКСИСА ****
            // baseQuery: baseQuery, // Это была ошибка синтаксиса
            // **** КОНЕЦ ОШИБКИ СИНТАКСИСА ****

             async onQueryStarted(args, { dispatch, queryFulfilled }) {
                 try {
                     const { data } = await queryFulfilled;
                     if (data?.access) {
                          localStorage.setItem('accessToken', data.access);
                          // Обновление refresh токена в cookie при рефреше отсутствует в предыдущем коде
                     } else {
                         console.error("Refresh token response did not contain access token.");
                         // Обработка отсутствия access токена в onQueryStarted рефреша отсутствует
                     }
                 } catch (error) {
                     console.error('Ошибка в onQueryStarted при обновлении токена:', error);
                      // Обработка ошибок в onQueryStarted рефреша отсутствует
                 }
             },
        }),
        getUser: builder.query<User, void>({
            query: () => '/auth/users/me/', 
        }),
        getJWT: builder.mutation({
            query: (credentials) => ({
                url: '/auth/jwt/create/',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('accessToken', data.access);
                    if (data?.refresh) {
                        Cookies.set("refresh", data.refresh, { expires: 30 }); // Опции secure/sameSite отсутствуют
                    }
                    // Диспатч setAuth не вызывается здесь в предыдущем коде
                } catch (error) {
                    console.error('Ошибка при входе в систему (onQueryStarted):', error);
                    // Очистка токенов при ошибке в onQueryStarted отсутствует в предыдущем коде
                }
           },
        }),
        deleteAccount:builder.mutation({
            query:(password:DeleteInterface) => ({
                url:"auth/users/me/",
                method:"DELETE",
                body:password
            })
        }),
        logOut: builder.mutation<void, void>({
            query: () => ({
                url: "auth/token/token/logout", // Отсутствует конечный слэш
                method: "POST",
            }),
             async onQueryStarted(args, { dispatch, queryFulfilled }) {
                 try {
                     await queryFulfilled;
                     console.log("Logout successful, clearing tokens.");
                     Cookies.remove("refresh")
                     localStorage.removeItem("accessToken")
                     window.location.href = '/';
                      // Очистка токенов при успешном выходе отсутствует в onQueryStarted предыдущего кода
                      // Перенаправление при успешном выходе отсутствует в onQueryStarted предыдущего кода
                 } catch (error) {
                     console.error('Ошибка при выходе из системы (onQueryStarted):', error);
                      // Очистка токенов при ошибке выхода отсутствует в onQueryStarted предыдущего кода
                      // Перенаправление при ошибке выхода отсутствует в onQueryStarted предыдущего кода
                 }
             },
        })

    }),
});

export const {
    useRegisterMutation,
    useLoginMutation, // Использовался useGetJWTMutation в предыдущем коде?
    useGetUserQuery,
    useRefreshTokenMutation,
    useLogOutMutation,
    useGetJWTMutation,
    useDeleteAccountMutation,
} = authApi;


