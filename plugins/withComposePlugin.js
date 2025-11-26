const { withProjectBuildGradle } = require('@expo/config-plugins');


const withComposePlugin = (config) => {
  return withProjectBuildGradle(config, (config) => {
    const composeClasspath = "classpath('org.jetbrains.kotlin:compose-compiler-gradle-plugin:2.1.20')";
    

    if (!config.modResults.contents.includes(composeClasspath)) {

      config.modResults.contents = config.modResults.contents.replace(
        /classpath\('org\.jetbrains\.kotlin:kotlin-gradle-plugin'\)/,
        `classpath('org.jetbrains.kotlin:kotlin-gradle-plugin')\n    ${composeClasspath}`
      );
    }
    
    return config;
  });
};

module.exports = withComposePlugin;
