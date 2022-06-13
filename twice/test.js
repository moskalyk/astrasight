const AstraSight = require('./index.js');
const axios = require('axios');
const cheerio = require('cheerio');
const async = require('async');

(async () => {

	const rows = {}

	const aspects ={
		'https://horoscopes.astro-seek.com/seek-icons-astrologie/aspektarium/aspekt-midpointy-barevny-kvadratura.png':'square',
		'https://horoscopes.astro-seek.com/seek-icons-astrologie/aspektarium/aspekt-midpointy-barevny-konjunkce.png': 'conjuct',
		'https://horoscopes.astro-seek.com/seek-icons-astrologie/aspektarium/aspekt-midpointy-barevny-trigon.png': 'trine',
		'https://horoscopes.astro-seek.com/seek-icons-astrologie/aspektarium/aspekt-midpointy-barevny-sextil.png': 'sextile'
	}

	const pairs = {

	}

	const dateConversion = {
		'Jun': '5',
		'Jul': '6',
		'Aug': '7'
	}

	const dates = {

	}

	// const as = new AstraSight()
	const res = await axios('https://horoscopes.astro-seek.com/calculate-astrology-aspects/?narozeni_mesic=06&narozeni_rok=2022&kalendar_planeta_1=&kalendar_aspekt=&orb=321&barva=p')
	const $ = cheerio.load(res.data)
	// await res.load()

	$("table")
	  .find("td")
	  .each((row, ref) => {

	  	const img = $(ref).find('img');
	    const src = img.attr('src') 
	    if(src != undefined){
	    	// console.log(src)
	    	if(aspects[src] != undefined){
	    		rows[row] ={
	    			1: '',
	    			2: '',
	    			aspect: aspects[src]
	    		}

	    		console.log(aspects[src])

	    		Object.keys(rows).forEach((key, i) => {
	    			console.log(key)
	    			pairs[key - 1] = key + 1

	    			// rows[key] = {
	    			// 	1: key - 1,
	    			// 	2: key + 1,
	    			// 	aspect: aspects[src]
	    			// }
	    		})

	   //  		// get dates
				// $('td').each((idx, ref) => {
				// 	// skip first bit
				// 	if(idx >= 6){



				// 	}
				// });
	    	}
	    }
	  });



	$('td').each((idx,ref) => {
		const elem = $(ref);
		    try{
					const elem = $(ref);
					const text = elem.text().split(' ')
					console.log(text)
					const month = text[0].replace('\n', '')
					const day = text[1].replace('\n', '')
					const date = new Date(2022, dateConversion[month], day)
					console.log(date)
					dates[date] = []
					// get date
					// find aspects under the date
					if(pairs.hasOwnProperty(idx)){
						console.log(idx)
						// print
						console.log(date.toDateString())
						console.log(`Pair ${date.toDateString()}: ${text} ${pairs[idx]} ${1}`)
					}
				}catch(e){

				}
	})

	async.parallel([
	    function(callback) {
	    console.log('done') 
	    callback(null, 1)
	    },
	    function(callback) { 
	    console.log('done') 
	    callback(null, 2)
	}
	], function(err, results) {
		console.log(results)
	    // optional callback
	});

})()
