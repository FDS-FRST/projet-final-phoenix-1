package ht.ueh.first.spring.foodshareapi.dto;

import ht.ueh.first.spring.foodshareapi.model.ReservationStatus;

import java.time.LocalDateTime;

public class ReservationResponseDTO {

    private Long id;
    private LocalDateTime dateReservation;
    private ReservationStatus statut;
    private String titreOffre;
    private String nomEtudiant;

    public ReservationResponseDTO(
            Long id,
            LocalDateTime dateReservation,
            ReservationStatus statut,
            String titreOffre,
            String nomEtudiant
    ) {
        this.id = id;
        this.dateReservation = dateReservation;
        this.statut = statut;
        this.titreOffre = titreOffre;
        this.nomEtudiant = nomEtudiant;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateReservation() {
        return dateReservation;
    }

    public ReservationStatus getStatut() {
        return statut;
    }

    public String getTitreOffre() {
        return titreOffre;
    }

    public String getNomEtudiant() {
        return nomEtudiant;
    }
}