import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './NavigationModule.types';

type NavigationModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class NavigationModule extends NativeModule<NavigationModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(NavigationModule, 'NavigationModule');
