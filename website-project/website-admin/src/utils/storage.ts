/*
 * @Author: xudan
 * @Date: 2024-08-07 12:12:51
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-07 12:16:16
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
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

export default Storage;

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