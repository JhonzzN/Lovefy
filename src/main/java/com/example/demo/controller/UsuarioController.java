package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:5173") 
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // AJUSTE: Adicionamos "/cadastrar" para bater com o fetch do React
    @PostMapping("/cadastrar") 
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioRepository.save(usuario));
        }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }
}