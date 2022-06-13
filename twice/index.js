const axios = require('axios')

class AstraSight {

	constructor(){
		console.log('bulding')
	}

	// load data
	load(){
		const res = axios('https://horoscopes.astro-seek.com/calculate-astrology-aspects/?narozeni_mesic=06&narozeni_rok=2022&kalendar_planeta_1=&kalendar_aspekt=&orb=321&barva=p')
		console.log(res)
	}

	// extract
	extract(){

	}
	
	// get list
	points(){

	}
}

module.exports = AstraSight

