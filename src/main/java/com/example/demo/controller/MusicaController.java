package com.example.demo.controller;

import com.example.demo.model.Musica;
import com.example.demo.model.FileStorageService;
import com.example.demo.repository.MusicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/musicas")
public class MusicaController {

    @Autowired
    private MusicaRepository musicaRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping
    public ResponseEntity<Musica> criarMusica(
            @RequestParam("titulo") String titulo,
            @RequestParam("artista") String artista,
            @RequestParam(value = "album", required = false) String album,
            @RequestParam("mp3") MultipartFile audioFile, 
            @RequestParam(value = "imagem", required = false) MultipartFile coverImage) { 

        // 1. Guarda os ficheiros no disco e obtém os caminhos
        String caminhoMp3 = fileStorageService.storeFile(audioFile);
        String caminhoImagem = (coverImage != null && !coverImage.isEmpty()) 
                                ? fileStorageService.storeFile(coverImage) 
                                : null;

        // 2. Monta o objeto Musica
        Musica novaMusica = new Musica();
        novaMusica.setTitulo(titulo);
        novaMusica.setArtista(artista);
        novaMusica.setAlbum(album);
        novaMusica.setDuracao(0); // Definimos 0 por defeito, pois o React não envia a duração
        novaMusica.setCaminhoMp3(caminhoMp3);
        novaMusica.setCaminhoImagem(caminhoImagem);

        // 3. Guarda na base de dados
        return ResponseEntity.ok(musicaRepository.save(novaMusica));
    }

    @GetMapping
    public ResponseEntity<List<Musica>> listarMusicas() {
        return ResponseEntity.ok(musicaRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Musica> buscarPorId(@PathVariable Long id) {
        return musicaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}