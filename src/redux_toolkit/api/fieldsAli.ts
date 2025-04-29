import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Импортируйте из react

export const fieldsApi = createApi({
    reducerPath: "fieldsApi", // Убедитесь, что путь уникален
    baseQuery: fetchBaseQuery({ baseUrl: 'https://vfmlbq9k-8000.uks1.devtunnels.ms/api/' }),
    endpoints: (builder) => ({
        getFields: builder.query<any, void>({ // Уточните типы, если возможно
            query: () => "fields/",
        }),
    }),
});

// Экспортируем хук для использования в компонентах
export const { useGetFieldsQuery } = fieldsApi;
