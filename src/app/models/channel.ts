export class Channel {
    channelName: string;
    channelDescription: string | null
    initialLetter: string;


    constructor(object?: Channel) {
        this.channelName = object ? object.channelName : '';
        this.channelDescription = object ? object.channelDescription : '';
        this.initialLetter = object ? object.channelName.charAt(0).toLocaleLowerCase() : '';
    }


    toJson() {
        return {
            channelName: this.channelName,
            channelDescription: this.channelDescription,
            initialLetter: this.initialLetter,
        }
    }
}
