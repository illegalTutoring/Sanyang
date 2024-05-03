import { serverResponseDTO } from './common'

export interface loginRequestDTO {
    username: string
    password: string
}

export interface signinRequestDTO {
    id: string
    userName: string
    userPassword: string
}

export interface loginResponseDTO extends serverResponseDTO {}
export interface signinResponseDTO extends serverResponseDTO {}
export interface reIssueResponseDTO extends serverResponseDTO {}
