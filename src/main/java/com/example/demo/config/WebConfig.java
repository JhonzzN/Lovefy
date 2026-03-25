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

    // Define "uploads" como padrão se não houver nada no application.properties
    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Pega o caminho absoluto da pasta no seu computador (Essa sua lógica está perfeita!)
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        String absolutePath = uploadPath.toUri().toString();

        // Toda vez que o front-end chamar /uploads/arquivo.mp3, ele busca na pasta física
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(absolutePath);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Libera a API para receber requisições do seu Front-end React
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // <-- Trocamos o "*" pelo endereço exato do React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}