package ht.ueh.foodsharemobile.data.model

data class Reservation(
    val id: Long,
    val dateReservation: String,
    val statut: String,
    val titreOffre: String,
    val nomEtudiant: String
)