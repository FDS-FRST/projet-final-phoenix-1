package ht.ueh.foodsharemobile.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import ht.ueh.foodsharemobile.data.model.Offre
import ht.ueh.foodsharemobile.data.model.OffreRequest
import ht.ueh.foodsharemobile.data.model.Reservation
import ht.ueh.foodsharemobile.data.repository.OffreRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class OffreViewModel : ViewModel() {

    private val repository = OffreRepository()

    private val _offres = MutableStateFlow<List<Offre>>(emptyList())
    val offres: StateFlow<List<Offre>> = _offres

    private val _reservations = MutableStateFlow<List<Reservation>>(emptyList())
    val reservations: StateFlow<List<Reservation>> = _reservations

    private val _isLoading = MutableStateFlow(true)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    private val _message = MutableStateFlow("")
    val message: StateFlow<String> = _message

    init {
        loadOffres()
    }

    fun loadOffres() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                _offres.value = repository.getOffres()
                _error.value = null
            } catch (e: Exception) {
                _offres.value = emptyList()
                _error.value = e.message ?: "Erreur pendant le chargement"
                e.printStackTrace()
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun createOffre(request: OffreRequest) {
        viewModelScope.launch {
            try {
                repository.createOffre(request)
                _message.value = "Offre créée avec succès"
                loadOffres()
            } catch (e: Exception) {
                _message.value = "Erreur lors de la création"
                e.printStackTrace()
            }
        }
    }

    fun updateOffre(id: Long, request: OffreRequest) {
        viewModelScope.launch {
            try {
                repository.updateOffre(id, request)
                _message.value = "Offre modifiée avec succès"
                loadOffres()
            } catch (e: Exception) {
                _message.value = "Erreur lors de la modification"
                e.printStackTrace()
            }
        }
    }

    fun deleteOffre(id: Long) {
        viewModelScope.launch {
            try {
                repository.deleteOffre(id)
                _message.value = "Offre supprimée avec succès"
                loadOffres()
            } catch (e: Exception) {
                _message.value = "Impossible de supprimer cette offre"
                e.printStackTrace()
            }
        }
    }

    fun reserver(offreId: Long, etudiantId: Long) {
        viewModelScope.launch {
            try {
                repository.createReservation(offreId, etudiantId)
                _message.value = "Réservation effectuée avec succès"
                loadOffres()
                loadReservations(etudiantId)
            } catch (e: Exception) {
                _message.value = "Erreur lors de la réservation"
                e.printStackTrace()
            }
        }
    }

    fun loadReservations(etudiantId: Long) {
        viewModelScope.launch {
            try {
                _reservations.value = repository.getReservationsByEtudiant(etudiantId)
            } catch (e: Exception) {
                _reservations.value = emptyList()
                e.printStackTrace()
            }
        }
    }
}