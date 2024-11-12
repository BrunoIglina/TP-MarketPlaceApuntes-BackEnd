import { createAdministrador, updateAdministrador, getAdministradorByEmail, getAdministradorByNombreUsuario } from '../models/administrador.js';

class AdministradorController {
    constructor({ administradorModel }) {
        this.administradorModel = administradorModel;
    }

    create = async (req, res) => {
        const { nombre_usuario, nombre_apellido_alumno, email_usuario, telefono_usuario, contraseña_usuario } = req.body;

        try {

            const existingNombreUsuario = await getAdministradorByNombreUsuario(nombre_usuario);
            if (existingNombreUsuario) {
                return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
            }

            const existingEmail = await getAdministradorByEmail(email_usuario);
            if (existingEmail) {
                return res.status(400).json({ message: 'El correo ya está registrado.' });
            }

            
            const newAdministrador = await createAdministrador({
                nombre_usuario,
                nombre_apellido_alumno,
                email_usuario,
                telefono_usuario,
                contraseña_usuario,
                rol_usuario: 'Administrador',
            });

            res.status(201).json(newAdministrador);
        } catch (error) {
            console.error('Error al crear el administrador: ', error);
            res.status(500).json({ error: 'Error al crear el administrador' });
        }
    };

    update = async (req, res) => {
        const { id } = req.params;

        try {
            const updatedAdministrador = await updateAdministrador(id, req.body);
            res.json(updatedAdministrador);
        } catch (error) {
            console.error('Error en la actualización: ', error);
            res.status(500).json({ error: 'Error en la actualización del administrador.' });
        }
    };

    update = async (req, res) => {
        const { id } = req.params;

        try {
            const updatedAdministrador = await updateAdministrador(id, req.body);
            res.json(updatedAdministrador);
        } catch (error) {
            console.error('Error en la actualización: ', error);
            res.status(500).json({ error: 'Error en la actualización del administrador.' });
        }
    };

    get = async (req, res) => {
        const { email_usuario } = req.params;

        try {
            const administrador = await getAdministradorByEmail(email_usuario);
            if (!administrador) {
                return res.status(404).json({ error: 'Administrador no encontrado' });
            }
            res.status(200).json(administrador);
        } catch (error) {
            console.error('Error al obtener el administrador: ', error);
            res.status(500).json({ error: 'Error al obtener el administrador' });
        }
    };

    get = async (req, res) => {
        const { nombre_usuario } = req.params;

        try {
            const administrador = await getAdministradorByNombreUsuario (nombre_usuario);
            if (!administrador) {
                return res.status(404).json({ error: 'Administrador no encontrado' });
            }
            res.status(200).json(administrador);
        } catch (error) {
            console.error('Error al obtener el administrador: ', error);
            res.status(500).json({ error: 'Error al obtener el administrador' });
        }
    };

    
}

export default new AdministradorController({ administradorModel: { createAdministrador, updateAdministrador } });