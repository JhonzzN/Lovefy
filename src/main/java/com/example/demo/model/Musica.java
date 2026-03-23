package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "musicas")
public class Musica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(nullable = false, length = 100)
    private String artista;

    @Column(length = 100)
    private String album;

    @Column(name = "caminho_mp3", nullable = false, columnDefinition = "TEXT")
    private String caminhoMp3;

    @Column(name = "caminho_imagem", columnDefinition = "TEXT")
    private String caminhoImagem;

    @Column(nullable = false)
    private Integer duracao;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    // --- GETTERS E SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getArtista() { return artista; }
    public void setArtista(String artista) { this.artista = artista; }

    public String getAlbum() { return album; }
    public void setAlbum(String album) { this.album = album; }

    public String getCaminhoMp3() { return caminhoMp3; }
    public void setCaminhoMp3(String caminhoMp3) { this.caminhoMp3 = caminhoMp3; }

    public String getCaminhoImagem() { return caminhoImagem; }
    public void setCaminhoImagem(String caminhoImagem) { this.caminhoImagem = caminhoImagem; }

    public Integer getDuracao() { return duracao; }
    public void setDuracao(Integer duracao) { this.duracao = duracao; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}