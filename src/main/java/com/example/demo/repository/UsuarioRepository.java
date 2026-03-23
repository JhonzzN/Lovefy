package com.example.demo.repository;

import com.example.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
    // Só de herdar o JpaRepository, o Java já sabe fazer INSERT, SELECT, UPDATE e DELETE!
    // O UUID ali informa qual é o tipo do ID do nosso Usuario.
}