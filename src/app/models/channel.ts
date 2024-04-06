import { User } from "./user";


export class Channel {
    channelName: string;
    channelDescription: string | null
    initialLetter: string;
    channelMembers: User[];


    constructor(object?: Channel, channelMembers?: User[]) {
        this.channelName = object ? object.channelName : '';
        this.channelDescription = object ? object.channelDescription : '';
        this.initialLetter = object ? object.channelName.charAt(0).toLocaleLowerCase() : '';
        this.channelMembers = channelMembers ? channelMembers : [];
    }


    toJson() {
        return {
            channelName: this.channelName,
            channelDescription: this.channelDescription,
            initialLetter: this.initialLetter,
            channelMembers: this.channelMembers,
        }
    }
}
