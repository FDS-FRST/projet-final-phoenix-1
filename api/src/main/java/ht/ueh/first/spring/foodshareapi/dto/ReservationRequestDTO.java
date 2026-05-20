package ht.ueh.first.spring.foodshareapi.dto;

import jakarta.validation.constraints.NotNull;

public class ReservationRequestDTO {

    @NotNull(message = "Offre id is required")
    private Long offreId;

    @NotNull(message = "Etudiant id is required")
    private Long etudiantId;

    public Long getOffreId() {
        return offreId;
    }

    public Long getEtudiantId() {
        return etudiantId;
    }
}