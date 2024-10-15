const express = require('express');
const cors = require('cors');
const apunteRoutes = require('./routes/apunteRoutes');
const precioRoutes = require('./routes/precioRoutes');
const compraRoutes = require('./routes/compraRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/apuntes', apunteRoutes);
app.use('/api/precios', precioRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/alumnos', alumnoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
