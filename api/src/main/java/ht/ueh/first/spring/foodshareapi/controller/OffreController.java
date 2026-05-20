package ht.ueh.first.spring.foodshareapi.controller;

import ht.ueh.first.spring.foodshareapi.dto.OffreRequestDTO;
import ht.ueh.first.spring.foodshareapi.dto.OffreResponseDTO;
import ht.ueh.first.spring.foodshareapi.model.Offre;
import ht.ueh.first.spring.foodshareapi.service.OffreService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offres")
public class OffreController {

    private final OffreService offreService;

    public OffreController(OffreService offreService) {
        this.offreService = offreService;
    }

    @PostMapping
    public OffreResponseDTO createOffre(@Valid @RequestBody OffreRequestDTO request) {
        Offre savedOffre = offreService.createOffre(request);
        return mapToResponse(savedOffre);
    }

    @GetMapping
    public List<OffreResponseDTO> getAllOffres() {
        return offreService.getAllOffres()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public OffreResponseDTO getOffreById(@PathVariable Long id) {
        Offre offre = offreService.getOffreById(id);
        return mapToResponse(offre);
    }

    @DeleteMapping("/{id}")
    public void deleteOffre(@PathVariable Long id) {
        offreService.deleteOffre(id);
    }

    private OffreResponseDTO mapToResponse(Offre offre) {
        return new OffreResponseDTO(
                offre.getId(),
                offre.getTitre(),
                offre.getDescription(),
                offre.getQuantiteInitiale(),
                offre.getQuantiteRestante(),
                offre.getPrix(),
                offre.getDebutRetrait(),
                offre.getFinRetrait(),
                offre.getLieu(),
                offre.getOffreur().getName()
        );
    }
    @GetMapping("/offreur/{offreurId}")
    public List<OffreResponseDTO> getOffresByOffreur(
            @PathVariable Long offreurId
    ) {

        return offreService.getOffresByOffreur(offreurId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}