/*
 * @Author: xudan
 * @Date: 2024-07-23 14:50:23
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-23 15:30:59
 * @Description: utility function
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { useAuthStore } from '@/stores'

const isLoggedIn = async () => {

    const auth_store = useAuthStore()
    
    // auth_store.user_token++
    // console.log(auth_store.user_token)
    
    // // 自动补全！ ✨
    // let token: number = 6
    // auth_store.$patch({ user_token: token + 1 })
    // console.log(auth_store.user_token)
    
    // // 或使用 action 代替
    // auth_store.update(9)
    // console.log(auth_store.user_token)
    
    console.log(auth_store.user_token)
    return auth_store.user_token > 10

}

export {
    isLoggedIn
}