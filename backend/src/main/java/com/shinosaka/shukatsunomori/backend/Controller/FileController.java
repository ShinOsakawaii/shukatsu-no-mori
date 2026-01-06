package com.shinosaka.shukatsunomori.backend.Controller;

import com.shinosaka.shukatsunomori.backend.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    // 업로드
    @PostMapping("/image")
    public Map<String, String> uploadImage(@RequestParam("file")MultipartFile file) {
        String imageUrl = fileService.saveImage(file);
        return Map.of("imageUrl", imageUrl);
    }

    // 수정
    @PutMapping("/image")
    public Map<String, String> updateImage(
            @RequestParam(required = false) String imageUrl,
            @RequestParam("file") MultipartFile file
    ) {
        String newImageUrl = fileService.updateImage(imageUrl, file);
        return Map.of("imageUrl", newImageUrl);
    }

// 이미지 수정 -> 프론트에서 보내는 형태 (참고용)
//const formData = new FormData();
//formData.append("file", newFile);
//formData.append("imageUrl", imageUrl);
//axios.put("/api/files/image", formData);

    // 이미지 삭제만
    @DeleteMapping("/image")
    public void deleteImage(@RequestParam String imageUrl) {
        fileService.deleteImage(imageUrl);
    }

}