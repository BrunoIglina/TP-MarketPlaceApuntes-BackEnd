import express from 'express';
import cors from 'cors';
import apunteRoutes from './routes/apunteRoutes.js';
import precioRoutes from './routes/precioRoutes.js';
import compraRoutes from './routes/compraRoutes.js';
import alumnoRoutes from './routes/alumnoRoutes.js';
import materiaRoutes from './routes/materiaRoutes.js';
import administradorRoutes from './routes/administradorRoutes.js';
import mercadoPagoRoutes from './routes/mercadoPagoRoutes.js'; 
import authControllerRoutes from './routes/authControllerRoutes.js';
import dotenv from 'dotenv';
import verifRoutes from './routes/verifRoutes.js';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/mercadopago', mercadoPagoRoutes);
app.use('/api/apuntes', apunteRoutes);
app.use('/api/precios', precioRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/administrador', administradorRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/auth', authControllerRoutes);
app.use('/api/verif', verifRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
