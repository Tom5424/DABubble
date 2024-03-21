import { User } from "./user";


export class DirectMessage {
    senderTime: number = Date.now();
    messageText: string;
    receiverId: string;
    directMessageId: string | undefined;
    userThatSendedMessage: User | null;
    addedEmojis: { emojiUrl: string, emojiAmount: number, usersWhoHaveUsedTheEmoji: string[] }[] = [];


    constructor(userThatSendedMessage: any, receiverId?: string | null, messageText?: string | null) {
        this.senderTime = this.senderTime ? this.senderTime : 0;
        this.messageText = messageText ? messageText : '';
        this.receiverId = receiverId ? receiverId : '';
        this.userThatSendedMessage = userThatSendedMessage ? userThatSendedMessage : null;
    }


    toJson() {
        return {
            senderTime: this.senderTime,
            messageText: this.messageText,
            userThatSendedMessage: this.userThatSendedMessage,
            receiverId: this.receiverId,
        }
    }
}
