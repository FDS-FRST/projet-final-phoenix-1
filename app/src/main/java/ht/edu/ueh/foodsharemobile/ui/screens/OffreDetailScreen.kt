package ht.ueh.foodsharemobile.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import ht.ueh.foodsharemobile.session.SessionManager
import ht.ueh.foodsharemobile.viewmodel.OffreViewModel

@Composable
fun OffreDetailScreen(
    offreId: Long,
    navController: NavHostController,
    viewModel: OffreViewModel = viewModel()
) {
    val offres by viewModel.offres.collectAsState()
    val message by viewModel.message.collectAsState()
    val currentUser = SessionManager.currentUser

    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(message) {
        if (message.isNotEmpty()) {
            snackbarHostState.showSnackbar(message)
        }
    }

    val offre = offres.find { it.id == offreId }

    Scaffold(
        snackbarHost = {
            SnackbarHost(hostState = snackbarHostState)
        }
    ) { paddingValues ->

        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF101820))
                .padding(paddingValues)
        ) {
            if (offre == null) {
                Text(
                    text = "Offre introuvable",
                    color = Color.White,
                    modifier = Modifier.align(Alignment.Center)
                )
            } else {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp)
                ) {
                    Text(
                        text = "Détail de l'offre",
                        color = Color.White,
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = Color(0xFF1F2933)
                        )
                    ) {
                        Column(
                            modifier = Modifier.padding(16.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                verticalAlignment = Alignment.Top
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(52.dp)
                                        .clip(CircleShape)
                                        .background(Color(0xFFD8F3DC)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = "🍱",
                                        fontSize = 24.sp
                                    )
                                }

                                Spacer(modifier = Modifier.width(12.dp))

                                Column(
                                    modifier = Modifier.weight(1f)
                                ) {
                                    Text(
                                        text = offre.titre,
                                        color = Color.White,
                                        fontSize = 22.sp,
                                        fontWeight = FontWeight.Bold
                                    )

                                    Spacer(modifier = Modifier.height(6.dp))

                                    Text(
                                        text = offre.description,
                                        color = Color(0xFFCBD5E1),
                                        fontSize = 14.sp
                                    )
                                }

                                Text(
                                    text = if (offre.quantiteRestante > 0)
                                        "Disponible"
                                    else
                                        "Épuisé",
                                    color = if (offre.quantiteRestante > 0)
                                        Color(0xFFB7F7B0)
                                    else
                                        Color(0xFFFFCDD2),
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    modifier = Modifier
                                        .background(
                                            color = if (offre.quantiteRestante > 0)
                                                Color(0xFF1B5E20)
                                            else
                                                Color(0xFF7F1D1D),
                                            shape = RoundedCornerShape(8.dp)
                                        )
                                        .padding(horizontal = 8.dp, vertical = 5.dp)
                                )
                            }

                            Spacer(modifier = Modifier.height(18.dp))

                            DetailInfoRow(
                                label = "Prix",
                                value = "${offre.prix} TWD",
                                icon = "💵",
                                color = Color(0xFF4ADE80)
                            )

                            DetailInfoRow(
                                label = "Stock",
                                value = "${offre.quantiteRestante}",
                                icon = "📦",
                                color = Color(0xFF60A5FA)
                            )

                            DetailInfoRow(
                                label = "Lieu",
                                value = offre.lieu,
                                icon = "📍",
                                color = Color(0xFFA78BFA)
                            )

                            DetailInfoRow(
                                label = "Début retrait",
                                value = formatDateTime(offre.debutRetrait),
                                icon = "🕐",
                                color = Color(0xFFFBBF24)
                            )

                            DetailInfoRow(
                                label = "Fin retrait",
                                value = formatDateTime(offre.finRetrait),
                                icon = "🕑",
                                color = Color(0xFFFBBF24)
                            )

                            Spacer(modifier = Modifier.height(18.dp))

                            Divider(
                                color = Color(0xFF334155),
                                thickness = 1.dp
                            )

                            Spacer(modifier = Modifier.height(14.dp))

                            DetailActionButton(
                                text = if (offre.quantiteRestante > 0)
                                    "Réserver cette offre"
                                else
                                    "Stock épuisé",
                                icon = "🗓",
                                color = Color(0xFF4ADE80),
                                enabled = offre.quantiteRestante > 0,
                                modifier = Modifier.fillMaxWidth(),
                                onClick = {
                                    currentUser?.let {
                                        viewModel.reserver(offre.id, it.id)
                                    }
                                }
                            )

                            Spacer(modifier = Modifier.height(10.dp))

                            DetailActionButton(
                                text = "Retour aux offres",
                                icon = "⬅",
                                color = Color(0xFF60A5FA),
                                modifier = Modifier.fillMaxWidth(),
                                onClick = {
                                    navController.popBackStack()
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun DetailInfoRow(
    label: String,
    value: String,
    icon: String,
    color: Color
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 5.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = icon,
            color = color,
            fontSize = 16.sp
        )

        Spacer(modifier = Modifier.width(10.dp))

        Text(
            text = "$label : ",
            color = Color(0xFF94A3B8),
            fontSize = 13.sp,
            fontWeight = FontWeight.SemiBold
        )

        Text(
            text = value,
            color = Color(0xFFE2E8F0),
            fontSize = 13.sp
        )
    }
}

@Composable
fun DetailActionButton(
    text: String,
    icon: String,
    color: Color,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    onClick: () -> Unit
) {
    androidx.compose.material3.Surface(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier
            .height(42.dp)
            .border(
                width = 1.dp,
                brush = SolidColor(if (enabled) color else Color(0xFF64748B)),
                shape = RoundedCornerShape(4.dp)
            ),
        color = Color.Transparent,
        shape = RoundedCornerShape(4.dp)
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "$icon  $text",
                color = if (enabled) color else Color(0xFF64748B),
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                maxLines = 1
            )
        }
    }
}