const dashboardService =require("../services/dashboardService");


const getDashboard = async (req, res) => {

    try {

        const dashboard =
            await dashboardService.getDashboardData();

        res.json(dashboard);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};


module.exports = { getDashboard };