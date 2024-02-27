export class User {
    name: string | null;
    email: string | null;
    password: string;
    imgUrl: string | null;
    initialLetter: string | undefined;
    userId: string;
    isOnline: boolean;


    constructor(object?: User, userId?: string) {
        this.name = object ? object.name : '';
        this.email = object ? object.email : '';
        this.password = object ? object.password : '';
        this.imgUrl = object ? object.imgUrl : '';
        this.initialLetter = object ? object.name?.charAt(0).toLocaleLowerCase() : '';
        this.userId = userId ? userId : '';
        this.isOnline = object ? this.isOnline = true : this.isOnline = false;
    }


    toJson() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            imgUrl: this.imgUrl,
            isOnline: this.isOnline,
            initialLetter: this.initialLetter,
            userId: this.userId,
        }
    }
}
