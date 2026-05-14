package ht.ueh.first.spring.foodshareapi.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public class OffreRequestDTO {

    @NotBlank(message = "Titre is required")
    private String titre;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Quantite initiale is required")
    @Positive(message = "Quantite initiale must be positive")
    private Integer quantiteInitiale;

    @NotNull(message = "Prix is required")
    @PositiveOrZero(message = "Prix must be zero or positive")
    private Double prix;

    @NotNull(message = "Debut retrait is required")
    private LocalDateTime debutRetrait;

    @NotNull(message = "Fin retrait is required")
    private LocalDateTime finRetrait;

    @NotBlank(message = "Lieu is required")
    private String lieu;

    @NotNull(message = "Offreur id is required")
    private Long offreurId;

    public String getTitre() {
        return titre;
    }

    public String getDescription() {
        return description;
    }

    public Integer getQuantiteInitiale() {
        return quantiteInitiale;
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

    public Long getOffreurId() {
        return offreurId;
    }
}