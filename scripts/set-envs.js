const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environment = {
  mapbox_kex: "${ process.env['MAPBOX_key'] }",
  "OTRA_PROPIEDAD": "Contenido"
}
`;

// Crear la carpeta
mkdirSync('./src/environments', { recursive: true });
// Crear el archivo
writeFileSync(targetPath, envFileContent);

