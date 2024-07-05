
var express = require('express');
var menus = require('./../inc/menus');
var router = express.Router();

router.get('/', function(req, res, next) {
  menus.getMenus().then(results => {
    res.render('index', { 
      title: 'Restaurante Saboroso',
      menus: results,
      h1: 'Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      isHome: true
     });
  });
});

router.get('/contacts', function(req, res, next){
  res.render('contacts', {
    title: "Contatos - Restaurante Saboroso",
    h1: 'Diga um oi!',
    background: 'images/img_bg_3.jpg'
  });
});

router.get('/menus', function(req, res, next){
  menus.getMenus().then(results => {
    res.render('index', { 
      title: 'Menu - Restaurante Saboroso',
      menus: results,
      h1: 'Saboreie nosso menu!',
      background: 'images/img_bg_1.jpg'
     });
  });
});
router.get('/reservations', function(req, res, next){
  res.render('reservations', {
    title: "Reservas - Restaurante Saboroso",
    h1: 'Reserve uma Mesa!',
    background: 'images/img_bg_2.jpg'
  });
});
router.get('/services', function(req, res, next){
  res.render('services', {
    title: "Serviços - Restaurante Saboroso",
    h1: 'Nossos Serviços',
    background: 'images/img_bg_1.jpg'
  });
});

module.exports = router;
