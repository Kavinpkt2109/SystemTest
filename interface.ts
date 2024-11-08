export interface UserRequestBody {
  name: string;
  password: string;
  emailId: string;
}

export interface excelData {
  userName: string;
  message: string;
}


export interface checkUserResult{
    ischeck:string
    msg:string
}