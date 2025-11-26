import { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import NavigationModule, { EventoDivisionCompleta, EventoDivisionProgreso, ResultadoOperacion } from '@/modules/wellSiteApps';

export default function HomeScreen() {
  const [num1, setNum1] = useState('5');
  const [num2, setNum2] = useState('3');
  const [resultadoSuma, setResultadoSuma] = useState<ResultadoOperacion | null>(null);
  const [resultadoMultiplicacion, setResultadoMultiplicacion] = useState<ResultadoOperacion | null>(null);
  const [calculando, setCalculando] = useState(false);
  const [resultadoDivision, setResultadoDivision] = useState<EventoDivisionCompleta | null>(null);
  const [progresoDivision, setProgresoDivision] = useState<EventoDivisionProgreso | null>(null);
  const [dividiendo, setDividiendo] = useState(false);

  const handleOpenNativeActivity = async () => {
    try {
      const n1 = parseInt(num1) || 0;
      const n2 = parseInt(num2) || 0;
      await NavigationModule.openActivity(n1, n2);
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la actividad nativa');
      console.error(error);
    }
  };

  const handleCalcularSuma = async () => {
    try {
      const n1 = parseInt(num1) || 0;
      const n2 = parseInt(num2) || 0;
      const resultado = await NavigationModule.calcularSuma(n1, n2);
      setResultadoSuma(resultado);
    } catch (error) {
      Alert.alert('Error', 'No se pudo calcular la suma');
      console.error(error);
    }
  };

  const handleMultiplicar = async () => {
    setCalculando(true);
    try {
      const n1 = parseInt(num1) || 0;
      const n2 = parseInt(num2) || 0;
      const resultado = await NavigationModule.multiplicarConDelay(n1, n2);
      setResultadoMultiplicacion(resultado);
    } catch (error) {
      Alert.alert('Error', 'No se pudo calcular la multiplicación');
      console.error(error);
    } finally {
      setCalculando(false);
    }
  };

  useEffect(() => {
    const subProgreso = NavigationModule.addListener('onDivisionProgreso', (event: EventoDivisionProgreso) => {
      setProgresoDivision(event);
    });

    const subCompleta = NavigationModule.addListener('onDivisionCompleta', (event: EventoDivisionCompleta) => {
      setResultadoDivision(event);
      setDividiendo(false);
      setProgresoDivision(null);
      
      if (event.error) {
        Alert.alert('Error', event.error);
      }
    });

    return () => {
      subProgreso.remove();
      subCompleta.remove();
    };
  }, []);

  const handleDividir = () => {
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;
    
    setDividiendo(true);
    setResultadoDivision(null);
    setProgresoDivision(null);
    
    NavigationModule.dividirConProgreso(n1, n2);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calculadora Nativa Kotlin + React</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Clase a Map</ThemedText>
        <ThemedText>
          Kotlin usa una clase internamente y la convierte a Map para enviarte el resultado.
        </ThemedText>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={num1}
            onChangeText={setNum1}
            keyboardType="numeric"
            placeholder="Primer número"
          />
          <ThemedText style={styles.plusSign}>+</ThemedText>
          <TextInput
            style={styles.input}
            value={num2}
            onChangeText={setNum2}
            keyboardType="numeric"
            placeholder="Segundo número"
          />
        </View>
        <Button 
          title="Calcular Suma" 
          onPress={handleCalcularSuma}
        />
        {resultadoSuma && (
          <View style={styles.resultadoContainer}>
            <ThemedText type="defaultSemiBold" style={styles.resultadoTitle}>
              Resultado:
            </ThemedText>
            <ThemedText>Expresión: {resultadoSuma.expresion}</ThemedText>
            <ThemedText>Resultado: {resultadoSuma.resultado}</ThemedText>
            <ThemedText>Operador: {resultadoSuma.operador}</ThemedText>
            <ThemedText>Timestamp: {new Date(resultadoSuma.timestamp).toLocaleTimeString()}</ThemedText>
          </View>
        )}
      </ThemedView>



      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Callback a Promise</ThemedText>
        <ThemedText>
           Espera 2 segundos sin congelar la UI.
        </ThemedText>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={num1}
            onChangeText={setNum1}
            keyboardType="numeric"
            placeholder="Primer número"
          />
          <ThemedText style={styles.plusSign}>×</ThemedText>
          <TextInput
            style={styles.input}
            value={num2}
            onChangeText={setNum2}
            keyboardType="numeric"
            placeholder="Segundo número"
          />
        </View>
        <Button 
          title={calculando ? "Calculando... ⏳" : "Multiplicar (2s delay)"}
          onPress={handleMultiplicar}
          disabled={calculando}
        />
        {resultadoMultiplicacion && (
          <View style={styles.resultadoContainer}>
            <ThemedText type="defaultSemiBold" style={styles.resultadoTitle}>
              Resultado:
            </ThemedText>
            <ThemedText>Expresión: {resultadoMultiplicacion.expresion}</ThemedText>
            <ThemedText>Resultado: {resultadoMultiplicacion.resultado}</ThemedText>
            <ThemedText>⏱️ Tomó 2 segundos (sin congelar UI)</ThemedText>
          </View>
        )}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle"> Callback a Events</ThemedText>
        <ThemedText>
          Function envía múltiples eventos. JavaScript escucha con listeners en tiempo real.
        </ThemedText>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={num1}
            onChangeText={setNum1}
            keyboardType="numeric"
            placeholder="Primer número"
          />
          <ThemedText style={styles.plusSign}>÷</ThemedText>
          <TextInput
            style={styles.input}
            value={num2}
            onChangeText={setNum2}
            keyboardType="numeric"
            placeholder="Segundo número"
          />
        </View>
        <Button 
          title={dividiendo ? "Dividiendo... 🔄" : "Dividir (con progreso)"}
          onPress={handleDividir}
          disabled={dividiendo}
        />
        {progresoDivision && (
          <View style={styles.progresoContainer}>
            <ThemedText type="defaultSemiBold" style={styles.progresoTitle}>
              Progreso: {progresoDivision.porcentaje}%
            </ThemedText>
            <ThemedText>{progresoDivision.mensaje}</ThemedText>
            <ThemedText>Paso {progresoDivision.paso}/{progresoDivision.total}</ThemedText>
          </View>
        )}
        {resultadoDivision && !resultadoDivision.error && (
          <View style={styles.resultadoContainer}>
            <ThemedText type="defaultSemiBold" style={styles.resultadoTitle}>
              Resultado:
            </ThemedText>
            <ThemedText>Expresión: {resultadoDivision.expresion}</ThemedText>
            <ThemedText>Resultado: {resultadoDivision.resultado}</ThemedText>
            <ThemedText>📡 Recibió 5 eventos de progreso</ThemedText>
          </View>
        )}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Abrir Activity Nativa</ThemedText>
        <ThemedText>
          O abre una pantalla nativa de Android con Compose.
        </ThemedText>
        <Button 
          title="Abrir Activity 🚀" 
          onPress={handleOpenNativeActivity}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  plusSign: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  resultadoTitle: {
    marginBottom: 8,
    color: '#2e7d32',
  },
  progresoContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fff3e0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  progresoTitle: {
    marginBottom: 8,
    color: '#e65100',
  },
});
