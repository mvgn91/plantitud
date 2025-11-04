const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos desde la raíz
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Todas las rutas redirigen a index.html para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
