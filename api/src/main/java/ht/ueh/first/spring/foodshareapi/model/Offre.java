package ht.ueh.first.spring.foodshareapi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "offres")
public class Offre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    private String description;

    private Integer quantiteInitiale;

    private Integer quantiteRestante;

    private Double prix;

    private LocalDateTime debutRetrait;

    private LocalDateTime finRetrait;

    private String lieu;

    @ManyToOne
    @JoinColumn(name = "offreur_id")
    private User offreur;

    public Offre() {
    }

    public Offre(String titre, String description, Integer quantiteInitiale,
                 Integer quantiteRestante, Double prix,
                 LocalDateTime debutRetrait, LocalDateTime finRetrait,
                 String lieu, User offreur) {
        this.titre = titre;
        this.description = description;
        this.quantiteInitiale = quantiteInitiale;
        this.quantiteRestante = quantiteRestante;
        this.prix = prix;
        this.debutRetrait = debutRetrait;
        this.finRetrait = finRetrait;
        this.lieu = lieu;
        this.offreur = offreur;
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

    public User getOffreur() {
        return offreur;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setQuantiteInitiale(Integer quantiteInitiale) {
        this.quantiteInitiale = quantiteInitiale;
    }

    public void setQuantiteRestante(Integer quantiteRestante) {
        this.quantiteRestante = quantiteRestante;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public void setDebutRetrait(LocalDateTime debutRetrait) {
        this.debutRetrait = debutRetrait;
    }

    public void setFinRetrait(LocalDateTime finRetrait) {
        this.finRetrait = finRetrait;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public void setOffreur(User offreur) {
        this.offreur = offreur;
    }
}