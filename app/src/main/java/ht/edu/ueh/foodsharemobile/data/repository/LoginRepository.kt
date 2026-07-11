package ht.ueh.foodsharemobile.data.repository

import ht.ueh.foodsharemobile.data.api.RetrofitInstance
import ht.ueh.foodsharemobile.data.model.LoginRequest
import ht.ueh.foodsharemobile.data.model.User

class LoginRepository {

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