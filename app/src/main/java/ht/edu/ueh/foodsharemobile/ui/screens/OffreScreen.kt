package ht.ueh.foodsharemobile.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
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
fun OffreScreen(
    navController: NavHostController,
    viewModel: OffreViewModel = viewModel()
) {
    val offres by viewModel.offres.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val error by viewModel.error.collectAsState()
    val message by viewModel.message.collectAsState()

    val currentUser = SessionManager.currentUser
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(message) {
        if (message.isNotEmpty()) {
            snackbarHostState.showSnackbar(message)
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(hostState = snackbarHostState) }
    ) { paddingValues ->

        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF101820))
                .padding(paddingValues)
        ) {
            when {
                isLoading -> CircularProgressIndicator(
                    modifier = Modifier.align(Alignment.Center)
                )

                error != null -> Text(
                    text = "Erè: $error",
                    color = Color.White,
                    modifier = Modifier.align(Alignment.Center)
                )

                offres.isEmpty() -> Text(
                    text = "Pa gen okenn offre pou montre",
                    color = Color.White,
                    modifier = Modifier.align(Alignment.Center)
                )

                else -> Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(12.dp)
                ) {
                    Text(
                        text = "Offres disponibles",
                        color = Color.White,
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    LazyColumn {
                        items(offres) { offre ->

                            var showDeleteDialog by remember { mutableStateOf(false) }

                            Card(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(bottom = 12.dp),
                                shape = RoundedCornerShape(14.dp),
                                colors = CardDefaults.cardColors(
                                    containerColor = Color(0xFF1F2933)
                                )
                            ) {
                                Column(modifier = Modifier.padding(14.dp)) {

                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        verticalAlignment = Alignment.Top
                                    ) {
                                        Box(
                                            modifier = Modifier
                                                .size(46.dp)
                                                .clip(CircleShape)
                                                .background(Color(0xFFD8F3DC)),
                                            contentAlignment = Alignment.Center
                                        ) {
                                            Text("🍱", fontSize = 22.sp)
                                        }

                                        Spacer(modifier = Modifier.width(12.dp))

                                        Column(modifier = Modifier.weight(1f)) {
                                            Text(
                                                text = offre.titre,
                                                color = Color.White,
                                                fontSize = 18.sp,
                                                fontWeight = FontWeight.Bold
                                            )

                                            Spacer(modifier = Modifier.height(3.dp))

                                            Text(
                                                text = offre.description,
                                                color = Color(0xFFCBD5E1),
                                                fontSize = 12.sp
                                            )
                                        }

                                        Text(
                                            text = if (offre.quantiteRestante > 0) "Disponible" else "Épuisé",
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

                                    Spacer(modifier = Modifier.height(12.dp))

                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween
                                    ) {
                                        SmallInfo("💵", "${offre.prix} $ ", Color(0xFF4ADE80))
                                        SmallInfo("📦", "${offre.quantiteRestante}", Color(0xFF60A5FA))
                                        SmallInfo("📍", offre.lieu, Color(0xFFA78BFA))
                                    }

                                    Spacer(modifier = Modifier.height(9.dp))

                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween
                                    ) {
                                        Text(
                                            text = "🗓 Début : ${formatDateTime(offre.debutRetrait)}",
                                            color = Color(0xFFE2E8F0),
                                            fontSize = 10.sp
                                        )

                                        Text(
                                            text = "Fin : ${formatDateTime(offre.finRetrait)}",
                                            color = Color(0xFFE2E8F0),
                                            fontSize = 10.sp
                                        )
                                    }

                                    Spacer(modifier = Modifier.height(12.dp))

                                    Divider(
                                        color = Color(0xFF334155),
                                        thickness = 1.dp
                                    )

                                    Spacer(modifier = Modifier.height(10.dp))

                                    Column(modifier = Modifier.fillMaxWidth()) {
                                        Row(
                                            modifier = Modifier.fillMaxWidth(),
                                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                                        ) {
                                            ActionButton(
                                                text = if (offre.quantiteRestante > 0) "Réserver" else "Épuisé",
                                                icon = "🗓",
                                                color = Color(0xFF4ADE80),
                                                enabled = offre.quantiteRestante > 0,
                                                modifier = Modifier.weight(1f),
                                                onClick = {
                                                    currentUser?.let {
                                                        viewModel.reserver(offre.id, it.id)
                                                    }
                                                }
                                            )

                                            ActionButton(
                                                text = "Voir détail",
                                                icon = "👁",
                                                color = Color(0xFF60A5FA),
                                                modifier = Modifier.weight(1f),
                                                onClick = {
                                                    navController.navigate("offreDetail/${offre.id}")
                                                }
                                            )
                                        }

                                        Spacer(modifier = Modifier.height(8.dp))

                                        Row(
                                            modifier = Modifier.fillMaxWidth(),
                                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                                        ) {
                                            ActionButton(
                                                text = "Modifier",
                                                icon = "✏",
                                                color = Color(0xFFFBBF24),
                                                modifier = Modifier.weight(1f),
                                                onClick = {
                                                    navController.navigate("updateOffre/${offre.id}")
                                                }
                                            )

                                            ActionButton(
                                                text = "Supprimer",
                                                icon = "🗑",
                                                color = Color(0xFFF87171),
                                                modifier = Modifier.weight(1f),
                                                onClick = {
                                                    showDeleteDialog = true
                                                }
                                            )
                                        }
                                    }
                                }
                            }

                            if (showDeleteDialog) {
                                AlertDialog(
                                    onDismissRequest = { showDeleteDialog = false },
                                    title = { Text("Supprimer cette offre ?") },
                                    text = { Text("Cette action est irréversible.") },
                                    confirmButton = {
                                        Button(
                                            onClick = {
                                                viewModel.deleteOffre(offre.id)
                                                showDeleteDialog = false
                                            }
                                        ) {
                                            Text("Oui, supprimer")
                                        }
                                    },
                                    dismissButton = {
                                        OutlinedButton(
                                            onClick = { showDeleteDialog = false }
                                        ) {
                                            Text("Annuler")
                                        }
                                    }
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
fun SmallInfo(
    icon: String,
    text: String,
    color: Color
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(
            text = icon,
            color = color,
            fontSize = 13.sp
        )

        Spacer(modifier = Modifier.width(4.dp))

        Text(
            text = text,
            color = Color(0xFFCBD5E1),
            fontSize = 12.sp,
            maxLines = 1
        )
    }
}

@Composable
fun ActionButton(
    text: String,
    icon: String,
    color: Color,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier
            .height(38.dp)
            .border(
                width = 1.dp,
                brush = SolidColor(if (enabled) color else Color(0xFF64748B)),
                shape = RoundedCornerShape(3.dp)
            ),
        color = Color.Transparent,
        shape = RoundedCornerShape(3.dp)
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "$icon  $text",
                color = if (enabled) color else Color(0xFF64748B),
                fontSize = 11.sp,
                fontWeight = FontWeight.SemiBold,
                maxLines = 1
            )
        }
    }
}

fun formatDateTime(value: String): String {
    return value
        .replace("T", " ")
        .dropLast(3)
}