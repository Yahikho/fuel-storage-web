export interface DataUserDto {
    email: string
    code: number
}

export interface UserCreatedDto {
    code: number
    response: boolean
    message: string | [string]
    data?: any
}