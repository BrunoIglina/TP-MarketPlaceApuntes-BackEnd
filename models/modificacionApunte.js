import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize.js';
import moment from 'moment-timezone';


export const ModificacionApunteModel = sequelize.define('ModificacionApunte', {
  id_apunte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'apunte',
      key: 'id_apunte',
    },
  },
  fecha_hora_mod_apunte: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true,
  },
  descripcion_mod_apunte: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
}, {
  tableName: 'modificacion_apunte',
  timestamps: false,
});


export async function createModificacionApunte(idApunte, descripcion) {
  return ModificacionApunteModel.create({
    id_apunte: idApunte,
    fecha_hora_mod_apunte: moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss'),
    descripcion_mod_apunte: descripcion,
  });
}
