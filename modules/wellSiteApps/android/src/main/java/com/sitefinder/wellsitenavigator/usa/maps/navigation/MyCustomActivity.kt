package com.sitefinder.wellsitenavigator.usa.maps.navigation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme

class MyCustomActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        val num1 = intent.getIntExtra("NUMBER_1", 0)
        val num2 = intent.getIntExtra("NUMBER_2", 0)
        val sum = num1 + num2
        setContent {
            MaterialTheme {
                MyScreen(num1 = num1, num2 = num2, sum = sum)
            }
        }
    }
}
