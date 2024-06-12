export interface UserSignIndDto {
    response: boolean
    message: string | [string]
    data?: {
        access_token: string
    }
}