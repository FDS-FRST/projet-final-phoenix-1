package ht.ueh.foodsharemobile.data.model

data class Offre(
    val id: Long,
    val titre: String,
    val description: String,
    val quantiteInitiale: Int,
    val quantiteRestante: Int,
    val prix: Double,
    val debutRetrait: String,
    val finRetrait: String,
    val lieu: String,
    val nomOffreur: String
)