package ht.ueh.foodsharemobile.ui.screens

import android.text.format.DateUtils.formatDateTime
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import ht.ueh.foodsharemobile.session.SessionManager
import ht.ueh.foodsharemobile.viewmodel.OffreViewModel

@Composable
fun ReservationScreen(
    viewModel: OffreViewModel = viewModel()
) {
    val reservations by viewModel.reservations.collectAsState()
    val currentUser = SessionManager.currentUser

    LaunchedEffect(currentUser?.id) {
        currentUser?.let {
            viewModel.loadReservations(it.id)
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF101820))
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(12.dp)
        ) {
            Text(
                text = "Mes Réservations",
                color = Color.White,
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(14.dp))

            if (reservations.isEmpty()) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Aucune réservation pour le moment.",
                        color = Color(0xFFCBD5E1),
                        fontSize = 14.sp
                    )
                }
            } else {
                LazyColumn {
                    items(reservations) { reservation ->

                        val statusColor = when (reservation.statut) {
                            "EN_ATTENTE" -> Color(0xFFFFA000)
                            "RETIREE" -> Color(0xFF2E7D32)
                            "NON_RETIREE" -> Color(0xFFC62828)
                            else -> Color.Gray
                        }

                        val statusText = when (reservation.statut) {
                            "EN_ATTENTE" -> "En attente"
                            "RETIREE" -> "Retirée"
                            "NON_RETIREE" -> "Non retirée"
                            else -> reservation.statut
                        }

                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(bottom = 12.dp),
                            shape = RoundedCornerShape(14.dp),
                            colors = CardDefaults.cardColors(
                                containerColor = Color(0xFF1F2933)
                            )
                        ) {
                            Column(
                                modifier = Modifier.padding(14.dp)
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    verticalAlignment = Alignment.Top
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .size(46.dp)
                                            .clip(CircleShape)
                                            .background(Color(0xFFE0F2FE)),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Text(
                                            text = "📋",
                                            fontSize = 22.sp
                                        )
                                    }

                                    Spacer(modifier = Modifier.width(12.dp))

                                    Column(
                                        modifier = Modifier.weight(1f)
                                    ) {
                                        Text(
                                            text = reservation.titreOffre,
                                            color = Color.White,
                                            fontSize = 18.sp,
                                            fontWeight = FontWeight.Bold
                                        )

                                        Spacer(modifier = Modifier.height(4.dp))

                                        Text(
                                            text = "Étudiant : ${reservation.nomEtudiant}",
                                            color = Color(0xFFCBD5E1),
                                            fontSize = 12.sp
                                        )
                                    }

                                    Text(
                                        text = statusText,
                                        color = Color.White,
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.SemiBold,
                                        modifier = Modifier
                                            .background(
                                                color = statusColor,
                                                shape = RoundedCornerShape(8.dp)
                                            )
                                            .padding(horizontal = 8.dp, vertical = 5.dp)
                                    )
                                }

                                Spacer(modifier = Modifier.height(12.dp))

                                Text(
                                    text = "🕐 Date réservation : ${formatDateTime(reservation.dateReservation)}",
                                    color = Color(0xFFE2E8F0),
                                    fontSize = 12.sp
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

