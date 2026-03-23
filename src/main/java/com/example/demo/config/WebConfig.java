package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir:./uploads}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Pega o caminho absoluto da pasta no seu computador
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        String absolutePath = uploadPath.toUri().toString(); // Ex: file:/C:/seu-projeto/uploads/

        // Toda vez que o front-end chamar http://localhost:8080/uploads/arquivo.mp3, ele busca na pasta
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(absolutePath);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Libera a API para receber requisições do seu Front-end
        registry.addMapping("/**")
                .allowedOrigins("*") // Em produção, a gente troca pelo endereço real do front
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}