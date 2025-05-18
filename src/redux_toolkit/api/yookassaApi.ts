import { createApi } from "@reduxjs/toolkit/query/react"; // Убедитесь, что импорт из '@reduxjs/toolkit/query/react' если используете React хуки
import { baseQueryWithReauth } from "./authApi"; // Предполагаем, что этот файл и экспорт существуют и корректны

export const yoKassaApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "kassaApi",
  endpoints: builder => ({
    createPayment: builder.mutation({
      query: (paymentDetails) => ({
        url: '/create', // Убедитесь, что этот URL соответствует вашему API бэкенда
        method: 'POST',
        body: paymentDetails,
      }),
    }),
    getPlans: builder.query({
      query: () => "plans/", // Убедитесь, что этот URL соответствует вашему API бэкенда
    })
  })
})

// Правильный экспорт хуков:
export const { useCreatePaymentMutation, useGetPlansQuery } = yoKassaApi;