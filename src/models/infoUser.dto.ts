import { CommonResponse } from "./common/common-response"

export interface DataGetInfoUser {
    avatar: string
    username: string
}

export interface ResponseGetInfoUserDto extends CommonResponse {
    data?: DataGetInfoUser
}