const { exec } = require('child_process');

exec('http-server', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error al iniciar el servidor: ${err}`);
    return;
  }
  console.log(`Servidor iniciado: ${stdout}`);
});
