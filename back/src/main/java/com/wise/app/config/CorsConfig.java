// back/src/main/java/com/wise/app/config/CorsConfig.java
package com.wise.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS 설정:
 * - 오리진: http://49.246.62.220:2000 (프런트 Nginx가 리슨하는 포트)
 * - 메서드: GET, POST, PUT, DELETE, OPTIONS
 * - 헤더: 전체 허용
 * - Credentials: 불필요하면 false 권장(와일드카드 패턴과의 제약 회피)
 * - Preflight 캐시: 3600초
 */
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        // Spring 6 / Boot 3에서는 allowedOrigins가 "정확한" 오리진만 허용.
                        // 포트 포함하여 정확히 기입.
                        .allowedOrigins("http://49.246.62.220:2000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        // 쿠키/인증 헤더가 필요 없다면 false가 안전. (true면 특정 오리진과만 함께 사용)
                        .allowCredentials(false)
                        .maxAge(3600);
            }
        };
    }
}

