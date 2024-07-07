
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
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
  reservations.render(req,res);
});
router.post('/reservations', function(req, res, next){
  if(!req.body.name){
    reservations.render(req,res, 'Digite o nome!');
  }else if(!req.body.email){
    reservations.render(req,res, 'Digite o email!');
  }else if(!req.body.people){
    reservations.render(req,res, 'Selecione a quantidade de pessoas!');
  }else if(!req.body.date){
    reservations.render(req,res, 'Selecione a data!'); 
  }else if(!req.body.time){
    reservations.render(req,res, 'Selecione a hora!');
  }else{

    reservations.save(req.body).then(results=>{
      req.body = {};
      reservations.render(req,res,null, 'Reserva realizada com sucesso!');
    
    }).catch(err=>{
     
      reservations.render(req, res, err.message);
    
    });
  }
});
router.get('/services', function(req, res, next){
  res.render('services', {
    title: "Serviços - Restaurante Saboroso",
    h1: 'Nossos Serviços',
    background: 'images/img_bg_1.jpg'
  });
});

module.exports = router;
