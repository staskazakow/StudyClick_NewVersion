import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Импортируйте из react

const baseUrl = 'http://87.228.83.230:8000/api/'
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
export const fieldsApi = createApi({
    reducerPath: "fieldsApi", // Убедитесь, что путь уникален
    baseQuery,
    endpoints: (builder) => ({
        getFields: builder.query<any, void>({ // Уточните типы, если возможно
            query: () => "fields/",
        }),
        CreateMessageNoLogin:builder.mutation({
            query: (message) => ({
                url:"chat/",
                body:message,
                method:"POST",
            })
        })
    }),
});

// Экспортируем хук для использования в компонентах
export const { useGetFieldsQuery,useCreateMessageNoLoginMutation } = fieldsApi;
