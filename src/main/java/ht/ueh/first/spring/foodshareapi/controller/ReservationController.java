package ht.ueh.first.spring.foodshareapi.controller;

import ht.ueh.first.spring.foodshareapi.dto.ReservationRequestDTO;
import ht.ueh.first.spring.foodshareapi.dto.ReservationResponseDTO;
import ht.ueh.first.spring.foodshareapi.model.Reservation;
import ht.ueh.first.spring.foodshareapi.model.ReservationStatus;
import ht.ueh.first.spring.foodshareapi.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ReservationResponseDTO createReservation(@Valid @RequestBody ReservationRequestDTO request) {
        Reservation reservation = reservationService.createReservation(request);
        return mapToResponse(reservation);
    }

    @GetMapping
    public List<ReservationResponseDTO> getAllReservations() {
        return reservationService.getAllReservations()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public ReservationResponseDTO getReservationById(@PathVariable Long id) {
        Reservation reservation = reservationService.getReservationById(id);
        return mapToResponse(reservation);
    }

    @GetMapping("/offre/{offreId}")
    public List<ReservationResponseDTO> getReservationsByOffre(@PathVariable Long offreId) {
        return reservationService.getReservationsByOffre(offreId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    @PutMapping("/{id}/status")
    public ReservationResponseDTO updateReservationStatus(
            @PathVariable Long id,
            @RequestParam ReservationStatus status
    ) {

        Reservation updatedReservation =
                reservationService.updateReservationStatus(id, status);

        return mapToResponse(updatedReservation);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

    private ReservationResponseDTO mapToResponse(Reservation reservation) {
        return new ReservationResponseDTO(
                reservation.getId(),
                reservation.getDateReservation(),
                reservation.getStatut(),
                reservation.getOffre().getTitre(),
                reservation.getEtudiant().getName()
        );
    }
}