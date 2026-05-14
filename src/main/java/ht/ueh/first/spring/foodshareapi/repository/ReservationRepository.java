package ht.ueh.first.spring.foodshareapi.repository;

import ht.ueh.first.spring.foodshareapi.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByEtudiantId(Long etudiantId);

    List<Reservation> findByOffreId(Long offreId);
}