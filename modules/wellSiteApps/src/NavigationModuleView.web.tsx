import * as React from 'react';

import { NavigationModuleViewProps } from './NavigationModule.types';

export default function NavigationModuleView(props: NavigationModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
