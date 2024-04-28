import { serverResponseDTO } from './common'

export interface loginRequestDTO {
    username: String
    password: String
}

export interface loginResponseDTO extends serverResponseDTO {
    accessToken: String
}

export interface signinRequestDTO {
    id: String
    userName: String
    userPassword: String
}

export interface signinResponseDTO extends serverResponseDTO {}
