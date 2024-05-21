export interface IUser{
    username:string;
    password:string;
    isBlocked:boolean;
    mobile:number;
    mail:string;
    role:string;
    _id:string;
}

// export interface IRegisterBody{
//     username:string;
//     password:string;
//     name:string;
//     mobile:number;
// }

// export interface ILoginReponse{
//     success:boolean;
//     data:{
//         token:string;
//     }
// }

// export interface IRegResponse{
//     success:boolean;
//     message:string;
// }