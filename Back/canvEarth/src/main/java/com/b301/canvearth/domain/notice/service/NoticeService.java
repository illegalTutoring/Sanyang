package com.b301.canvearth.domain.notice.service;

import com.b301.canvearth.domain.admin.dto.request.NoticeRequestPostDto;
import com.b301.canvearth.domain.notice.dto.NoticeDto;
import com.b301.canvearth.domain.notice.dto.NoticeTitleListResponseDto;
import com.b301.canvearth.domain.notice.entity.Notice;
import com.b301.canvearth.domain.notice.repository.NoticeRepository;
import com.b301.canvearth.domain.user.entity.User;
import com.b301.canvearth.domain.user.repository.UserRepository;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import com.b301.canvearth.global.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;


    public NoticeDto getRecentNotice(){
        log.info("===== [NoticeService] getRecentNotice START =====");

        Notice notice = noticeRepository.findTop1ByOrderByIdDesc();

        if(notice == null) throw new CustomException(ErrorCode.NO_POST);


        return NoticeDto.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .username(notice.getUser().getUserName())
                .content(notice.getContent())
                .views(notice.getViews())
                .registDate(notice.getRegistDate())
                .build();
    }

    public Long getTotalNotice(int pageSize){
        log.info("===== [NoticeService] getTotalNotice START =====");

        Long totalPage = noticeRepository.countBy();
        return (totalPage / pageSize) + 1;
    }

    public Long getTotalNoticeCount(){
        log.info("===== [NoticeService] getTotalNoticeCount START =====");

        return noticeRepository.countBy();
    }



    public List<NoticeTitleListResponseDto> getNoticeList(Pageable pageable){
        log.info("===== [NoticeService] getNoticeList START =====");

        Pageable CustomPageable = PageRequest.of(pageable.getPageNumber()-1, pageable.getPageSize(),Sort.Direction.DESC,"id");

        log.info("[CustomPageable.getPageNumber]: {}", CustomPageable.getPageNumber());
        log.info("[CustomPageable.getPageSize]: {}", CustomPageable.getPageSize());

        Page<Notice> notices = noticeRepository.findAll(CustomPageable);

        return notices.getContent().stream()
                .map(notice -> NoticeTitleListResponseDto.builder()
                        .id(notice.getId())
                        .title(notice.getTitle())
                        .build())
                .toList();
    }

    @Transactional
    public NoticeDto getNotice(Long id){
        log.info("===== [NoticeService] getNotice START =====");

        Notice notice = noticeRepository.findById(id).orElseThrow(()->new CustomException(ErrorCode.NO_POST));

        notice.updateViews(notice.getViews()+1);

        return NoticeDto.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .username(notice.getUser().getUserName())
                .content(notice.getContent())
                .views(notice.getViews())
                .registDate(notice.getRegistDate())
                .build();

    }


    @Transactional
    public String InsertNotice(NoticeRequestPostDto data, HttpServletRequest request){

        log.info("===== [NoticeService] InsertNotice START =====");

        String accessToken = request.getHeader("accessToken");
        String username = jwtUtil.getUsername(accessToken);

        User user = userRepository.findByUserName(username);

        invalidCheck(data);

        Notice notice =  Notice.builder()
                .title(data.getTitle())
                .content(data.getContent())
                .user(user)
                .build();

        noticeRepository.save(notice);

        return "공지 등록 완료";
    }

    @Transactional
    public String updateNotice(Long noticeId, NoticeRequestPostDto data){

        log.info("===== [NoticeService] updateNotice START =====");

        Notice notice = noticeRepository.findById(noticeId).orElseThrow(()-> new CustomException(ErrorCode.NO_POST));

        invalidCheck(data);

        notice.updateNotice(data.getTitle(), data.getContent());

        return "공지 수정 완료";
    }

    @Transactional
    public String deleteNotice(Long noticeId){

        log.info("===== [NoticeService] deleteNotice START =====");

        Notice notice = noticeRepository.findById(noticeId).orElseThrow(()-> new CustomException(ErrorCode.NO_POST));

        noticeRepository.delete(notice);

        return "공지 삭제 완료";
    }

    public void invalidCheck(NoticeRequestPostDto data){
        if(data == null) {
            throw new NoSuchElementException("data 없음");
        }

        if(data.getTitle() == null || data.getTitle().isEmpty()){
            throw new CustomException(ErrorCode.NO_TITLE);
        }

        if(data.getContent() == null || data.getContent().isEmpty()){
            throw new CustomException(ErrorCode.NO_CONTENT);
        }
    }


}
