package ht.ueh.first.spring.foodshareapi.dto;

import java.time.LocalDateTime;

public class OffreResponseDTO {

    private Long id;
    private String titre;
    private String description;
    private Integer quantiteInitiale;
    private Integer quantiteRestante;
    private Double prix;
    private LocalDateTime debutRetrait;
    private LocalDateTime finRetrait;
    private String lieu;
    private String nomOffreur;

    public OffreResponseDTO(
            Long id,
            String titre,
            String description,
            Integer quantiteInitiale,
            Integer quantiteRestante,
            Double prix,
            LocalDateTime debutRetrait,
            LocalDateTime finRetrait,
            String lieu,
            String nomOffreur
    ) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.quantiteInitiale = quantiteInitiale;
        this.quantiteRestante = quantiteRestante;
        this.prix = prix;
        this.debutRetrait = debutRetrait;
        this.finRetrait = finRetrait;
        this.lieu = lieu;
        this.nomOffreur = nomOffreur;
    }

    public Long getId() {
        return id;
    }

    public String getTitre() {
        return titre;
    }

    public String getDescription() {
        return description;
    }

    public Integer getQuantiteInitiale() {
        return quantiteInitiale;
    }

    public Integer getQuantiteRestante() {
        return quantiteRestante;
    }

    public Double getPrix() {
        return prix;
    }

    public LocalDateTime getDebutRetrait() {
        return debutRetrait;
    }

    public LocalDateTime getFinRetrait() {
        return finRetrait;
    }

    public String getLieu() {
        return lieu;
    }

    public String getNomOffreur() {
        return nomOffreur;
    }
}