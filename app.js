
import express from 'express';
import cors from 'cors';
import apunteRoutes from './routes/apunteRoutes.js';
import precioRoutes from './routes/precioRoutes.js';
import compraRoutes from './routes/compraRoutes.js';
import alumnoRoutes from './routes/alumnoRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/apuntes', apunteRoutes);
app.use('/api/precios', precioRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/alumnos', alumnoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Servidor corriendo en http://localhost:${PORT});
});