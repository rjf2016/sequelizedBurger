var models   = require('../models');
var express = require('express');
var router = express.Router();


/*
router.get('/', function (req, res) {
  console.log("redirect?????");
  res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
  burger.all(function (data) {
    var hbsObject = { burgers: data };
  //  console.log(hbsObject);
    res.render('index', hbsObject);
  });
});
*/

router.get('/', function(req, res) {

  
  // SOLUTION:
  // =========
  // use the Burger model to find all burgers,
  // use the include to grab info from the Store model.
  // This will let us show the Burger plus the stores
  models.Burger.findAll({
    include: [ models.Store ]
  })
  .then(function(burgers) {
    res.render('burgers/index', { burgers: burgers })
  })
});


router.post('/create', function(req,res) {
       var storeID = -1;
      // console.log(req.body);
      // return;

       //Check if the Store name exists and add a Store Record if it doesn't
        models.Store.findAll({
              where: {name: req.body.store_name}
              }).then(function(stores) {
              if (stores.length > 0){
                  storeID = stores[0].dataValues.id;

                  //Using the Burger model, create a new Burger using the store ID from above
                  models.Burger.create({
                    name: req.body.burger_name,
                    devoured: false,
                    store_id: storeID
                  })
                  .then(function(){
                    // redirect to home on login
                    res.redirect('/')
                  })

              } else {
                // Create a new Store
                 models.Store.create({
                      name: req.body.store_name
                    })
                 .then(function(s) {
                          //Get the newly generate ID to use for saving the Burger (below)
                            storeID = s.dataValues.id;

                            models.Burger.create({
                              name: req.body.burger_name,
                              devoured: false,
                              store_id: storeID
                            })
                            .then(function(){
                              // redirect to home on login
                              res.redirect('/')
                            })

                 });
               }
            }
           );
  });


router.put('/update/:id', function(req,res) {
  // SOLUTION:
  // =========
  // use the Cat model to update a cat's sleepy status
  // based on the boolean passed in req.body sleepy
  // and the id of the cat (as passed in the url)
  models.Burger.update(
  {
    devoured: req.body.devoured
  },
  {
    where: { id : req.params.id }
  })
  // connect it to this .then.
  .then(function (result) {
    res.redirect('/');
  })
});


router.delete('/delete/:id', function(req,res) {
  // SOLUTION:
  // =========
  // use the Cat model to delete a cat
  // based on the id passed in the url
  models.Burger.destroy({
    where: {
      id: req.params.id
    }
  })
  // connect it to this .then.
  .then(function() {
    res.redirect('/');
  })
});




module.exports = router;
