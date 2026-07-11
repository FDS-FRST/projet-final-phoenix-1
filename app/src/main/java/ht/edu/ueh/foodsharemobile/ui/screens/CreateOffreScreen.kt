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
import ht.ueh.foodsharemobile.data.model.OffreRequest
import ht.ueh.foodsharemobile.session.SessionManager
import ht.ueh.foodsharemobile.viewmodel.OffreViewModel

@Composable
fun CreateOffreScreen(
    viewModel: OffreViewModel = viewModel()
) {

    var titre by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var quantite by remember { mutableStateOf("") }
    var prix by remember { mutableStateOf("") }
    var lieu by remember { mutableStateOf("") }

    val message by viewModel.message.collectAsState()

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
                text = "Créer une Offre",
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

            Spacer(modifier = Modifier.height(20.dp))

            Button(
                onClick = {

                    val currentUser =
                        SessionManager.currentUser ?: return@Button

                    val request = OffreRequest(
                        titre = titre,
                        description = description,
                        quantiteInitiale = quantite.toIntOrNull() ?: 0,
                        prix = prix.toDoubleOrNull() ?: 0.0,
                        debutRetrait = "2026-06-01T12:00:00",
                        finRetrait = "2026-06-01T14:00:00",
                        lieu = lieu,
                        offreurId = currentUser.id
                    )

                    viewModel.createOffre(request)
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFF22C55E)
                ),
                shape = RoundedCornerShape(6.dp)
            ) {
                Text("Créer Offre")
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