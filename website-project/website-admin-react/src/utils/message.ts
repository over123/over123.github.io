/*
 * @Author: xudan
 * @Date: 2024-08-06 16:15:20
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-08 18:27:33
 * @Description:
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { ElMessage, ElMessageBox } from 'element-plus'
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

    static confirm(message: string, title: string = '提示') {
        return ElMessageBox.confirm(message, title)
    }
    static alert(message: string, title: string = '提示') {
        return ElMessageBox.alert(message, title)
    }
    static prompt(message: string, title: string = '提示') {
        return ElMessageBox.prompt(message, title)
    }
    
}

export const $message = Message;