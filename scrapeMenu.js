
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var requestjson = require('request-json');

var kingswood = 'http://sap.sodexo-uk.com/citywest';
var waterside = 'http://sap.sodexo-uk.com/waterside';
var parkmore = 'http://sap.sodexo-uk.com/parkmore';
var cliona = 'http://sap.sodexo-uk.com/cliona-galway';

var ArrayKingswood = [];
var ArrayWaterside = [];
var ArrayParkmore = [];
var ArrayCliona = [];

var r = request.defaults({});
//If loading from work...
//var r = request.defaults({'proxy':'http://proxy:8080'});


//****************************************
start();
setTimeout(function() {
    mapJSON();
}, 10000);
setTimeout(function() {
    upload();

}, 20000);

//****************************************
function start(){
    console.log("starting scrapping...");
    r(kingswood, function(error, response, html) {
            if(!error){
                ArrayKingswood = scrapeToArray(html);
            }
    });
    
    r(waterside, function(error, response, html) {
            if(!error){
                ArrayWaterside = scrapeToArray(html);
            }
    });
    
    r(parkmore, function(error, response, html) {
            if(!error){
                ArrayParkmore = scrapeToArray(html);
            }
    });
//    
//    r(cliona, function(error, response, html) {
//            if(!error){
//                ArrayCliona = scrapeToArray(html);
//            }
//    });
}

//****************************************
function scrapeToArray(html){
    
    var $ = cheerio.load(html);
    var paras = [];
    var newparas = [];
    
    $('#accordion p').each(function(i, elem) {
    paras[i] = $(this).html();
    });


    for (i=0; i<paras.length; i++) {
        //search for <br> and put the text upto BR into newpara Array
        paras[i].trim();
        while (paras[i].toLowerCase().indexOf("<BR>".toLowerCase())!= -1){
            var loc = paras[i].toLowerCase().indexOf("<BR>".toLowerCase());
            var tempValue = paras[i].substring(0,loc).trim();
            newparas.push(tempValue);
            paras[i] = paras[i].slice(loc + "<BR>".length);
            paras[i] = paras[i].trim();
        }
        newparas.push(paras[i]);
    }
    //loop through and clean, remove blanks, <strong> tags and convert html back to text
    for (i=0; i<newparas.length; i++) {
        
        console.log("newparas :" + newparas[i]);
        if (newparas[i].length === 0){
            newparas.splice(i, 1); 
        }
        if (newparas[i] === "&#xA0;"){
            newparas.splice(i, 1); 
        }
    }
    
    for (i=0; i<newparas.length; i++) {

        var newText = cheerio.load(newparas[i]).text();
        //remove the <strong></strong> 
        var locOpenString = newText.toLowerCase().indexOf("<strong>".toLowerCase());                                             
        if(locOpenString!= -1){
            newText = newText.slice("<strong>".length);
        }

        var locCloseString = newText.toLowerCase().indexOf("</strong>".toLowerCase());
        if(locCloseString!= -1){
            newText = newText.slice(0, locCloseString);
        }
        
        newparas[i] = newText;
        
    }
    
    //loop through and clean, remove blanks, <strong> tags and convert html back to text
    for (i=0; i<newparas.length; i++) {
        
        if (newparas[i].length === 0){
            newparas.splice(i, 1); 
        }
    }

    //print array
    for (i=0; i<newparas.length; i++) {
        console.log("\n newparas " + i + ": "+ newparas[i].toString());
    }
    
    return newparas;
}

function mapJSON(){

    console.log("starting mapping")
    JSONstring = {"JSONMenu": {
                        "Monday" : [
                            {
                            "venue":"Kingswood",
                            "city":"Dublin",
                            "starter1":ArrayKingswood[1],
                            "starter2":ArrayKingswood[2],
                            "main1":ArrayKingswood[4],
                            "main2":ArrayKingswood[6],
                            "mainveg":ArrayKingswood[8],
                                
                            "dessert":ArrayKingswood[10]
                            },
                            {
                            "venue":"Waterside",
                            "city":"Dublin",
                            "starter1":ArrayWaterside[1],
                            "starter2":ArrayWaterside[2],
                            "main1":ArrayWaterside[4],
                            "main2":ArrayWaterside[6],
                            "mainveg":ArrayWaterside[8],
                            "dessert":ArrayWaterside[10]
                            },
                           {
                            "venue":"Parkmore",
                            "city":"Galway",
                            "starter1":ArrayParkmore[1],
                            "starter2":ArrayParkmore[2],
                            "main1":ArrayParkmore[4],
                            "main2":ArrayParkmore[6],
                            "mainveg":ArrayParkmore[8],
                            "dessert":ArrayParkmore[10]
                            }
//                            ,
//                            {
//                            "venue":"Cliona",
//                            "starter1":ArrayParkmore[1],
//                            "starter2":ArrayCliona[2],
//                            "main1":ArrayCliona[4],
//                            "main2":ArrayCliona[6],
//                            "mainveg":ArrayCliona[8],
//                            "dessert":ArrayCliona[10]
//                            }
                        ],
                        "Tuesday" : [
                            {
                            "venue":"Kingswood",
                            "city":"Dublin",
                            "starter1":ArrayKingswood[12],
                            "starter2":ArrayKingswood[13],
                            "main1":ArrayKingswood[15],
                            "main2":ArrayKingswood[17],
                            "mainveg":ArrayKingswood[19],
                            "dessert":ArrayKingswood[21]
                            },
                            {
                            "venue":"Waterside",
                            "city":"Dublin",
                            "starter1":ArrayWaterside[12],
                            "starter2":ArrayWaterside[13],
                            "main1":ArrayWaterside[15],
                            "main2":ArrayWaterside[17],
                            "mainveg":ArrayWaterside[19],
                            "dessert":ArrayWaterside[21]
                            },
                            {
                            "venue":"Parkmore",
                            "city":"Galway",
                            "starter1":ArrayParkmore[12],
                            "starter2":ArrayParkmore[13],
                            "main1":ArrayParkmore[15],
                            "main2":ArrayParkmore[17],
                            "mainveg":ArrayParkmore[19],
                            "dessert":ArrayParkmore[21]
                            }
//                            ,
//                           {
//                            "venue":"Cliona",
//                            "starter1":ArrayParkmore[12],
//                            "starter2":ArrayCliona[13],
//                            "main1":ArrayCliona[15],
//                            "main2":ArrayCliona[17],
//                            "mainveg":ArrayCliona[19],
//                            "dessert":ArrayCliona[21]
//                            }
                        ],
                        "Wednesday" : [
                            {
                            "venue":"Kingswood",
                            "city":"Dublin",
                            "starter1":ArrayKingswood[23],
                            "starter2":ArrayKingswood[24],
                            "main1":ArrayKingswood[26],
                            "main2":ArrayKingswood[28],
                            "mainveg":ArrayKingswood[30],
                            "dessert":ArrayKingswood[32]
                            },
                            {
                            "venue":"Waterside",
                            "city":"Dublin",
                            "starter1":ArrayWaterside[23],
                            "starter2":ArrayWaterside[24],
                            "main1":ArrayWaterside[26],
                            "main2":ArrayWaterside[28],
                            "mainveg":ArrayWaterside[30],
                            "dessert":ArrayWaterside[32]
                            },
                            {
                            "venue":"Parkmore",
                            "city":"Galway",
                            "starter1":ArrayParkmore[23],
                            "starter2":ArrayParkmore[24],
                            "main1":ArrayParkmore[26],
                            "main2":ArrayParkmore[28],
                            "mainveg":ArrayParkmore[30],
                            "dessert":ArrayParkmore[32]
                            }
//                            ,
//                           {
//                            "venue":"Cliona",
//                            "starter1":ArrayParkmore[23],
//                            "starter2":ArrayCliona[24],
//                            "main1":ArrayCliona[26],
//                            "main2":ArrayCliona[28],
//                            "mainveg":ArrayCliona[30],
//                            "dessert":ArrayCliona[32]
//                            }
                        ],
                        "Thursday" : [
                            {
                            "venue":"Kingswood",
                            "city":"Dublin",
                            "starter1":ArrayKingswood[34],
                            "starter2":ArrayKingswood[35],
                            "main1":ArrayKingswood[37],
                            "main2":ArrayKingswood[39],
                            "mainveg":ArrayKingswood[41],
                            "dessert":ArrayKingswood[43]
                            },
                            {
                            "venue":"Waterside",
                            "city":"Dublin",
                            "starter1":ArrayWaterside[34],
                            "starter2":ArrayWaterside[35],
                            "main1":ArrayWaterside[37],
                            "main2":ArrayWaterside[39],
                            "mainveg":ArrayWaterside[41],
                            "dessert":ArrayWaterside[43]
                            },
                            {
                            "venue":"Parkmore",
                            "city":"Galway",
                            "starter1":ArrayParkmore[34],
                            "starter2":ArrayParkmore[35],
                            "main1":ArrayParkmore[37],
                            "main2":ArrayParkmore[39],
                            "mainveg":ArrayParkmore[41],
                            "dessert":ArrayParkmore[43]
                            }
//                            ,
//                            {
//                            "venue":"Cliona",
//                            "starter1":ArrayParkmore[34],
//                            "starter2":ArrayCliona[35],
//                            "main1":ArrayCliona[37],
//                            "main2":ArrayCliona[39],
//                            "mainveg":ArrayCliona[41],
//                            "dessert":ArrayCliona[43]
//                            }
                        ],
                        "Friday" : [
                            {
                            "venue":"Kingswood",
                            "city":"Dublin",
                            "starter1":ArrayKingswood[45],
                            "starter2":ArrayKingswood[46],
                            "main1":ArrayKingswood[48],
                            "main2":ArrayKingswood[50],
                            "mainveg":ArrayKingswood[52],
                            "dessert":ArrayKingswood[54]
                            },
                            {
                            "venue":"Waterside",
                            "city":"Dublin",
                            "starter1":ArrayWaterside[45],
                            "starter2":ArrayWaterside[46],
                            "main1":ArrayWaterside[48],
                            "main2":ArrayWaterside[50],
                            "mainveg":ArrayWaterside[52],
                            "dessert":ArrayWaterside[54]
                            },
                            {
                            "venue":"Parkmore",
                            "city":"Galway",
                            "starter1":ArrayParkmore[45],
                            "starter2":ArrayParkmore[46],
                            "main1":ArrayParkmore[48],
                            "main2":ArrayParkmore[50],
                            "mainveg":ArrayParkmore[52],
                            "dessert":ArrayParkmore[54]
                            }
//                            ,
//                            {
//                            "venue":"Cliona",
//                            "starter1":ArrayParkmore[45],
//                            "starter2":ArrayCliona[46],
//                            "main1":ArrayCliona[48],
//                            "main2":ArrayCliona[50],
//                            "mainveg":ArrayCliona[52],
//                            "dessert":ArrayCliona[54]
//                            }
                        ]
                }
        };
}

//****************************************
function upload(){
        console.log("uploading.....");
        r({ url: 'https://api.myjson.com/bins/1ym74', method: 'PUT', json: JSONstring}, function(err, httpResponse, body) {
              if (err) {
                
                return console.error('upload failed:', err);
              }
              console.log('Upload successful!  Server responded with:', body);
        });  
}   