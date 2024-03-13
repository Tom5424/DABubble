import { User } from "./user";


export class DirectMessage {
    senderTime: Date | null = new Date();
    messageText: string;
    receiverId: string;
    directMessageId: string | undefined;
    userThatSendedMessage: User | null;


    constructor(userThatSendedMessage?: any, receiverId?: string | null, messageText?: string | null) {
        this.senderTime = this.senderTime ? this.senderTime : null;
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
