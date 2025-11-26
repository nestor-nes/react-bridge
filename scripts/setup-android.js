const fs = require('fs');
const path = require('path');
const os = require('os');

const androidHome = process.env.ANDROID_HOME || 
                    path.join(os.homedir(), 'Library', 'Android', 'sdk');

const localPropertiesPath = path.join(__dirname, '..', 'android', 'local.properties');

if (!fs.existsSync(path.join(__dirname, '..', 'android'))) {
    console.log('⚠️  Carpeta android/ no existe. Ejecuta primero: npx expo prebuild');
    process.exit(1);
}

if (!fs.existsSync(androidHome)) {
    console.error('❌ Android SDK no encontrado en:', androidHome);
    console.error('\n💡 Soluciones:');
    console.error('   1. Instala Android Studio y el SDK');
    console.error('   2. O configura ANDROID_HOME:');
    console.error('      export ANDROID_HOME=/ruta/a/tu/sdk');
    console.error('      source ~/.zshrc');
    process.exit(1);
}

const content = `# Este archivo es generado automáticamente por scripts/setup-android.js
# No es necesario versionarlo en Git (está en .gitignore)
sdk.dir=${androidHome}
`;

try {
    fs.writeFileSync(localPropertiesPath, content, 'utf8');
    console.log('✅ local.properties creado exitosamente');
    console.log('   Ubicación:', localPropertiesPath);
    console.log('   sdk.dir:', androidHome);
} catch (error) {
    console.error('❌ Error al crear local.properties:', error.message);
    process.exit(1);
}
