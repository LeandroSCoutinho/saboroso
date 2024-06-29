var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  conn.query(`
    SELECT * FROM tb_menus ORDER BY title
    `, (err, results)=>{ 

      if(err){
        console.log(err);
      }else{
        res.render('index', { 
          title: 'Restaurante Saboroso',
          menus: results
         });
      }
    });
});

router.get('/contacts', function(req, res, next){
  res.render('contacts', {
    title: "Contatos - Restaurante Saboroso"
  });
});
router.get('/menus', function(req, res, next){
  res.render('menus', {
    title: "Menu - Restaurante Saboroso"
  });
});
router.get('/reservations', function(req, res, next){
  res.render('reservations', {
    title: "Reservas - Restaurante Saboroso"
  });
});
router.get('/services', function(req, res, next){
  res.render('services', {
    title: "Serviços - Restaurante Saboroso"
  });
});


module.exports = router;
