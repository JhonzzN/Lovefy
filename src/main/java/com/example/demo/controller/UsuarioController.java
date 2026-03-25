package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.Optional;
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

    // A FUNÇÃO DE LOGIN ENTRA AQUI, ANTES DA ÚLTIMA CHAVE!
    @PostMapping("/login")
    public ResponseEntity<Usuario> fazerLogin(@RequestBody Usuario dadosLogin) {
        // Busca no banco um usuário que tenha exatamente esse email e essa senha
        java.util.Optional<Usuario> usuarioEncontrado = usuarioRepository.findByEmailAndSenhaHash(
            dadosLogin.getEmail(), 
            dadosLogin.getSenha()
        );

        if (usuarioEncontrado.isPresent()) {
            // Se achou, retorna o usuário com status 200 (OK)
            return ResponseEntity.ok(usuarioEncontrado.get());
        } else {
            // Se não achou (email ou senha errados), retorna erro 401 (Não autorizado)
            return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();
        }
    }
} // <- ESSA É A ÚLTIMA CHAVE QUE FECHA A CLASSE