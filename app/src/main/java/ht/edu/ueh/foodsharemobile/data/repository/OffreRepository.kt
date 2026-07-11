package ht.ueh.foodsharemobile.data.repository

import ht.ueh.foodsharemobile.data.api.RetrofitInstance
import ht.ueh.foodsharemobile.data.model.LoginRequest
import ht.ueh.foodsharemobile.data.model.Offre
import ht.ueh.foodsharemobile.data.model.OffreRequest
import ht.ueh.foodsharemobile.data.model.Reservation
import ht.ueh.foodsharemobile.data.model.ReservationRequest
import ht.ueh.foodsharemobile.data.model.User

class OffreRepository {

    suspend fun getOffres(): List<Offre> {
        return RetrofitInstance.api.getOffres()
    }

    suspend fun createOffre(request: OffreRequest): Offre {
        return RetrofitInstance.api.createOffre(request)
    }

    suspend fun updateOffre(
        id: Long,
        request: OffreRequest
    ): Offre {
        return RetrofitInstance.api.updateOffre(id, request)
    }

    suspend fun deleteOffre(id: Long) {
        RetrofitInstance.api.deleteOffre(id)
    }

    suspend fun createReservation(
        offreId: Long,
        etudiantId: Long
    ) {
        RetrofitInstance.api.createReservation(
            ReservationRequest(
                offreId = offreId,
                etudiantId = etudiantId
            )
        )
    }

    suspend fun getReservationsByEtudiant(
        etudiantId: Long
    ): List<Reservation> {
        return RetrofitInstance.api.getReservationsByEtudiant(etudiantId)
    }

    suspend fun login(
        email: String,
        password: String
    ): User {
        return RetrofitInstance.api.login(
            LoginRequest(
                email = email,
                password = password
            )
        )
    }
}