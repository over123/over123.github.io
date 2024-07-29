/*
 * @Author: xudan
 * @Date: 2024-07-23 14:17:01
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-29 17:47:51
 * @Description: data manage
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth_store', () => {
    const user_token = ref(0);
    
    function update(token: number) {
        user_token.value = token
    }
    
    return { user_token, update }
})