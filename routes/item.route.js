const express = require('express');
const app = express();
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// Require Item model in our routes module
let Item = require('../models/Item');

router
.get('/', function (req, res) {
  Item.find(function (err, items){
     if(err){
       console.log(err);
     }
     else {
       res.json(items);
     }
   });
  })
  .post('/', function (req, res) {
    let item = new Item(req.body);
     item.save()
      .then(item => {
        res.status(200).json(item);
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  })
  .get('/:id', function (req, res) {
    let id = req.params.id;

    if (id) {
      console.log(`requesting ${id}`);
      Item.findById(req.params.id, function(err, item) {
       if (!item) {
         console.error('Could not Find Document');
         res.json({});
      }
       else {
         res.json(item);
       }
     });
   }
  })
  .put('/:id', function (req, res) {
    console.log(`updating ${req.params.id}`);
    Item.findById(req.params.id, function(err, item) {
     if (!item)
       return next(new Error('Could not load Document'));
     else {
       item.name = req.body.name;
       item.price = req.body.price;

       item.save().then(item => {
           res.json('Update complete');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   })
  })
  .delete('/:id',function (req, res) {
    console.log(`deleting ${req.params.id}`);
    Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
         if(err) res.json(err);
         else res.json('Successfully removed');
     });
  });

module.exports = router;
