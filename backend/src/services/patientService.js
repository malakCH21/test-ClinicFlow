const patientRepository =
    require("../repositories/patientRepository");

const createPatient = async (data) => {
    return await patientRepository.create(data);
};

const getPatients = async (search, page, limit) => {
    const offset = (page - 1) * limit;

    const patients =
        await patientRepository.findAll(
            search,
            limit,
            offset
        );

    const total =
        await patientRepository.countAll(search);

    return {
        data: patients,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getPatientById = async (id) => {
    return await patientRepository.findById(id);
};

const updatePatient = async (id, data) => {
    return await patientRepository.updateById(
        id,
        data
    );
};

const deletePatient = async (id) => {
    return await patientRepository.deleteById(id);
};

module.exports = {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
};