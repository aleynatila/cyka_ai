const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');



router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
      user: req.user
    });
  });
  
  router.get('/register', (req, res) => {
    res.render('register');
  });
  
  router.get('/login', (req, res) => {
    res.render('login');
  });

  router.get('/forget-password', (req, res) => {
    res.render('forget'); // Render your login14.hbs view
});

  
  router.get('/profile', authController.isLoggedIn, (req, res) => {
    console.log(req.user);
    if( req.user ) {
      res.render('profile', {
        user: req.user
      });
    } else {
      res.redirect('/login');
    }
    
  })
  

module.exports = router;
