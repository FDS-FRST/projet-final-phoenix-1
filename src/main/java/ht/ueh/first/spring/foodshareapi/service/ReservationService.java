package ht.ueh.first.spring.foodshareapi.service;

import ht.ueh.first.spring.foodshareapi.dto.ReservationRequestDTO;
import ht.ueh.first.spring.foodshareapi.exception.UserNotFoundException;
import ht.ueh.first.spring.foodshareapi.model.*;
import ht.ueh.first.spring.foodshareapi.repository.OffreRepository;
import ht.ueh.first.spring.foodshareapi.repository.ReservationRepository;
import ht.ueh.first.spring.foodshareapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final OffreRepository offreRepository;
    private final UserRepository userRepository;

    public ReservationService(
            ReservationRepository reservationRepository,
            OffreRepository offreRepository,
            UserRepository userRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.offreRepository = offreRepository;
        this.userRepository = userRepository;
    }

    // CREATE RESERVATION
    public Reservation createReservation(ReservationRequestDTO request) {

        Offre offre = offreRepository.findById(request.getOffreId())
                .orElseThrow(() ->
                        new RuntimeException("Offre not found"));

        User etudiant = userRepository.findById(request.getEtudiantId())
                .orElseThrow(() ->
                        new UserNotFoundException(request.getEtudiantId()));

        // vérifier stock
        if (offre.getQuantiteRestante() <= 0) {
            throw new RuntimeException("No stock available");
        }

        // décrémenter stock
        offre.setQuantiteRestante(
                offre.getQuantiteRestante() - 1
        );

        Reservation reservation = new Reservation(
                LocalDateTime.now(),
                ReservationStatus.EN_ATTENTE,
                offre,
                etudiant
        );

        return reservationRepository.save(reservation);
    }


    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }


    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Reservation not found"));
    }


    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    public List<Reservation> getReservationsByEtudiant(Long etudiantId) {
        return reservationRepository.findByEtudiantId(etudiantId);
    }
    public List<Reservation> getReservationsByOffre(Long offreId) {
        return reservationRepository.findByOffreId(offreId);
    }
    public Reservation updateReservationStatus(
            Long reservationId,
            ReservationStatus status
    ) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() ->
                        new RuntimeException("Reservation not found"));

        reservation.setStatut(status);

        return reservationRepository.save(reservation);
    }
}