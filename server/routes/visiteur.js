const express = require('express');
const router = express.Router();
const visiteurController = require('../controllers/visiteurController')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const { requireAuth } = require('../config/auth');

const checkLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt; // Assuming you're using cookie-parser middleware

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error(err.message);
                res.locals.user = null;
                next(); // Call next middleware
            } else {
                res.locals.user = decodedToken.id;
                next(); // Call next middleware
            }
        });
    } else {
        res.locals.user = null;
        next(); // Call next middleware
    }
};
const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage })


router.get('/', checkLoggedIn,visiteurController.page_accueil); 
router.get('/clubs', checkLoggedIn,visiteurController.equipes); 
router.get('/club/:id', checkLoggedIn,visiteurController.club); 
router.get('/classement', checkLoggedIn,visiteurController.classement); 
router.get('/classement_u19', checkLoggedIn, visiteurController.classementu19); 
router.get('/classement_u17',checkLoggedIn, visiteurController.classementu17);
router.get('/classement_u15',checkLoggedIn, visiteurController.classementu15);
router.get('/calendrier',checkLoggedIn,visiteurController.calendrier); 
router.get('/calendrier_precedent',checkLoggedIn,visiteurController.calendrier_precedent); 
router.get('/calendrier_u19',checkLoggedIn, visiteurController.calendrieru19);
router.get('/calendrier_precedent_u19',checkLoggedIn, visiteurController.calendrier_precedent_u19);
router.get('/calendrier_u17', checkLoggedIn,visiteurController.calendrieru17); 
router.get('/calendrier_precedent_u17',checkLoggedIn, visiteurController.calendrier_precedent_u17);
router.get('/calendrier_u15', checkLoggedIn,visiteurController.calendrieru15);  
router.get('/calendrier_precedent_u15',checkLoggedIn, visiteurController.calendrier_precedent_u15);
router.get('/match/:id', checkLoggedIn,visiteurController.match); 
router.get('/actualite', checkLoggedIn,visiteurController.actualite); 
router.get('/article/:id',checkLoggedIn, visiteurController.article); 
router.get('/joueur/:id', checkLoggedIn,visiteurController.joueur); 
router.get('/club_junior_u19', checkLoggedIn,visiteurController.u19)
router.get('/club_junior_u17', checkLoggedIn,visiteurController.u17)
router.get('/club_junior_u15',checkLoggedIn, visiteurController.u15)
router.get('/stats', checkLoggedIn,visiteurController.stats)
router.get('/stats/assists', checkLoggedIn,visiteurController.assists)
router.post('/chercher',checkLoggedIn, visiteurController.recherche)
router.get('/profil',checkLoggedIn,visiteurController.profil)
router.put('/profil',upload.single('photo_user'),checkLoggedIn,visiteurController.profilpost)
router.post('/commentaire/:id',checkLoggedIn,visiteurController.commentaire)




module.exports = router;   
