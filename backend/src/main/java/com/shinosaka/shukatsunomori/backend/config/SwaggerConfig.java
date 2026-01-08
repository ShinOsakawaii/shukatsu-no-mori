package com.shinosaka.shukatsunomori.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Shukatsu no Mori API")
                        .description("就活の森 프로젝트 API 명세")
                        .version("v1.0"));
    }
}
