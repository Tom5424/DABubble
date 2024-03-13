import { User } from "./user";


export class DirectMessage {
    senderTime: Date | null = new Date();
    messageText: string;
    userThatSendedMessage: User | null;


    constructor(userThatSendedMessage?: any, messageText?: string | null) {
        this.senderTime = this.senderTime ? this.senderTime : null;
        this.messageText = messageText ? messageText : '';
        this.userThatSendedMessage = userThatSendedMessage ? userThatSendedMessage : null;
    }


    toJson() {
        return {
            senderTime: this.senderTime,
            messageText: this.messageText,
            userThatSendedMessage: this.userThatSendedMessage,
        }
    }
}
