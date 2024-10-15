/*
 * @Author: xudan
 * @Date: 2024-10-12 15:05:54
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-12 16:19:35
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const WebSocket = require('ws');
class WebSocketService {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Set();

        this.wss.on('connection', (ws) => {
            console.log('New client connected');
            this.clients.add(ws);

            ws.on('message', (message) => {
                console.log(`Received: ${message}`);
                this.broadcast(message);
            });

            ws.on('close', () => {
                console.log('Client disconnected');
                this.clients.delete(ws);
            });
        });
    }
    broadcast(message) {
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`From Client Message: ${message}`);
            }
        });
    }
}

module.exports = WebSocketService;