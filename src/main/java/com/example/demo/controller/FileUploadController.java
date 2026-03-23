package com.example.demo.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.FileStorageService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    private final FileStorageService fileStorageService;

    public FileUploadController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);
        
        // Retornamos o nome do arquivo salvo (depois você pode salvar isso no banco de dados)
        Map<String, String> response = new HashMap<>();
        response.put("message", "Arquivo salvo com sucesso!");
        response.put("fileName", fileName);

        return ResponseEntity.ok(response);
    }
}