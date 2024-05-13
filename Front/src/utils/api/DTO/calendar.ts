import { serverResponseDTO } from './common'

export interface calendarInfo {
    calendarId: number
    userId: String
    title: string
    startDate: string
    endDate: string
}

export interface getCalendarResponseDTO extends serverResponseDTO {
    data: Array<calendarInfo>
}

export interface registCalendarRequestDTO {
    title: string
    startDate: string
    endDate: string
}

export interface modifyCalendarRequestDTO {
    calendarId: number
    title: string
    startDate: string
    endDate: string
}

export interface registCalendarResponseDTO extends serverResponseDTO {}
export interface modifyCalendarResponseDTO extends serverResponseDTO {}
export interface deleteCalendarResponseDTO extends serverResponseDTO {}
