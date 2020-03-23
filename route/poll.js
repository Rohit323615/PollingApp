const express=require('express');
const router=express.Router();
const Vote=require('../model/Vote');


var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '967431',
  key: '58a2283386b387fb57a0',
  secret: '7c15a45ed1e11e5a0b7f',
  cluster: 'ap2',
  encrypted: true
});

router.get('/',(req,res)=>{
    Vote.find().then(votes=>res.json({success:true,votes:votes}));
});

router.post('/',(req,res)=>{

    const newVote={
        os:req.body.os,
        points:1
    }

    new Vote(newVote).save().then((vote)=>{
        pusher.trigger('os-poll', 'os-vote', {
            points:parseInt( vote.points),
            os:vote.os
          });
          return res.json({success:true,message:'thank you for voting'});
    })


});


module.exports=router;