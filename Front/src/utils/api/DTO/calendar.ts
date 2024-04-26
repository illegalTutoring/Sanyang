import { serverResponseDTO } from './common'

interface calendarInfo {
    calendarId: number
    userId: String
    company: String
    title: String
    startDate: String
    endDate: String
}

export interface getCalendarResponseDTO extends serverResponseDTO {
    data: Array<calendarInfo>
}

export interface registCalendarRequestDTO {
    userId: String
    title: String
    startDate: String
    endDate: String
}

export interface modifyCalendarRequestDTO {
    calendarId: number
    userId: String
    title: String
    startDate: String
    endDate: String
}

export interface registCalendarResponseDTO extends serverResponseDTO {}
export interface modifyCalendarResponseDTO extends serverResponseDTO {}
export interface deleteCalendarResponseDTO extends serverResponseDTO {}
