package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "playlists")
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "is_global", nullable = false)
    private Boolean isGlobal = false; // Por padrão, a playlist será privada

    // Relacionamento: Muitas Playlists podem pertencer a Um Usuário
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Usuario usuario;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    // --- GETTERS E SETTERS ---
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Boolean getIsGlobal() { return isGlobal; }
    public void setIsGlobal(Boolean isGlobal) { this.isGlobal = isGlobal; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}