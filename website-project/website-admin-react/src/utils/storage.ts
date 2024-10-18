/*
 * @Author: xudan
 * @Date: 2024-08-07 12:12:51
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-18 14:53:58
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { useAuthStore } from '@/store';
class Storage {
    private storageKey: string;

    constructor(storageKey: string) {
        this.storageKey = storageKey;
    }

    getToken(): string | null {
        return localStorage.getItem(this.storageKey);
    }

    setToken(token: string): void {
        localStorage.setItem(this.storageKey, token);
    }

    updateToken(newToken: string): void {
        localStorage.setItem(this.storageKey, newToken);
    }

    deleteToken(): void {
        localStorage.removeItem(this.storageKey);
    }
}


const tokenStorage = new Storage('@website_auth-token');
const isLoggedIn = async () => {
    const auth_store = useAuthStore()

    const token = tokenStorage.getToken() || '';
    auth_store.update(token)

    return !!auth_store.user_token
}

/** 本地存储名称列表 */
export const storageName = {
  TOKEN: '@website_auth-token'
}

export default Storage;
export {
    isLoggedIn
}

/**
 * 
 * const tokenStorage = new Storage('authToken');
tokenStorage.setToken('your_token_here');
console.log(tokenStorage.getToken()); // Output: your_token_here
tokenStorage.updateToken('new_token_here');
console.log(tokenStorage.getToken()); // Output: new_token_here
tokenStorage.deleteToken();
console.log(tokenStorage.getToken()); // Output: null
 */