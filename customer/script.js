// 等待DOM完全加載後執行
document.addEventListener('DOMContentLoaded', function() {
    // 獲取DOM元素
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // 模擬聊天數據 - 在實際應用中這部分會由後端提供
    let chatHistory = [
        {
            sender: 'agent',
            message: '您好，我是xxx<br>客服小幫手，很高興為您服務。',
            time: getCurrentTime()
        },
        {
            sender: 'user',
            message: '我有問題',
            time: getCurrentTime()
        }
    ];

    // 初始化聊天界面
    initChat();

    // 添加發送訊息事件監聽器
    sendButton.addEventListener('click', sendMessage);
    
    // 添加按Enter鍵發送訊息
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    /**
     * 初始化聊天界面
     * 清空聊天區域並重新載入歷史訊息
     */
    function initChat() {
        // 清空聊天區域
        chatMessages.innerHTML = '';
        
        // 載入歷史訊息
        chatHistory.forEach(msg => {
            appendMessage(msg.sender, msg.message, msg.time);
        });
        
        // 滾動到最新訊息
        scrollToBottom();
    }

    /**
     * 發送訊息函數
     * 獲取輸入框中的訊息，添加到聊天記錄，並清空輸入框
     */
    function sendMessage() {
        const message = messageInput.value.trim();
        
        // 檢查訊息是否為空
        if (message === '') return;
        
        // 獲取當前時間
        const time = getCurrentTime();
        
        // 將用戶訊息添加到聊天區域
        appendMessage('user', message, time);
        
        // 添加到聊天記錄
        chatHistory.push({
            sender: 'user',
            message: message,
            time: time
        });
        
        // 清空輸入框
        messageInput.value = '';
        
        // 滾動到最新訊息
        scrollToBottom();
        
        // 模擬客服回覆
        simulateAgentResponse(message);
    }

    /**
     * 模擬客服回覆
     * 在實際應用中，這部分會由真實的客服或AI服務提供
     * @param {string} userMessage - 用戶發送的訊息
     */
    function simulateAgentResponse(userMessage) {
        // 模擬網絡延遲
        setTimeout(() => {
            // 簡單的自動回覆邏輯
            let response;
            
            if (userMessage.includes('你好') || userMessage.includes('嗨')) {
                response = '您好！有什麼可以幫您的嗎？';
            } else if (userMessage.includes('謝謝') || userMessage.includes('感謝')) {
                response = '不客氣，很高興能幫到您！';
            } else if (userMessage.includes('問題') || userMessage.includes('幫忙')) {
                response = '請詳細描述您遇到的問題，我會盡力協助您解決。';
            } else {
                response = '我已收到您的訊息，正在為您處理。如有其他問題，請隨時告訴我。';
            }
            
            // 獲取當前時間
            const time = getCurrentTime();
            
            // 添加客服回覆到聊天區域
            appendMessage('agent', response, time);
            
            // 添加到聊天記錄
            chatHistory.push({
                sender: 'agent',
                message: response,
                time: time
            });
            
            // 滾動到最新訊息
            scrollToBottom();
        }, 1000); // 1秒延遲模擬真實聊天
    }

    /**
     * 將訊息添加到聊天區域
     * @param {string} sender - 發送者類型（'user' 或 'agent'）
     * @param {string} message - 訊息內容
     * @param {string} time - 訊息時間
     */
    function appendMessage(sender, message, time) {
        // 創建訊息容器
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        // 設置訊息HTML結構
        let avatarHTML, bubbleHTML, timeHTML;
        
        if (sender === 'agent') {
            avatarHTML = `<div class="agent-avatar"><img src="images/ServiceAvatar.png" alt="客服頭像" class="avatar-img"></div>`;
            bubbleHTML = `<div class="message-bubble">${message}</div>`;
            timeHTML = `<div class="message-time">${time}</div>`;
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    ${avatarHTML}
                    ${bubbleHTML}
                    ${timeHTML}
                </div>
            `;
        } else {
            bubbleHTML = `<div class="message-bubble">${message}</div>`;
            timeHTML = `<div class="message-time">${time}</div>`;
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    ${timeHTML}
                    ${bubbleHTML}
                </div>
            `;
        }
        
        // 添加到聊天區域
        chatMessages.appendChild(messageDiv);
    }

    /**
     * 滾動聊天區域到底部，顯示最新訊息
     */
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * 獲取當前時間，格式為 HH:MM:SS
     * @returns {string} 格式化的時間字符串
     */
    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
});
