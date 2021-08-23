const router = require('express').Router();
const adminController = require('../controllers/adminController');
const nodemailer = require('nodemailer');

// endpoint customer
router.get('/dashboard', adminController.viewDashboard);
router.get('/customer', adminController.viewCustomer);
router.post('/customer', adminController.addCustomer);
router.put('/customer', adminController.editCustomer);
router.delete('/customer/:id', adminController.deleteCustomer);

// endpoint download to excel
router.get('/download', adminController.download);


//setup sending email
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'aryandh.a.w@gmail.com',
        pass: 'w1npreneur',
    },
    secure: true // upgrades later with STARTTLS -- change this based on the PORT
});

router.post('/sendEmail', (req, res) => {
    const {to, subject, text} = req.body;
    const mailData = {
        to: to,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});
module.exports = router;