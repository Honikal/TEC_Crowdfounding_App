import { Request, Response } from 'express';
import admin from '../../config/firebaseAdmin'; // Aquí importa tu conexión con Firebase

// Función para obtener todos los usuarios activos
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Accedemos a la colección 'users' y filtramos por 'activa' == true
    const usersSnapshot = await admin.firestore().collection('users').where('activa', '==', true).get();
    
    // Mapeamos los usuarios obtenidos a un array
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() // Incluye todos los campos de la base de datos
    }));
    
    // Respondemos con los usuarios obtenidos
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

// Función para activar o desactivar un usuario
export const toggleUserActive = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // ID del usuario
  const { activa } = req.body; // Nuevo estado de la cuenta (true o false)

  try {
    // Referencia al documento del usuario en la base de datos
    const userRef = admin.firestore().collection('users').doc(id); // Usamos admin.firestore() para acceder a la base de datos

    // Actualizamos el estado 'activa' del usuario
    await userRef.update({ activa });

    // Respondemos con un mensaje indicando que el estado del usuario fue actualizado
    res.status(200).json({ message: `La cuenta ha sido ${activa ? 'activada' : 'desactivada'}.` });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Error al actualizar el estado del usuario' });
  }
};
