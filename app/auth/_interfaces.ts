export interface RegisterForm {
    username: string
    email: string
    password: string
    confirmpassword: string
}

export interface LoginForm {
    username: string
    password: string
}

export interface user {
    username: string
    password: string
    id: string
}