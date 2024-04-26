package com.b301.canvearth.domain.s3.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.b301.canvearth.domain.work.entity.Work;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadImage(MultipartFile image, UUID uuid, String uploadType) {
        log.info("===== [S3Service] uploadImage start =====");
        try {
            String saveFileName = String.format("%s_%s.%s",
                    uuid, uploadType, StringUtils.getFilenameExtension(image.getOriginalFilename()));

//            String imageName = image.getOriginalFilename();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(image.getContentType());
            metadata.setContentLength(image.getSize());
            amazonS3Client.putObject(bucket, saveFileName, image.getInputStream(), metadata);

            return amazonS3Client.getUrl(bucket, saveFileName).toString();
        } catch (AmazonServiceException e) {
            log.error("AmazonServiceException 발생");
//            throw new AmazonServiceException("AmazonServiceException 발생", e);
            return null;
        } catch (SdkClientException e) {
            log.error("SdkClientException 발생");
//            throw new SdkClientException("SdkClientException 발생", e);
            return null;
        } catch (IOException e) {
            log.error("IOException 발생");
            throw new RuntimeException(e);
        }
    }
}
