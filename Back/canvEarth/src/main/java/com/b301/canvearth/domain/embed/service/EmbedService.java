package com.b301.canvearth.domain.embed.service;

import com.b301.canvearth.domain.admin.dto.EmbedRequestPutDto;
import com.b301.canvearth.domain.embed.dto.EmbedListResponseGetDto;
import com.b301.canvearth.domain.embed.entity.Embed;
import com.b301.canvearth.domain.embed.entity.EmbedType;
import com.b301.canvearth.domain.embed.repository.EmbedRepository;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmbedService {

    private final EmbedRepository embedRepository;

    public List<EmbedListResponseGetDto> findAllEmbed(){
        List<Embed> embedList = embedRepository.findAll();
        List<EmbedListResponseGetDto> result = new ArrayList<>();

        for (int i = 0; i < embedList.size(); i++) {
            Embed e = embedList.get(i);
            result.add(EmbedListResponseGetDto.builder().type(e.getType()).link(e.getLink()).build());
        }

        return result;
    }

    public String updateEmbed(List<EmbedRequestPutDto> data){

        if(data == null){
            embedRepository.deleteAll();
            return "링크 변경 완료";
        }


        for (EmbedRequestPutDto dto : data) {
            log.info("link: {}", dto.getLink());
            log.info("bool: {}", isValidLink(dto.getLink()));
            if (!isValidLink(dto.getLink())) {
                throw new CustomException(ErrorCode.INVALID_LINK_FORMAT);
            }
            if( dto.getType().getValue() < 0 || dto.getType().getValue() > 6){
                throw new CustomException(ErrorCode.INVALID_LINK_TYPE);
            }

        }




        embedRepository.deleteAll();

        for (int i = 1; i <= data.size(); i++) {
            EmbedRequestPutDto dto = data.get(i-1);

            Embed embed = Embed.builder().order(i).type(dto.getType()).link(dto.getLink()).build();
            embedRepository.save(embed);
        }

        return "링크 변경 완료";
    }

    public Boolean isValidLink(String link){
        String regex = "^(https?|ftp):\\/\\/(-\\.)?([^\\s\\/?\\.#-]+\\.?)+(\\/[^\\s]*)?$/i$";
        return true;
    }

}
