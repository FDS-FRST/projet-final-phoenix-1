package ht.ueh.first.spring.foodshareapi.service;

import ht.ueh.first.spring.foodshareapi.dto.OffreRequestDTO;
import ht.ueh.first.spring.foodshareapi.exception.UserNotFoundException;
import ht.ueh.first.spring.foodshareapi.model.Offre;
import ht.ueh.first.spring.foodshareapi.model.User;
import ht.ueh.first.spring.foodshareapi.repository.OffreRepository;
import ht.ueh.first.spring.foodshareapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OffreService {

    private final OffreRepository offreRepository;
    private final UserRepository userRepository;

    public OffreService(
            OffreRepository offreRepository,
            UserRepository userRepository
    ) {
        this.offreRepository = offreRepository;
        this.userRepository = userRepository;
    }

    // CREATE
    public Offre createOffre(OffreRequestDTO request) {

        User offreur = userRepository.findById(request.getOffreurId())
                .orElseThrow(() ->
                        new UserNotFoundException(request.getOffreurId()));

        Offre offre = new Offre(
                request.getTitre(),
                request.getDescription(),
                request.getQuantiteInitiale(),
                request.getQuantiteInitiale(),
                request.getPrix(),
                request.getDebutRetrait(),
                request.getFinRetrait(),
                request.getLieu(),
                offreur
        );

        return offreRepository.save(offre);
    }

    // READ ALL
    public List<Offre> getAllOffres() {
        return offreRepository.findAll();
    }

    // READ ONE
    public Offre getOffreById(Long id) {
        return offreRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Offre not found"));
    }

    // DELETE
    public void deleteOffre(Long id) {
        offreRepository.deleteById(id);
    }
    public List<Offre> getOffresByOffreur(Long offreurId) {
        return offreRepository.findByOffreurId(offreurId);
    }
}