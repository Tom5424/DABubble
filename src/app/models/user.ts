export class User {
    name: string | null;
    email: string | null;
    password: string;
    imgUrl: string | null;
    initialLetter: string | undefined;
    userId: string;
    isOnline: boolean | undefined;
    haveAtLeastOneMessage: boolean | undefined;


    constructor(object?: User, userId?: string) {
        this.name = object ? object.name : '';
        this.email = object ? object.email : '';
        this.password = object ? object.password : '';
        this.imgUrl = object ? object.imgUrl : '';
        this.initialLetter = object ? object.name?.charAt(0).toLocaleLowerCase() : '';
        this.userId = userId ? userId : '';
    }


    toJson() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            imgUrl: this.imgUrl,
            initialLetter: this.initialLetter,
            userId: this.userId,
        }
    }
}
