import { Op, Model, DataTypes } from 'sequelize';
import moment from 'moment-timezone';
import { sequelize } from './sequelize.js';
import dotenv from 'dotenv';
import { validateApunte, validatePartialApunte } from '../schemas/apunte.js';
import { createModificacionApunte } from './modificacionApunte.js';
import { Alumno, updateSancion } from './alumno.js';

dotenv.config();

export const ApunteModel = sequelize.define('Apunte', {
  id_apunte: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo_apunte: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  descripcion_apunte: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  calificacion_apunte: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha_hora_publicacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  numero_alumno: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cod_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  archivo_apunte: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  archivo_caratula: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  estado_apunte: {
    type: DataTypes.STRING(1),
    allowNull: false,
    defaultValue: 'N',
  }
}, {
  tableName: 'apunte',
  timestamps: false,
});

export async function createApunte(data) {
  const { error } = validateApunte(data);
  if (error) {
    throw new Error(error.details.map(err => err.message).join(', '));
  }
  if (!data.estado_apunte) {
    data.estado_apunte = 'A';
}
  data.fecha_hora_publicacion = moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
  return ApunteModel.create(data); 

}

export async function getAllApuntes() {
  return ApunteModel.findAll({
    where: { estado_apunte: 'A' },
  });
}


export async function getApunteByIdAlumno(idAlumno) {
  try {
    const apuntes = await ApunteModel.findAll({
      attributes: { exclude: ['archivo_apunte'] }, 
      where: { 
        numero_alumno: idAlumno,
        estado_apunte: 'A' },
      order: [['fecha_hora_publicacion', 'DESC']],
    });

    if (!apuntes || apuntes.length === 0) {
      return []; 
    }

    return apuntes.map(apunte => ({
      ...apunte.dataValues,
      archivo_caratula: apunte.archivo_caratula 
        ? `data:image/png;base64,${Buffer.from(apunte.archivo_caratula).toString('base64')}` 
        : null,
    }));
  } catch (error) {
    console.error('Error en getApunteByIdAlumno:', error);
    throw new Error('Error al obtener los apuntes del alumno');
  }
}


export async function getApunteByIdMateria(idMateria) {
  try {
    const apuntes = await ApunteModel.findAll({
      attributes: { exclude: ['archivo_apunte'] }, 
      where: { 
        cod_materia: idMateria,
        estado_apunte: 'A' },
      order: [['calificacion_apunte', 'DESC']],
    });

    return apuntes.map(apunte => ({
      ...apunte.dataValues,
      archivo_caratula: apunte.archivo_caratula 
        ? `data:image/png;base64,${Buffer.from(apunte.archivo_caratula).toString('base64')}` 
        : null,
    }));
  } catch (error) {
    console.error('Error en getApunteByIdMateria:', error);
    throw new Error('Error al obtener los apuntes de la materia');
  }
}


export async function getApunteById(id) {
  try {
    const apunte = await ApunteModel.findByPk(id);

    if (!apunte) {
      throw new Error('Apunte no encontrado');
    }

    return {
      ...apunte.dataValues,
      archivo_apunte: apunte.archivo_apunte 
        ? Buffer.from(apunte.archivo_apunte).toString('base64') 
        : null,
      archivo_caratula: apunte.archivo_caratula 
        ? `data:image/png;base64,${Buffer.from(apunte.archivo_caratula).toString('base64')}` 
        : null,
    };
  } catch (error) {
    console.error('Error en getApunteById:', error);
    throw new Error('Error al obtener el apunte por ID');
  }
}


export async function updateApunte(id, data, descripcionModificacion) {
  const { error } = validatePartialApunte(data);
  if (error) {
      throw new Error(error.details.map(err => err.message).join(', '));
  }

  const apunte = await ApunteModel.findByPk(id);
  if (!apunte) {
      throw new Error('Apunte no encontrado');
  }


  const updatedApunte = await apunte.update(data);


  await createModificacionApunte(id, descripcionModificacion);

  return updatedApunte;
}

export async function deleteApunte(id, numeroAdmin) {
  console.log(`deleteApunte called with id: ${id} and numeroAdmin: ${numeroAdmin}`);
  const apunte = await ApunteModel.findByPk(id);
  
  if (apunte) {
    console.log(`Apunte found: ${JSON.stringify(apunte)}`);
    const alumno = await Alumno.findByPk(apunte.numero_alumno); 
    if (alumno) {
      console.log(`Alumno found: ${JSON.stringify(alumno)}`);
      await updateSancion(alumno.numero_usuario, numeroAdmin); 
    } else {
      console.log('Alumno not found');
    }
    await apunte.update( {estado_apunte: 'N' });
    return true;
  }
  console.log('Apunte not found');
  throw new Error('Apunte no encontrado');
}

export async function deleteApunteByUser(id) {
  console.log(`deleteApunte called with id: ${id}`);
  const apunte = await ApunteModel.findByPk(id);
  
    await apunte.update( {estado_apunte: 'N' });
    return true;

}

(async () => {
  try {
    await sequelize.sync();
    console.log('Modelo sincronizado con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar el modelo con la base de datos:', error);
  }
})();
