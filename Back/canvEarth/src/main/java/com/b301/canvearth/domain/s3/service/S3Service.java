package com.b301.canvearth.domain.s3.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.b301.canvearth.global.error.CustomException;
import com.b301.canvearth.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {

    private final AmazonS3Client amazonS3Client;
    private final int TARGET_HEIGHT = 500;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${app.allow.extension}")
    private String[] allowedExtension;

    /////////////////////////////////
    // 워터마크 관련 변수
//    @Value("${app.font.path}")
//    private String pretendardFont;
//    @Value("${app.font.size}")
//    private int fontSize;
//    @Value("${app.font.color}")
//    private String fontColor;
//    @Value("${app.text.watermark}")
//    private String watermarkText;
    ////////////////////////////////

    public boolean checkExtension(MultipartFile image) {
        log.info("===== [S3Service] checkExtension start =====");

        String[] extensionList = allowedExtension;
        for(String img: extensionList) {
            if(Objects.equals(StringUtils.getFilenameExtension(image.getOriginalFilename()), img)) {
                return true;
            }
        }
        return false;
    }


    public String uploadImage(MultipartFile image, UUID uuid, String uploadType) {
        log.info("===== [S3Service] uploadImage start =====");

        if(!checkExtension(image)) {
            log.error("image extension: {}", StringUtils.getFilenameExtension(image.getOriginalFilename()));
            throw new CustomException(ErrorCode.NOT_ALLOWED_EXTENSION);
        }

        try {
            String saveFileName = String.format("%s_%s.%s",
                    uuid, uploadType, StringUtils.getFilenameExtension(image.getOriginalFilename()));

            ObjectMetadata metadata = new ObjectMetadata();
            String fileFormat = StringUtils.getFilenameExtension(image.getOriginalFilename());

            if(uploadType.equals("thumbnail")) {
                BufferedImage thumbnailImage = resizeImage(image);
                ByteArrayInputStream byteArrayInputStream = convertImage(thumbnailImage, image.getContentType(),
                        fileFormat, metadata);

                amazonS3Client.putObject(new PutObjectRequest(bucket, saveFileName, byteArrayInputStream, metadata));
            } else {
                metadata.setContentType(image.getContentType());
                metadata.setContentLength(image.getSize());
                amazonS3Client.putObject(bucket, saveFileName, image.getInputStream(), metadata);
            }

            return amazonS3Client.getUrl(bucket, saveFileName).toString();
        } catch (AmazonServiceException e) {
            log.error("AmazonServiceException 발생");
            throw new CustomException(ErrorCode.NO_S3_UNAUTHORIZED);
        } catch (SdkClientException e) {
            log.error("SdkClientException 발생");
            throw new SdkClientException("SdkClientException 발생", e);
        } catch (IOException e) {
            log.error("IOException 발생");
            throw new RuntimeException(e);
        }
    }

    public Map<String, String> uploadS3AndGetPath(MultipartFile image) {
        log.info("===== [S3Service] uploadS3AndGetPath start =====");
        Map<String, String> paths = new HashMap<>();
        UUID uuid = UUID.randomUUID();
        // originalPath
        String originalPath = uploadImage(image, uuid, "original");
        paths.put("originalPath", originalPath);

        // thumbnailPath
        String thumbnailPath = uploadImage(image, uuid, "thumbnail");
        paths.put("thumbnailPath", thumbnailPath);

        return paths;
    }

    private BufferedImage resizeImage(MultipartFile image) throws IOException {
        BufferedImage sourceImage = ImageIO.read(image.getInputStream());

        if(sourceImage.getHeight() <= TARGET_HEIGHT) {
            return sourceImage;
        }

        double sourceImageRatio = (double) sourceImage.getWidth() / sourceImage.getHeight();
        int newWidth = (int) (TARGET_HEIGHT * sourceImageRatio);

        return Scalr.resize(sourceImage, newWidth, TARGET_HEIGHT);
    }

    private ByteArrayInputStream convertImage(BufferedImage croppedImage, String contentType, String fileFormat,
                                              ObjectMetadata objectMetadata) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(croppedImage, fileFormat, byteArrayOutputStream);

        objectMetadata.setContentType(contentType);
        objectMetadata.setContentLength(byteArrayOutputStream.size());

        return new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
    }

//    private ByteArrayInputStream addWatermark(MultipartFile image, String fileFormat) throws IOException {
//        BufferedImage originalImage = ImageIO.read(image.getInputStream());
//        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//
//        // 이미지에 그래픽 객체 생성
//        Graphics2D g2d = (Graphics2D) originalImage.getGraphics();
//
//        // 폰트 파일 로드 및 폰트 객체 생성
//        File fontFile = new File(pretendardFont);
//        Font font = loadFont(fontFile);
//        g2d.setFont(font);
//        g2d.setColor(Color.getColor(fontColor));
//
//        int x = 20; // 왼쪽으로부터의 거리
//        int y = originalImage.getHeight() - fontSize; // 아래쪽으로부터의 거리
//        // 워터마크 텍스트 그리기
//        g2d.drawString(watermarkText, x, y);
//
//        // 그래픽 객체 종료
//        g2d.dispose();
//
//        ImageIO.write(originalImage, fileFormat, byteArrayOutputStream);
//        return new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
//    }

//    private Font loadFont(File fontFile) {
//        try {
//            return Font.createFont(Font.TRUETYPE_FONT, fontFile).deriveFont(Font.PLAIN, fontSize);
//        } catch (FontFormatException e) {
//            log.error("FontFormatException 발생");
//            // 기본 폰트를 반환하거나 예외 처리를 진행할 수 있음
//            return new Font("Arial", Font.PLAIN, fontSize);
//        } catch (IOException e) {
//            log.error("IOException 발생");
//            return new Font("Arial", Font.PLAIN, fontSize);
//        }
//    }

    public void deleteImage(String url) {
        log.info("===== [S3Service] deleteImage start =====");

        try {
            String[] splitStr = url.split("/");
            String urlKey = splitStr[splitStr.length-1];

            amazonS3Client.deleteObject(bucket, urlKey);
            log.info("delete S3 imageName: {}", urlKey);
            log.info("===== [S3Service] deleteImage end =====");
        } catch (AmazonServiceException e) {
            log.error("AmazonServiceException 발생");
        } catch (SdkClientException e) {
            log.error("SdkClientException 발생");
        }
    }
}
