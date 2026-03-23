package com.example.demo.model;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Não foi possível criar o diretório de upload.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        // Normaliza o nome do arquivo
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Verificações de segurança básicas
            if (fileName.contains("..")) {
                throw new RuntimeException("O arquivo contém um caminho inválido: " + fileName);
            }

            // Copia o arquivo para o diretório alvo (substitui se já existir com o mesmo nome)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Não foi possível armazenar o arquivo " + fileName + ". Tente novamente!", ex);
        }
    }
}
