import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type NavigationModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
  onDivisionProgreso: (params: { paso: number; total: number; porcentaje: number; mensaje: string }) => void;
  onDivisionCompleta: (params: any) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type NavigationModuleViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
