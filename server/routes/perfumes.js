const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const Perfume = require('../models/perfume.model');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

// GET all perfumes (Public - No change)
router.route('/').get((req, res) => {
    Perfume.find()
        .then(perfumes => res.json(perfumes))
        .catch(err => res.status(400).json('Error: ' + err));
});

// ADD a new perfume (Protected)
router.route('/add').post(auth, authAdmin, upload.single('image'), (req, res) => {
    const { name, brand, description, price } = req.body;
    const imageUrl = req.file.path;
    const newPerfume = new Perfume({ name, brand, description, price: Number(price), imageUrl });
    newPerfume.save()
        .then(() => res.json('Perfume added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE a perfume (Protected)
router.route('/:id').delete(auth, authAdmin, (req, res) => {
    Perfume.findByIdAndDelete(req.params.id)
        .then(perfume => {
            if (perfume && perfume.imageUrl) {
                fs.unlink(perfume.imageUrl, (err) => {
                    if (err) console.error("Error deleting old image:", err);
                });
            }
            res.json('Perfume deleted.');
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE a perfume by ID (Protected)
router.route('/update/:id').put(auth, authAdmin, upload.single('image'), (req, res) => {
    Perfume.findById(req.params.id)
        .then(perfume => {
            perfume.name = req.body.name;
            perfume.brand = req.body.brand;
            perfume.description = req.body.description;
            perfume.price = Number(req.body.price);

            if (req.file) {
                if (perfume.imageUrl) {
                    fs.unlink(perfume.imageUrl, (err) => {
                        if (err) console.error("Error deleting old image:", err);
                    });
                }
                perfume.imageUrl = req.file.path;
            }

            perfume.save()
                .then(() => res.json('Perfume updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;