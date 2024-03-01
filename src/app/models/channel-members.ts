import { User } from "./user";


export class ChannelMembers {
    name: string | null;
    email: string | null;
    imgUrl: string | null;
    initialLetter: string | undefined;
    userId: string;
    isOnline: boolean | undefined;


    constructor(object?: User, userId?: string) {
        this.name = object ? object.name : '';
        this.email = object ? object.email : '';
        this.imgUrl = object ? object.imgUrl : '';
        this.initialLetter = object ? object.name?.charAt(0).toLocaleLowerCase() : '';
        this.userId = userId ? userId : '';
    }


    toJson() {
        return {
            name: this.name,
            email: this.email,
            imgUrl: this.imgUrl,
            initialLetter: this.initialLetter,
            userId: this.userId,
        }
    }
}
