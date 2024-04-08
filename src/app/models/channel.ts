import { User } from "./user";


export class Channel {
    channelName: string;
    channelDescription: string | null
    initialLetter: string;
    userWhoCreatedChannel: string;
    channelMembers: User[];


    constructor(object?: Channel, channelMembers?: User[], userWhoCreatedChannel?: string | null) {
        this.channelName = object ? object.channelName : '';
        this.channelDescription = object ? object.channelDescription : '';
        this.initialLetter = object ? object.channelName.charAt(0).toLocaleLowerCase() : '';
        this.userWhoCreatedChannel = userWhoCreatedChannel ? userWhoCreatedChannel : ''
        this.channelMembers = channelMembers ? channelMembers : [];
    }


    toJson() {
        return {
            channelName: this.channelName,
            channelDescription: this.channelDescription,
            initialLetter: this.initialLetter,
            channelMembers: this.channelMembers,
            userWhoCreatedChannel: this.userWhoCreatedChannel,
        }
    }
}
