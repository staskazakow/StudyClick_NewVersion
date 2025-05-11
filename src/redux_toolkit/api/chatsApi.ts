import { authApi } from "./authApi";

export const chatApi = authApi.injectEndpoints({
    endpoints: builder => ({
        createMessage: builder.mutation({
            query:(credentials) => ({
                url:'chat/',
                body:credentials,
                method:"POST"
            })
        }),
        getChats: builder.query({
            query: () => "chats"
        })
    })
})
export const {useCreateMessageMutation,useGetChatsQuery} = chatApi