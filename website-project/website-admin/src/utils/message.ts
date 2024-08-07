/*
 * @Author: xudan
 * @Date: 2024-08-06 16:15:20
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-06 16:27:14
 * @Description:
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { ElMessage } from 'element-plus'
class Message {
    static success(message: string) {
        ElMessage({ message, type: 'success' })
    }
    static error(message: string) {
        ElMessage({ message, type: 'error' })
    }
    static warning(message: string) {
        ElMessage({ message, type: 'warning' })
    }
    static info(message: string) {
        ElMessage({ message, type: 'info' })
    }
    static closeAll() {
        ElMessage.closeAll()
    }
}

export const $message = Message;