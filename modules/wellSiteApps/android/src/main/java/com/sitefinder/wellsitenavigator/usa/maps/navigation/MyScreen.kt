package com.sitefinder.wellsitenavigator.usa.maps.navigation

import android.widget.Toast
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp

@Composable
fun MyScreen(num1: Int, num2: Int, sum: Int) {
    val context = LocalContext.current

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "Jetpack Compose con Kotlin",
                style = MaterialTheme.typography.headlineMedium,
                modifier = Modifier.padding(bottom = 32.dp)
            )

            Text(
                text = "¡Hola desde Compose! 👋",
                style = MaterialTheme.typography.headlineLarge,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            Text(
                text = "num1: $num1, num2: $num2, suma: $sum",
                style = MaterialTheme.typography.bodyLarge,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            Button(
                onClick = {
                    Toast.makeText(
                        context,
                        "¡Botón de Compose presionado! 🎉",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            ) {
                Text("Mostrar Toast")
            }
        }
    }
}
