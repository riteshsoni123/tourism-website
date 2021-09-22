

let button = document.querySelector('.countryinput');
let button2 = document.querySelector('.cityinput');

let origin = document.querySelector('.origin-country');
let destination = document.querySelector('.destination-country');

let origin_city = document.querySelector('.origin-city');
let destination_city = document.querySelector('.destination-city');

let departdate = document.querySelector('.departdate');

let originCountryName = '';
let destinationCountryName = '';

function addListOfCountry() {
	let country = "";

	fetch('../countries.json')
		.then(res => res.json())
		.then(data => {
			country = data;
			// return country.result;
			// console.log(country);
			for (let i = 0; i < 243; i++) {

				let originElement=createNoClass(document.getElementById("origin-country"),"option");
				let destinationElement=createNoClass(document.getElementById("destination-country"),"option");

				originElement.value = country[i]['name'];
				destinationElement.value = country[i]['name'];


			}
		});
}

addListOfCountry();


// origin.value = "IN";
// destination.value = "IN";

originCountryName = "";
destinationCountryName = "";


cityinput.addEventListener('click', function () {


	console.log(departdate.value);

	fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin.value}/${destination.value}/${departdate.value}?inboundpartialdate=2019-12-01`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f",
			"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
		}
	})
		.then(resp => resp.json())
		.then(dataCity => {
			// console.log(dataCity);
			// console.log(dataCity['Places']);

			let city = dataCity['Places'];
			let length = city['length'];
			length = Number(length);

			console.log(origin_city.value);
			console.log(destination_city.value);

			for (let i = 0; i < length; i++) {

				if (origin_city.value == city[i]['Name']) {
					origin_city.value = city[i]['SkyscannerCode'];
					// console.log(country[i]['code'])
					// console.log(origin.value);
				}
				if (destination_city.value == city[i]['Name']) {
					destination_city.value = city[i]['SkyscannerCode'];
					// console.log(country[i]['code']);
					// console.log(destination.value);
				}

			}


			fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin_city.value}/${destination_city.value}/${departdate.value}?inboundpartialdate=2019-12-01`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f",
					"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
				}
			})
				.then(resp => resp.json())
				.then(result => {
					console.log(result);
					let count = 0;
					let routelength = result['Routes']['length'];

					let departureDate = "";
					let destinationCity = "";
					let destinationCountry = "";
					let originCity = "";
					let originCountry = "";
					let carrierName = "";
					let price = "";

					routelength = Number(routelength);
					for (let i = 0; i < routelength; i++) {

						let destinationId = result["Routes"][i]["DestinationId"];
						price = result["Routes"][i]["Price"];
						let datetime = result["Routes"][i]["QuoteDateTime"];

						if (price != undefined) {

							console.log("Number=", count);
							console.log("price=", price);//printing the price of the flight

							let quoteId = result["Routes"][i]["QuoteIds"][0];
							let quotelength = result["Quotes"]["length"];

							quotelength = Number(quotelength);

							for (let j = 0; j < quotelength; j++) {

								if (quoteId == result['Quotes'][j]['QuoteId']) {

									departureDate = result['Quotes'][j]['OutboundLeg']['DepartureDate'];
									let originId = result['Quotes'][j]['OutboundLeg']['OriginId'];
									let carrierId = result['Quotes'][j]['OutboundLeg']['CarrierIds'][0];
									let placelength = result['Places']['length'];

									console.log("DepartureDate=", departureDate);//printing the departure date and time


									placelength = Number(placelength);

									for (let k = 0; k < placelength; k++) {

										if (destinationId == result['Places'][k]['PlaceId']) {

											destinationCity = result['Places'][k]['CityName'];
											destinationCountry = result['Places'][k]['CountryName'];

											console.log("DestinationCity=", destinationCity, destinationId);//printimg the destination city
											console.log("DestinatonCountry=", destinationCountry);//printing the destination country

										}
										else if (originId == result['Places'][k]['PlaceId']) {

											originCity = result['Places'][k]['CityName'];
											originCountry = result['Places'][k]['CountryName'];

											console.log("OriginCity=", originCity);//printing the origin city
											console.log("OriginCountry=", originCountry);//printing the origin country

										}
										else {
											continue;
										}
									}

									let carrierlength = result['Carriers']['length'];

									carrierlength = Number(carrierlength);

									for (let k = 0; k < carrierlength; k++) {

										if (carrierId == result['Carriers'][k]['CarrierId']) {

											carrierName = result['Carriers'][k]['Name'];
											console.log("CarrierName=", carrierName);//printing the carrier name
											// console.log("\n");

										}
									}

								}
							}
							count++;
							// if (count == 8) {
							// 	break;
							// }
							console.log("\n");

							//manipulating the DOM****************************************************************

							manipulateDOM(carrierName, originCity, originCountry, destinationCity, destinationCountry, departureDate, price);

						}

					}

				});


		});


});

countryinput.addEventListener('click', function () {

	console.log(origin.value);
	console.log(destination.value);

	fetch('../countries.json')
		.then(res => res.json())
		.then(dataCountry => {
			let country = dataCountry;
			// return country.result;
			// console.log(country);
			for (let i = 0; i < 243; i++) {

				if (origin.value == country[i]['name']) {
					originCountryName = origin.value;
					origin.value = country[i]['code'];
					// console.log(country[i]['code'])
					// console.log(origin.value);
				}
				if (destination.value == country[i]['name']) {
					destinationCountryName = destination.value;
					destination.value = country[i]['code'];
					// console.log(country[i]['code']);
					// console.log(destination.value);
				}

			}



			fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin.value}/${destination.value}/${departdate.value}?inboundpartialdate=2019-12-01`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f",
					"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
				}
			})
				.then(resp => resp.json())
				.then(dataCity => {
					// console.log(dataCity);
					console.log(dataCity['Places']);

					let city = dataCity['Places'];
					let length = city['length'];
					length = Number(length);

					// return country.result;

					// console.log(city);
					// let count=0;

					let datalistorigin_city=document.getElementById("origin-city");
					let datalistdestination_city=document.getElementById("destination-city");
					for (let i = 0; i < length; i++) {


						if (originCountryName == destinationCountryName) {
							if (city[i]['CountryName'] == originCountryName) {

								let originElement=createNoClass(datalistorigin_city,"option");
								originElement.value = city[i]['Name'];
								// console.log(city[i]['Name']);
								// count++;

							}
							if (city[i]['CountryName'] == destinationCountryName) {

								let destinationElement=createNoClass(datalistdestination_city,"option");
								destinationElement.value = city[i]['Name'];
								// console.log(city[i]['Name']);
								// count++;

							}

						}
						else {
							if (city[i]['CountryName'] == originCountryName) {

								let originElement=createNoClass(datalistorigin_city,"option");
								originElement.value = city[i]['Name'];
								// console.log(city[i]['Name']);
								// count++;

							}
							else if (city[i]['CountryName'] == destinationCountryName) {

								let destinationElement=createNoClass(datalistdestination_city,"option");
								destinationElement.value = city[i]['Name'];
								// console.log(city[i]['Name']);
								// count++;

							}
						}

					}


				});


		});


});

function create(parent, childTag, className) {
	let child = document.createElement(childTag);
	child.classList.add(className);
	parent.appendChild(child);
	return child;
}

function createNoClass(parent, childTag) {
	let child = document.createElement(childTag);
	parent.appendChild(child);
	return child;
}

function manipulateDOM(carrierName, originCity, originCountry, destinationCity, destinationCountry, departureDate, price) {

	let inforamtion = document.getElementById("information");

	let divParent = create(inforamtion, "div", "parent");

	let divCarrierName = create(divParent, "div", "carrier");

	let divmidinfo = create(divParent, "div", "midinfo");

	let divplaces = create(divmidinfo, "div", "places");

	let divOriginPlace = create(divplaces, "div", "originPlace");

	let divHorizontal = create(divplaces, "div", "horizontal");

	let divAirplane = create(divplaces, "div", "airplane");

	let divDepartureTime = create(divmidinfo, "div", "departuretime");

	let divDestinationPlace = create(divplaces, "div", "destinationPlace");

	let divPrice = create(divParent, "div", "price");

	let carrierdiv = createNoClass(divCarrierName, "div");

	let originplacediv1 = createNoClass(divOriginPlace, "div");

	let originplacediv2 = createNoClass(divOriginPlace, "div");

	let horizontalimg = createNoClass(divHorizontal, "img");

	let airplaneimg = createNoClass(divAirplane, "img");

	let destinationplacediv1 = createNoClass(divDestinationPlace, "div");

	let destinationplacediv2 = createNoClass(divDestinationPlace, "div");

	let departurediv = createNoClass(divDepartureTime, "div");

	let pricediv = createNoClass(divPrice, "div");


	carrierdiv.innerHTML = carrierName;
	originplacediv1.innerHTML = originCity;
	originplacediv2.innerHTML = originCountry;
	destinationplacediv1.innerHTML = destinationCity;
	destinationplacediv2.innerHTML = destinationCountry;
	airplaneimg.src = "airplane.png";
	horizontalimg.src = "horizontal.png";
	departurediv.innerHTML = departureDate;
	pricediv.innerHTML = price;
	
}