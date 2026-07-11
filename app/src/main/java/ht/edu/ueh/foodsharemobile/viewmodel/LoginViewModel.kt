package ht.ueh.foodsharemobile.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import ht.ueh.foodsharemobile.data.repository.LoginRepository
import ht.ueh.foodsharemobile.session.SessionManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class LoginViewModel : ViewModel() {

    private val repository = LoginRepository()

    private val _isLoggedIn = MutableStateFlow(false)
    val isLoggedIn: StateFlow<Boolean> = _isLoggedIn

    private val _error = MutableStateFlow("")
    val error: StateFlow<String> = _error

    fun login(email: String, password: String) {

        viewModelScope.launch {

            try {

                val user = repository.login(email, password)

                SessionManager.currentUser = user

                println("========== LOGIN ==========")
                println("ID      : ${user.id}")
                println("NAME    : ${user.name}")
                println("EMAIL   : ${user.email}")
                println("ROLE    : ${user.role}")
                println("===========================")

                _isLoggedIn.value = true
                _error.value = ""

            } catch (e: Exception) {

                _isLoggedIn.value = false
                _error.value = "Email ou mot de passe incorrect"

                e.printStackTrace()
            }
        }
    }

    fun logout() {
        SessionManager.logout()
        _isLoggedIn.value = false
    }
}


