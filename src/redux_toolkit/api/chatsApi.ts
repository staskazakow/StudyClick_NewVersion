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
        }),
        changeNameChat:builder.mutation({
            query:(credentials) => ({
                url:`chats/${credentials.id}/update/`,
                body:{title:credentials.title},
                method:"PATCH"
            })
        }),
        DeleteChat:builder.mutation({
            query:(credentials) => ({
                url:`chat/delete?id=${credentials.id}`,
                method:"DELETE"
            })
        })
    })
})
export const {useCreateMessageMutation,useGetChatsQuery,useChangeNameChatMutation,useDeleteChatMutation} = chatApi