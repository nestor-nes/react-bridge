package com.sitefinder.wellsitenavigator.usa.maps.navigation

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MyCustomActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Crear botón programáticamente
        val button = Button(this).apply {
            text = "Mostrar Toast"
            textSize = 18f
            setOnClickListener {
                Toast.makeText(
                    this@MyCustomActivity,
                    "¡Hola desde Kotlin! 👋",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
        
        setContentView(button)
    }
}
