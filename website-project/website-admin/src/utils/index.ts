/*
 * @Author: xudan
 * @Date: 2024-07-23 14:50:23
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-07 15:05:02
 * @Description: utility function
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { useAuthStore } from '@/stores';

import Storage from '@/utils/storage';
const tokenStorage = new Storage('@website_auth-token');


const isLoggedIn = async () => {
    const auth_store = useAuthStore()

    const token = tokenStorage.getToken() || '';
    auth_store.update(token)

    return !!auth_store.user_token
}

export {
    isLoggedIn
}