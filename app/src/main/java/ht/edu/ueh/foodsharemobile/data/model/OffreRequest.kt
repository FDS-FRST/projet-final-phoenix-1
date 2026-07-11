package ht.ueh.foodsharemobile.data.model

data class OffreRequest(
    val titre: String,
    val description: String,
    val quantiteInitiale: Int,
    val prix: Double,
    val debutRetrait: String,
    val finRetrait: String,
    val lieu: String,
    val offreurId: Long
)