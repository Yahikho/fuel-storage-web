export interface UserSignIndDto {
    code: number
    response: boolean
    message: string | [string]
    data?: {
        access_token: string
    }
}