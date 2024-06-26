import { User } from "./user";


export class DirectMessage {
    senderTime: number = Date.now();
    messageText: string;
    attachedFiles!: string[];
    receiverId: string;
    senderId: string;
    userThatSendedMessage: User | null;
    addedEmojis: { emojiUrl: string, emojiAmount: number, usersIdWhoHaveUsedTheEmoji: string[], usersNameWhoHaveUsedTheEmoji: string[] }[] = [];


    constructor(userThatSendedMessage?: any, receiverId?: string | null, senderId?: string, messageText?: string | null, uploadedImages?: string[]) {
        this.senderTime = this.senderTime ? this.senderTime : 0;
        this.messageText = messageText ? messageText : '';
        this.attachedFiles = uploadedImages ? uploadedImages : []
        this.receiverId = receiverId ? receiverId : '';
        this.senderId = senderId ? senderId : '';
        this.userThatSendedMessage = userThatSendedMessage ? userThatSendedMessage : null;
    }


    toJson() {
        return {
            senderTime: this.senderTime,
            messageText: this.messageText,
            attachedFiles: this.attachedFiles,
            userThatSendedMessage: this.userThatSendedMessage,
            receiverId: this.receiverId,
            senderId: this.senderId,
        }
    }
}
