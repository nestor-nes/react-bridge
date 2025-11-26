package com.sitefinder.wellsitenavigator.usa.maps.navigation

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Intent
import java.net.URL
import kotlin.concurrent.thread


data class Operacion(
    val numero1: Int,
    val numero2: Int,
    val operador: String,
    val resultado: Double,
    val timestamp: Long = System.currentTimeMillis()
) {
    fun toMap() = mapOf(
        "numero1" to numero1,
        "numero2" to numero2,
        "operador" to operador,
        "resultado" to resultado,
        "expresion" to "$numero1 $operador $numero2 = $resultado",
        "timestamp" to timestamp
    )
}

class NavigationModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('NavigationModule')` in JavaScript.
    Name("NavigationModule")

    // Defines constant property on the module.
    Constant("PI") {
      Math.PI
    }

    // Defines event names that the module can send to JavaScript.
    Events("onChange", "onDivisionProgreso", "onDivisionCompleta")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Opens a native Android Activity with two numbers to sum
    AsyncFunction("openActivity") { num1: Int, num2: Int ->
      val activity = appContext.currentActivity
      if (activity != null) {
        val intent = Intent(activity, MyCustomActivity::class.java)
        intent.putExtra("NUMBER_1", num1)
        intent.putExtra("NUMBER_2", num2)
        activity.startActivity(intent)
      }
    }

    AsyncFunction("calcularSuma") { num1: Int, num2: Int ->

      val resultado = num1 + num2.toDouble()
      val operacion = Operacion(
        numero1 = num1,
        numero2 = num2,
        operador = "+",
        resultado = resultado
      )
      

      operacion.toMap()
    }


    AsyncFunction("multiplicarConDelay") { num1: Int, num2: Int ->
      Thread.sleep(2000)
      val resultado = num1 * num2.toDouble()
      val operacion = Operacion(
        numero1 = num1,
        numero2 = num2,
        operador = "×",
        resultado = resultado
      )
      
      operacion.toMap()
    }


    Function("dividirConProgreso") { num1: Int, num2: Int ->
      thread {
        // Validar división por cero
        if (num2 == 0) {
          sendEvent("onDivisionCompleta", mapOf(
            "error" to "No se puede dividir por cero",
            "numero1" to num1,
            "numero2" to num2
          ))
          return@thread
        }
        
        for (i in 1..5) {
          Thread.sleep(500)
          sendEvent("onDivisionProgreso", mapOf(
            "paso" to i,
            "total" to 5,
            "porcentaje" to (i * 20),
            "mensaje" to "Procesando paso $i de 5..."
          ))
        }
        
        val resultado = num1.toDouble() / num2.toDouble()
        val operacion = Operacion(
          numero1 = num1,
          numero2 = num2,
          operador = "÷",
          resultado = resultado
        )
        
        sendEvent("onDivisionCompleta", operacion.toMap())
      }
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(NavigationModuleView::class) {
      // Defines a setter for the `url` prop.
      Prop("url") { view: NavigationModuleView, url: URL ->
        view.webView.loadUrl(url.toString())
      }
      // Defines an event that the view can send to JavaScript.
      Events("onLoad")
    }
  }
}
