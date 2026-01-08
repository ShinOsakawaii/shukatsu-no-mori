package com.shinosaka.shukatsunomori.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {
    
    @Value("${file.upload-dir}")
    private String uploadDir;

    public String saveImage(MultipartFile file) {

        // 비어있는지 파일 체크
        if(file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "업로드 파일이 없습니다.");
        }

        // 경로 설정
        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            log.info("uploadPath = {}", uploadPath);

            // 업로드 폴더가 없는 경우 새로 생성하기
            if(!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                log.info("업로드 폴더 생성: {}", uploadPath);
            }

            String originalName = file.getOriginalFilename();
            String ext = "";
            int idx = originalName.lastIndexOf(".");
            if(idx != -1) {
                ext = originalName.substring(idx);
            }

            String newName = UUID.randomUUID().toString() + ext;

            Path target = uploadPath.resolve(newName);

            file.transferTo(target.toFile());

            return "/image/" + newName;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드 실패", e);
        }
    }

    // 이미지 삭제
    public void deleteImage (String imageUrl) {
        if(imageUrl == null || imageUrl.isBlank()) return;

        // "/image/파일명" -> 파일명 추출
        String fileName = imageUrl.replace("/image/", "");

        // 저장 때와 같이 절대 경로
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        // uploadPath
        Path target = uploadPath.resolve(fileName).normalize();

        try {
            Files.deleteIfExists(target);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 삭제 중 오류 발생", e);
        }
    }

    // 이미지 수정
    public String updateImage(String imageUrl, MultipartFile newFile) {

        // 새 파일이 없으면 기존 이미지 유지
        if(newFile == null || newFile.isEmpty()) {
            return imageUrl;
        }

        // 기존 이미지 삭제
        deleteImage(imageUrl);

        // 새 이미지 저장
        return saveImage(newFile);
    }
}
