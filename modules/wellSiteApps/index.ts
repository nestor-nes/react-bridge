// Reexport the native module. On web, it will be resolved to NavigationModule.web.ts
// and on native platforms to NavigationModule.ts
export { default } from './src/NavigationModule';
export { default as NavigationModuleView } from './src/NavigationModuleView';
export * from  './src/NavigationModule.types';
