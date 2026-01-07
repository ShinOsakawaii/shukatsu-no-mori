package com.shinosaka.shukatsunomori.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //실제 물리적인 경로(절대 경로) 설정
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        String uploadPathWithPrefix = "file:" + uploadPath.toString() + "/";

        //브라우저에서 /image/xx로 접근하면 로컬 uploadDir 폴더에서 파일을 찾도록 매핑
        registry.addResourceHandler("/image/**")
                .addResourceLocations(uploadPathWithPrefix);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
