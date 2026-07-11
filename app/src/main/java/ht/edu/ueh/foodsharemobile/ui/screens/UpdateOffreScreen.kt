package ht.ueh.foodsharemobile.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import ht.ueh.foodsharemobile.data.model.OffreRequest
import ht.ueh.foodsharemobile.session.SessionManager
import ht.ueh.foodsharemobile.viewmodel.OffreViewModel

@Composable
fun UpdateOffreScreen(
    offreId: Long,
    navController: NavHostController,
    viewModel: OffreViewModel = viewModel()
) {
    val offres by viewModel.offres.collectAsState()
    val offre = offres.find { it.id == offreId }
    val message by viewModel.message.collectAsState()

    if (offre == null) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF101820))
                .padding(16.dp)
        ) {
            Text(
                text = "Offre introuvable",
                color = Color.White
            )
        }
        return
    }

    var titre by remember { mutableStateOf(offre.titre) }
    var description by remember { mutableStateOf(offre.description) }
    var quantite by remember { mutableStateOf(offre.quantiteInitiale.toString()) }
    var prix by remember { mutableStateOf(offre.prix.toString()) }
    var lieu by remember { mutableStateOf(offre.lieu) }
    var debutRetrait by remember { mutableStateOf(offre.debutRetrait) }
    var finRetrait by remember { mutableStateOf(offre.finRetrait) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF101820))
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
                .verticalScroll(rememberScrollState())
        ) {
            Text(
                text = "Modifier Offre",
                color = Color.White,
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(20.dp))

            OutlinedTextField(
                value = titre,
                onValueChange = { titre = it },
                label = { Text("Titre") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedTextField(
                value = description,
                onValueChange = { description = it },
                label = { Text("Description") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedTextField(
                value = quantite,
                onValueChange = { quantite = it },
                label = { Text("Quantité") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedTextField(
                value = prix,
                onValueChange = { prix = it },
                label = { Text("Prix") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedTextField(
                value = lieu,
                onValueChange = { lieu = it },
                label = { Text("Lieu") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedTextField(
                value = debutRetrait,
                onValueChange = { debutRetrait = it },
                label = { Text("Début retrait") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedTextField(
                value = finRetrait,
                onValueChange = { finRetrait = it },
                label = { Text("Fin retrait") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(20.dp))

            Button(
                onClick = {
                    val currentUser = SessionManager.currentUser ?: return@Button

                    val request = OffreRequest(
                        titre = titre,
                        description = description,
                        quantiteInitiale = quantite.toIntOrNull() ?: 1,
                        prix = prix.toDoubleOrNull() ?: 0.0,
                        debutRetrait = debutRetrait,
                        finRetrait = finRetrait,
                        lieu = lieu,
                        offreurId = currentUser.id
                    )

                    viewModel.updateOffre(offre.id, request)

                    navController.navigate("offres") {
                        launchSingleTop = true
                    }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFF60A5FA)
                ),
                shape = RoundedCornerShape(6.dp)
            ) {
                Text("Modifier Offre")
            }

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedButton(
                onClick = {
                    navController.popBackStack()
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Annuler")
            }

            Spacer(modifier = Modifier.height(12.dp))

            if (message.isNotEmpty()) {
                Text(
                    text = message,
                    color = Color.White
                )
            }
        }
    }
}