package ht.ueh.first.spring.foodshareapi.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateReservation;

    @Enumerated(EnumType.STRING)
    private ReservationStatus statut;

    @ManyToOne
    @JoinColumn(name = "offre_id")
    private Offre offre;

    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private User etudiant;

    public Reservation() {
    }

    public Reservation(
            LocalDateTime dateReservation,
            ReservationStatus statut,
            Offre offre,
            User etudiant
    ) {
        this.dateReservation = dateReservation;
        this.statut = statut;
        this.offre = offre;
        this.etudiant = etudiant;
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

    public Offre getOffre() {
        return offre;
    }

    public User getEtudiant() {
        return etudiant;
    }

    public void setDateReservation(LocalDateTime dateReservation) {
        this.dateReservation = dateReservation;
    }

    public void setStatut(ReservationStatus statut) {
        this.statut = statut;
    }

    public void setOffre(Offre offre) {
        this.offre = offre;
    }

    public void setEtudiant(User etudiant) {
        this.etudiant = etudiant;
    }
}