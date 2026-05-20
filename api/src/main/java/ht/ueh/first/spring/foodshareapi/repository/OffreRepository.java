package ht.ueh.first.spring.foodshareapi.repository;

import ht.ueh.first.spring.foodshareapi.model.Offre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OffreRepository extends JpaRepository<Offre, Long> {

    List<Offre> findByOffreurId(Long offreurId);
}