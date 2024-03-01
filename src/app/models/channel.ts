import { User } from "./user";


export class Channel {
    channelName: string;
    channelDescription: string | null
    initialLetter: string;
    // members: Array<User>;


    constructor(object?: Channel) {
        this.channelName = object ? object.channelName : '';
        this.channelDescription = object ? object.channelDescription : '';
        this.initialLetter = object ? object.channelName.charAt(0).toLocaleLowerCase() : '';
        // this.members = members ? members : [];
    }


    toJson() {
        return {
            channelName: this.channelName,
            channelDescription: this.channelDescription,
            initialLetter: this.initialLetter,
            // members: this.members,
        }
    }
}
