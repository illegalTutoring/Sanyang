import { serverResponseDTO } from './common'

interface calendarInfo {
    calendarId: number
    userId: string
    company: string
    title: string
    startDate: string
    endDate: string
}

export interface getCalendarResponseDTO extends serverResponseDTO {
    data: Array<calendarInfo>
}

export interface registCalendarRequestDTO {
    userId: string
    title: string
    startDate: string
    endDate: string
}

export interface modifyCalendarRequestDTO {
    calendarId: number
    userId: string
    title: string
    startDate: string
    endDate: string
}

export interface registCalendarResponseDTO extends serverResponseDTO {}
export interface modifyCalendarResponseDTO extends serverResponseDTO {}
export interface deleteCalendarResponseDTO extends serverResponseDTO {}
