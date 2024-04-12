const {MongoClient} = require("mongodb")

const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require("cors")
const fs=require('fs')
const path=require('path')

app.use(cors({
    origin:'http://localhost:4200'
}))
app.use('/images',express.static('photos'))
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:1000000}))
