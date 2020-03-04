var express = require('express');
var router = express.Router();
var kirjatService = require('./kirjatService');


router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//  res.json(kirjatService.haekirja());
    kirjatService.haekirjat((rows)=>{
      res.json(rows);
    })
});
router.get('/:id', function(req, res, next){
   // res.json(kirjaService.haekirja(req.params.id));
   kirjatService.haekirja(req.params.id,(rows)=>{
    res.json(rows);
  })
})


router.post('/', function(req, res, next){
  kirjatService.luokirja(req.body, (rowCount)=>{
     if(rowCount>0)
     res.status(201).json({message:'success'});
     else{
       res.status(400).json({message:'error'});
     }
   })
})


router.put('/:id', function(req, res, next){
  kirjatService.paivitakirja(req.body, req.params.id, (rowCount)=>{
    if(rowCount>0)
    res.status(200).json({message:'success'});
    else{
      res.status(400).json({message:'error'});
    }
  })
})

router.delete('/:id', function(req, res, next){
  kirjatService.poistakirja(req.params.id, (rowCount)=>{
    if(rowCount>0)
    res.status(200).json({message:'success'});
    else{
      res.status(400).json({message:'error'});
    }
  })
})
module.exports = router;
