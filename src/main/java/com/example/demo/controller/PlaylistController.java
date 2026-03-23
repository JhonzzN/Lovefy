package com.example.demo.controller;

import com.example.demo.model.Playlist;
import com.example.demo.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

    @Autowired
    private PlaylistRepository playlistRepository;

    @PostMapping
    public ResponseEntity<Playlist> criarPlaylist(@RequestBody Playlist playlist) {
        Playlist novaPlaylist = playlistRepository.save(playlist);
        return ResponseEntity.ok(novaPlaylist);
    }

    @GetMapping
    public ResponseEntity<List<Playlist>> listarPlaylists() {
        return ResponseEntity.ok(playlistRepository.findAll());
    }
}