const router = require('express').Router();
const {
    createMedication,
    getMedication,
    getAllMedications,
    updateMedication,
    deleteMedication,
    addMedicationDrug,
    deleteMedicationDrug,
    getFollowingMedication,
    getMedicationsByPatientId
} = require('../controllers/Medication.js');
const { isDoctor, isPatient, authenticateUser, isPatientorDoctor } = require('../middleware/authentication.js')
router.route('/createMedication').post(authenticateUser, isPatientorDoctor, createMedication);
router.route('/getMedication').get(authenticateUser, isPatientorDoctor, getMedication);
router.route('/getAllMedications').get(authenticateUser, getAllMedications);
router.route('/updateMedication').patch(authenticateUser, isPatientorDoctor, updateMedication);
router.route('/addMedicationDrug').patch(authenticateUser, isPatientorDoctor, addMedicationDrug);
router.route('/deleteMedicationDrug').patch(authenticateUser, isPatientorDoctor, deleteMedicationDrug);
router.route('/deleteMedication').delete(authenticateUser, isPatientorDoctor, deleteMedication);
router.route('/getFollowingMedication').get(authenticateUser, isPatient, getFollowingMedication);
router.route('/getMedicationsByPatientId').get(authenticateUser, isPatientorDoctor, getMedicationsByPatientId);




module.exports = router;