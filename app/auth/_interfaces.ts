export interface RegisterForm {
    nickname: string
    email: string
    password: string
    confirmpassword: string
    countryCode: string
}

export interface LoginForm {
    nickname: string
    password: string
}

export interface user {
    username: string
    password: string
    id: string
}