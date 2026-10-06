const dashboardRepository =
    require("../repositories/dashboardRepository");


const getDashboardData = async () => {

    const [totalPatients, todayAppointments, pending, confirmed] = await Promise.all([

        dashboardRepository.countPatients(),

        dashboardRepository.countTodayAppointments(),

        dashboardRepository
            .countAppointmentsByStatus("pending"),

        dashboardRepository
            .countAppointmentsByStatus("confirmed")
    ]);

    return {
        totalPatients,
        todayAppointments,
        pending,
        confirmed
    };
};


module.exports = { getDashboardData };