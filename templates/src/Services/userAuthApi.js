// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
    registerUser:builder.mutation({
        query:(user)=>{
            return {
                url:'register/',
                method:'POST',
                body:user,
                headers:{
                    'Content-type':'application/json',
                }
            }
          }
        }),
        loginUser:builder.mutation({
          query:(user)=>{
              return {
                  url:'login/',
                  method:'POST',
                  body:user,
                  headers:{
                      'Content-type':'application/json',
                  }
              }
          }
    }),
    getLoginUser:builder.query({
      query:(access_token)=>{
          return {
              url:'user/',
              method:'GET',
              headers:{
                  'authorization':`Bearer ${access_token}`,
              }
          }
      }
}),
forgotUser:builder.mutation({
    query:({actualData,access_token})=>{
        return {
            url:'changePassword/',
            method:'POST',
            body:actualData,
            headers:{
                'authorization':`Bearer ${access_token}`,
            }
        }
    }
}),
sendResetMail:builder.mutation({
    query:(actualData)=>{
        return {
            url:'send-reset-password-link/',
            method:'POST',
            body:actualData,
            headers:{
                'Content-type':'application/json',
            }
        }
    }
}),
resetUserPassword:builder.mutation({
    query:({actualData,id,token})=>{
        return {
            url:`reset-password/${id}/${token}`,
            method:'POST',
            body:actualData,
            headers:{
                'Content-type':'application/json',
            }
        }
    }
}),
contactUser:builder.mutation({
    query:(user)=>{
        return {
            url:'contact/',
            method:'POST',
            body:user,
            headers:{
                'Content-type':'application/json',
            }
        }
      }
    }),
    emailverifyOtp:builder.mutation({
                   query:(actualData)=>{
                                return {
                                    url:'otp/',
                                    method:'POST',
                                    body:actualData,
                                    headers:{
                                        'Content-type':'application/json',
                                    }
                                }
                              }
                            }),
  }),
})
export const { useRegisterUserMutation, useLoginUserMutation, useGetLoginUserQuery, useForgotUserMutation, useSendResetMailMutation,useResetUserPasswordMutation, useContactUserMutation, useEmailverifyOtpMutation } = userAuthApi
