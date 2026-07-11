package ht.ueh.foodsharemobile.data.api

import ht.ueh.foodsharemobile.data.model.LoginRequest
import ht.ueh.foodsharemobile.data.model.Offre
import ht.ueh.foodsharemobile.data.model.OffreRequest
import ht.ueh.foodsharemobile.data.model.Reservation
import ht.ueh.foodsharemobile.data.model.ReservationRequest
import ht.ueh.foodsharemobile.data.model.User
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path



interface FoodShareApi {

    @GET("api/offres")
    suspend fun getOffres(): List<Offre>

    @POST("api/offres")
    suspend fun createOffre(
        @Body request: OffreRequest
    ): Offre

    @PUT("api/offres/{id}")
    suspend fun updateOffre(
        @Path("id") id: Long,
        @Body request: OffreRequest
    ): Offre

    @DELETE("api/offres/{id}")
    suspend fun deleteOffre(
        @Path("id") id: Long
    )

    @POST("api/reservations")
    suspend fun createReservation(
        @Body request: ReservationRequest
    )

    @GET("api/reservations/etudiant/{etudiantId}")
    suspend fun getReservationsByEtudiant(
        @Path("etudiantId") etudiantId: Long
    ): List<Reservation>

    @POST("api/users/login")
    suspend fun login(
        @Body request: LoginRequest
    ): User
}