export class User {
    name: string;
    email: string;
    password: string;
    imgUrl?: string;


    constructor(object?: User) {
        this.name = object ? object.name : '';
        this.email = object ? object.email : '';
        this.password = object ? object.password : '';
        this.imgUrl = object ? object.imgUrl : '';
    }
}
