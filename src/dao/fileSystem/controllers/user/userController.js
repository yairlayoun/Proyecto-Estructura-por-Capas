// controllers/userController.js
import { renderProfile } from '../../../../views/userView.js';

const showProfile = (req, res) => {
  try {
    const user = req.session.user;

    if (!user) {
      // Si el usuario no está autenticado, redirige al login u otra acción
      return res.redirect('/login');
    }

    const profileData = renderProfile(user);
    console.log(profileData);
    res.render('index', { user: profileData });
  } catch (error) {
    console.error("Error en showProfile controller", error);
    res.status(500).json({ error: 'Error al mostrar el perfil', message: error.message });
  }
};

export { showProfile };
