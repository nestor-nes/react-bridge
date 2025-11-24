import { NativeModule, requireNativeModule } from 'expo';

import { NavigationModuleEvents } from './NavigationModule.types';

declare class NavigationModule extends NativeModule<NavigationModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  openActivity(): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<NavigationModule>('NavigationModule');
