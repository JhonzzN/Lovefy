package com.example.demo.model; // Lembre-se de ajustar para o seu pacote!

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "usuarios") // Tem que ser exatamente o nome da tabela no Postgres
public class Usuario {

  @Id
@GeneratedValue(generator = "UUID")
@Column(name = "id", updatable = false, nullable = false)
private UUID id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @JsonProperty("senha")
    @Column(name = "senha_hash", nullable = false)
    private String senhaHash;

    @Column(nullable = false, length = 20)
    private String tipo = "user";

    // O banco de dados já gera a data automaticamente, então dizemos pro Java apenas ler
    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    // --- GETTERS E SETTERS ---
    // Eles são necessários para o Java conseguir ler e gravar os dados nas variáveis

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }


    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
// --- CORREÇÃO DOS GETTERS E SETTERS ---
    public String getSenha() { return senhaHash; } // Alterado de 'senha' para 'senhaHash'
    public void setSenha(String senha) { this.senhaHash = senha; } // Alterado de 'this.senha' para 'this.senhaHash'

    // Garanta que o Getter do Nome existe para o React não receber 'null'
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}