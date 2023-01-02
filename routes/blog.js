const express = require('express')
const path = require('path')
// const blogs = require('../data/blogs')
const router = express.Router()
const http = require("https");
const { json } = require('express');
const bodyparser = require('body-parser');
const apikey = "7914dc87e2msh63c6ef9c498e562p12e7afjsn53bb0e865ab4";
router.use(bodyparser.urlencoded({extended:true}));

router.post('/search',(req,res)=>{
    console.log(req.body.title);

    const options = {
        "method": "GET",
        "hostname": "ott-details.p.rapidapi.com",
        "port": null,
        "path": "/search?title="+req.body.title+"&page=1",
        "headers": {
            "X-RapidAPI-Key": apikey,
            "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
            "useQueryString": true
        }
    };
    
    const reqt = http.request(options, function (resu) {
        const chunks = [];
    
        resu.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        resu.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
            f = JSON.parse(body);
            res.render('blog', {
                lists: f,
                title: req.body.title
            })
        });
    });
    
    reqt.end();
});
var f, lang;
router.get('/details/:slug', (req, rese) => {
    const options = {
        "method": "GET",
        "hostname": "ott-details.p.rapidapi.com",
        "port": null,
        "path": "/advancedsearch?start_year=1970&end_year=2020&min_imdb=6&max_imdb=7.8&genre=action&language=" + req.params.slug + "&type=movie&sort=latest&page=1",
        "headers": {
            "X-RapidAPI-Key": apikey,
            "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
            "useQueryString": true
        }
    };
    const requ = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            body = Buffer.concat(chunks);
            f = JSON.parse(body);
            rese.render('blog', {
                lists: f,
                title: req.params.slug
            })
        });
    });
    requ.end();
});
const options2 = {
    "method": "GET",
    "hostname": "ott-details.p.rapidapi.com",
    "port": null,
    "path": "/getParams?param=language",
    "headers": {
        "X-RapidAPI-Key": apikey,
        "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
        "useQueryString": true
    }
};

const req = http.request(options2, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        lang = JSON.parse(body);
        // console.log(body.toString());
    });
});

req.end();


router.get('/info/:slug', (req, res) => {
    // console.log(f);
    myblog = f.results.filter((e) => {
        return e.title == req.params.slug
    })
    console.log(myblog[0].imdbid);

    const options = {
        "method": "GET",
        "hostname": "ott-details.p.rapidapi.com",
        "port": null,
        "path": "/gettitleDetails?imdbid="+myblog[0].imdbid,
        "headers": {
            "X-RapidAPI-Key": apikey,
            "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
            "useQueryString": true
        }
    };
    
    const req1 = http.request(options, function (res1) {
        const chunks = [];
    
        res1.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res1.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
            const optionsi = {
                "method": "GET",
                "hostname": "ott-details.p.rapidapi.com",
                "port": null,
                "path": "/getadditionalDetails?imdbid=tt7286456",
                "headers": {
                    "X-RapidAPI-Key": "99a372f7e7mshd485d46d2c0700ap1d1521jsnd5174231fdad",
                    "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
                    "useQueryString": true
                }
            };
            
            const req5 = http.request(optionsi, function (res5) {
                const chunks = [];
            
                res5.on("data", function (chunk) {
                    chunks.push(chunk);
                });
            
                res5.on("end", function () {
                    const body2 = Buffer.concat(chunks);
                    console.log(body.toString());

                    res.render('blogpost', {
                        post: myblog[0],
                        extra : JSON.parse(body),
                        extra2: JSON.parse(body2)
                    })
                });
            });
            
            req5.end();
            
        });
    });
    
    req1.end();
    // console.log(myblog)
})

router.get('/', (req, res) => {
    res.render('home', {
        title: "Alpha",
        lists: lang
    })
})
module.exports = router
