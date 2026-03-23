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

    // Ajustado para Multipart: Recebe os arquivos e os textos
   @PostMapping
    public ResponseEntity<Musica> criarMusica(
            @RequestParam("titulo") String titulo,
            @RequestParam("artista") String artista,
            @RequestParam(value = "album", required = false) String album,
            @RequestParam("duracao") Integer duracao,
            @RequestParam("mp3") MultipartFile audioFile, // Alterado de audioFile para mp3
            @RequestParam(value = "imagem", required = false) MultipartFile coverImage) { // Alterado de coverImage para imagem{

        // 1. Salva os arquivos no disco e pega os nomes/caminhos
        String caminhoMp3 = fileStorageService.storeFile(audioFile);
        String caminhoImagem = (coverImage != null && !coverImage.isEmpty()) 
                                ? fileStorageService.storeFile(coverImage) 
                                : null;

        // 2. Monta o objeto Musica
        Musica novaMusica = new Musica();
        novaMusica.setTitulo(titulo);
        novaMusica.setArtista(artista);
        novaMusica.setAlbum(album);
        novaMusica.setDuracao(duracao);
        novaMusica.setCaminhoMp3(caminhoMp3);
        novaMusica.setCaminhoImagem(caminhoImagem);

        // 3. Salva no banco
        return ResponseEntity.ok(musicaRepository.save(novaMusica));
    }

    @GetMapping
    public ResponseEntity<List<Musica>> listarMusicas() {
        return ResponseEntity.ok(musicaRepository.findAll());
    }
    
    // Opcional: Buscar uma música específica por ID (agora Long)
    @GetMapping("/{id}")
    public ResponseEntity<Musica> buscarPorId(@PathVariable Long id) {
        return musicaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}