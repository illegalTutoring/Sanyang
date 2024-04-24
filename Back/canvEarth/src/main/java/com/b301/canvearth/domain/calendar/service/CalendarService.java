package com.b301.canvearth.domain.calendar.service;

import com.b301.canvearth.domain.admin.dto.CalendarRequestPostDto;
import com.b301.canvearth.domain.admin.dto.CalendarRequestPutDto;
import com.b301.canvearth.domain.calendar.entity.Calendar;
import com.b301.canvearth.domain.calendar.dto.CalendarResponseGetDto;
import com.b301.canvearth.domain.calendar.repository.CalendarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CalendarService {

    private final CalendarRepository calendarRepository;

    public List<Calendar> insertTestData(int year, int month) {
        log.info("===== [CalendarService] insertTestData =====");
        List<Calendar> list = new ArrayList<>();
        for(int i=0; i<50; i++) {
            int randYear = (int) (Math.random() * (3)) + 2022;
            int randMonth = (int) (Math.random() * (12)) + 1;
            int randEndMonth = Math.min(randMonth + (int) (Math.random() * (12)), 12);

            if(year == randYear && (month == randMonth || month == randEndMonth)) {
                Calendar calendar = Calendar.builder().userId("sanyang")
                        .title("외주 작업" + (i+1))
                        .startDate(String.format("%d-%02d-01", randYear, randMonth))
                        .endDate(String.format("%d-%02d-30", randYear, randEndMonth))
                        .build();
                calendarRepository.save(calendar);
                list.add(calendar);
            }
        }
        return list;
    }

    public Calendar insertCalendar(Calendar calendar) {
        return calendarRepository.save(calendar);
    }

    public List<Calendar> getCalendarList() {
        return calendarRepository.findAll();
    }

    public void modifyCalendar(Long calendarId, CalendarRequestPutDto requestPutDto) {
        Calendar calendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new IllegalArgumentException("Calendar not found with id: " + calendarId));

        calendar.setTitle(requestPutDto.getTitle());
        calendar.setStartDate(requestPutDto.getStartDate());
        calendar.setEndDate(requestPutDto.getEndDate());

        calendarRepository.save(calendar);
    }

    public void deleteCalendar(Long calendarId) {
        Calendar calendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new IllegalArgumentException("Calendar not found with id: " + calendarId));

        calendarRepository.delete(calendar);
    }
}
