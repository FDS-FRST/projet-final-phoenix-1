package ht.ueh.foodsharemobile.session

import ht.ueh.foodsharemobile.data.model.User

object SessionManager {
    var currentUser: User? = null

    fun logout() {
        currentUser = null
    }
}