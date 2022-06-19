const Notification = require('../models/Notification')
const Patient = require('../models/Patient')
const { StatusCodes } = require('http-status-codes');


const createNotification = async(req, res) => {
    const { patientId, ...others } = req.body
    const newNotification = new Notification({
        ...others,
        patientId: req.user.userId
    });

    await newNotification.save();
    res.status(StatusCodes.CREATED).json({
        "data": newNotification,
        "msg": "Notification created successfully",
    });
}



const getNotification = async(req, res) => {
    const patientId = req.user.userId;
    const patient = await Patient.findById(patientId)
    const followings = patient.followings
    let patients = []
    for (let i = 0; i < followings.length; i++) {
        const lis = await Notification.find({ patientId: followings[i].toString() }).populate('patientId', 'username');
        //console.log(lis)
        patients = patients.concat(lis)
    }

    res.status(StatusCodes.OK).json({ "data": patients, msg: "success" });
};


const deleteNotification = async(req, res) => {

    const id = req.query.id;
    await Notification.findOneAndRemove({ drugUniqueId: id });
    res.status(StatusCodes.OK).json({ msg: "the notification is deleted succesfully" });



}




module.exports = {
    createNotification,
    deleteNotification,
    getNotification
};