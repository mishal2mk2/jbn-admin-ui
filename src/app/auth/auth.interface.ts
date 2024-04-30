export interface ILoginBody{
    username:string;
    password:string;
}

export interface IRegisterBody{
    username:string;
    password:string;
    name:string;
    mobile:number;
}

export interface ILoginReponse{
    success:boolean;
    data:{
        token:string;
    }
}

export interface IRegResponse{
    success:boolean;
    message:string;
}