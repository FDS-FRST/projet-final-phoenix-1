package ht.edu.ueh.foodsharemobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import ht.ueh.foodsharemobile.ui.screens.CreateOffreScreen
import ht.edu.ueh.foodsharemobile.ui.screens.LoginScreen
import ht.ueh.foodsharemobile.ui.screens.OffreDetailScreen
import ht.ueh.foodsharemobile.ui.screens.OffreScreen
import ht.ueh.foodsharemobile.ui.screens.ReservationScreen
import ht.edu.ueh.foodsharemobile.ui.screens.SplashScreen
import ht.ueh.foodsharemobile.ui.screens.UpdateOffreScreen
import ht.edu.ueh.foodsharemobile.ui.theme.FoodShareMobileTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            FoodShareMobileTheme {
                val navController = rememberNavController()

                val currentRoute = navController.currentBackStackEntryAsState()
                    .value
                    ?.destination
                    ?.route

                Scaffold(
                    bottomBar = {
                        if (currentRoute != "splash" && currentRoute != "login") {
                            BottomNavigationBar(navController)
                        }
                    }
                ) { innerPadding ->

                    NavHost(
                        navController = navController,
                        startDestination = "splash",
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable("splash") {
                            SplashScreen(navController = navController)
                        }

                        composable("login") {
                            LoginScreen(navController = navController)
                        }

                        composable("offres") {
                            OffreScreen(navController = navController)
                        }

                        composable("reservations") {
                            ReservationScreen()
                        }

                        composable("createOffre") {
                            CreateOffreScreen()
                        }

                        composable("offreDetail/{offreId}") { backStackEntry ->
                            val offreId = backStackEntry.arguments
                                ?.getString("offreId")
                                ?.toLongOrNull()

                            if (offreId != null) {
                                OffreDetailScreen(
                                    offreId = offreId,
                                    navController = navController
                                )
                            }
                        }

                        composable("updateOffre/{offreId}") { backStackEntry ->
                            val offreId = backStackEntry.arguments
                                ?.getString("offreId")
                                ?.toLongOrNull()

                            if (offreId != null) {
                                UpdateOffreScreen(
                                    offreId = offreId,
                                    navController = navController
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun BottomNavigationBar(navController: NavController) {
    val currentRoute = navController.currentBackStackEntryAsState()
        .value
        ?.destination
        ?.route

    NavigationBar(
        containerColor = Color(0xFF1F2933)
    ) {
        NavigationBarItem(
            selected = currentRoute == "offres",
            onClick = {
                navController.navigate("offres") {
                    launchSingleTop = true
                }
            },
            label = { Text("Offres") },
            icon = { Text("🍱") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = Color(0xFF4ADE80),
                selectedTextColor = Color(0xFF4ADE80),
                unselectedIconColor = Color(0xFF94A3B8),
                unselectedTextColor = Color(0xFF94A3B8),
                indicatorColor = Color(0xFF0F172A)
            )
        )

        NavigationBarItem(
            selected = currentRoute == "reservations",
            onClick = {
                navController.navigate("reservations") {
                    launchSingleTop = true
                }
            },
            label = { Text("Réservations") },
            icon = { Text("📋") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = Color(0xFF60A5FA),
                selectedTextColor = Color(0xFF60A5FA),
                unselectedIconColor = Color(0xFF94A3B8),
                unselectedTextColor = Color(0xFF94A3B8),
                indicatorColor = Color(0xFF0F172A)
            )
        )

        NavigationBarItem(
            selected = currentRoute == "createOffre",
            onClick = {
                navController.navigate("createOffre") {
                    launchSingleTop = true
                }
            },
            label = { Text("Créer") },
            icon = { Text("➕") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = Color(0xFFFBBF24),
                selectedTextColor = Color(0xFFFBBF24),
                unselectedIconColor = Color(0xFF94A3B8),
                unselectedTextColor = Color(0xFF94A3B8),
                indicatorColor = Color(0xFF0F172A)
            )
        )
    }
}