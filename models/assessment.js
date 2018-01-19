const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const Schema=mongoose.Schema;
const conn=require('./user-direct');
var assess=new Schema({
        id:Number,
        title:String,
        score:Number,
        domain:[
            {
                id_id:Number,
                title:String,
                description:String,
                dom_score:Number,
                sub_domain:[
                    {
                        id_id_id:Number,
                        title:String,
                        sub_score:Number,
                        question:[String],
                        scoring_model:[Number]
                    }
                ] 
            }
        ]
});


var Book=mongoose.model('book',assess);