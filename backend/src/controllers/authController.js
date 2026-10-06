const authService = require("../services/authService");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email et mot de passe obligatoires"
            });
        }

        const result = await authService.login(email, password);

        if (!result) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect"
            });
        }

        res.json({
            message: "Connexion réussie",
            token: result.token,
            user: result.user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};


const getMe = async (req, res) => {
    try {
        const user = await authService.getMe(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        res.json(user);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};


module.exports = {login,getMe};