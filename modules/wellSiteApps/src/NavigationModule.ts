import { NativeModule, requireNativeModule } from 'expo';

import { NavigationModuleEvents } from './NavigationModule.types';

export interface ResultadoOperacion {
  numero1: number;
  numero2: number;
  operador: string;
  resultado: number;
  expresion: string;
  timestamp: number;
}

export interface EventoDivisionProgreso {
  paso: number;
  total: number;
  porcentaje: number;
  mensaje: string;
}

export interface EventoDivisionCompleta extends ResultadoOperacion {
  error?: string;
}

declare class NavigationModule extends NativeModule<NavigationModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  openActivity(num1: number, num2: number): Promise<void>;
  calcularSuma(num1: number, num2: number): Promise<ResultadoOperacion>;
  multiplicarConDelay(num1: number, num2: number): Promise<ResultadoOperacion>;
  dividirConProgreso(num1: number, num2: number): void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<NavigationModule>('NavigationModule');
