export class User {
    name: string;
    email: string;
    password: string;
    imgUrl: string | null;
    isOnline: boolean = true;


    constructor(object?: User) {
        this.name = object ? object.name : '';
        this.email = object ? object.email : '';
        this.password = object ? object.password : '';
        this.imgUrl = object ? object.imgUrl : '';
        this.isOnline = object ? object.isOnline = true : false;
    }


    // toJson() {
    //     return {
    //         name: this.name,
    //         email: this.email,
    //         password: this.password,
    //         imgUrl: this.imgUrl,
    //         isOnline: this.isOnline,
    //     }
    // }
}
