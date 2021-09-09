

let button = document.querySelector('.countryinput');
let button2 = document.querySelector('.cityinput');

let origin = document.querySelector('.origin-country');
let destination = document.querySelector('.destination-country');

let origin_city = document.querySelector('.origin-city');
let destination_city = document.querySelector('.destination-city');

let departdate=document.querySelector('.departdate');

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

				let originElement = document.createElement("option");
				let destinationElement = document.createElement("option");

				originElement.value = country[i]['name'];
				destinationElement.value = country[i]['name'];

				document.getElementById("origin-country").appendChild(originElement);
				document.getElementById("destination-country").appendChild(destinationElement);

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

	fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin.value}/${destination.value}/${departdate.value}?inboundpartialdate=2021-08-28`, {
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


			fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin_city.value}/${destination_city.value}/${departdate.value}?inboundpartialdate=2021-08-28`, {
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
							let inforamtion = document.getElementById("information");

							let divParent = document.createElement("div");
							let divCarrierName = document.createElement("div");
							let divmidinfo = document.createElement("div");
							let divplaces = document.createElement("div");
							let divOriginPlace = document.createElement("div");
							let divDestinationPlace = document.createElement("div");
							let divAirplane = document.createElement("div");
							let divHorizontal = document.createElement("div");
							let divDepartureTime = document.createElement("div");
							let divPrice = document.createElement("div");

							divParent.classList.add("parent");
							divCarrierName.classList.add("carrier");
							divmidinfo.classList.add("midinfo");
							divplaces.classList.add("places");
							divOriginPlace.classList.add("originPlace");
							divDestinationPlace.classList.add("destinationPlace");
							divAirplane.classList.add("airplane");
							divHorizontal.classList.add("horizontal");
							divDepartureTime.classList.add("departuretime");
							divPrice.classList.add("price");

							let carrierdiv = document.createElement("div");
							let originplacediv1 = document.createElement("div");
							let originplacediv2 = document.createElement("div");
							let destinationplacediv1 = document.createElement("div");
							let destinationplacediv2 = document.createElement("div");
							let airplaneimg = document.createElement("img");
							let horizontalimg = document.createElement("img");
							let departurediv = document.createElement("div");
							let pricediv = document.createElement("div");

							carrierdiv.innerHTML = carrierName;
							originplacediv1.innerHTML = originCity;
							originplacediv2.innerHTML = originCountry;
							destinationplacediv1.innerHTML = destinationCity;
							destinationplacediv2.innerHTML = destinationCountry;
							airplaneimg.src = "airplane.png";
							horizontalimg.src = "horizontal.png";
							departurediv.innerHTML = departureDate;
							pricediv.innerHTML = price;

							inforamtion.appendChild(divParent);

							divParent.appendChild(divCarrierName);
							divParent.appendChild(divmidinfo);
							divParent.appendChild(divPrice);

							divCarrierName.appendChild(carrierdiv);

							divmidinfo.appendChild(divplaces);
							divmidinfo.appendChild(divDepartureTime);

							divPrice.appendChild(pricediv);

							divplaces.appendChild(divOriginPlace);
							divplaces.appendChild(divHorizontal);
							divplaces.appendChild(divAirplane);
							divplaces.appendChild(divDestinationPlace);

							divOriginPlace.appendChild(originplacediv1);
							divOriginPlace.appendChild(originplacediv2);

							divDestinationPlace.appendChild(destinationplacediv1);
							divDestinationPlace.appendChild(destinationplacediv2);

							divAirplane.appendChild(airplaneimg);

							divHorizontal.appendChild(horizontalimg);

							divDepartureTime.appendChild(departurediv);

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



			fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin.value}/${destination.value}/2021-09-20?inboundpartialdate=2021-08-28`, {
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


					for (let i = 0; i < length; i++) {


						if (originCountryName == destinationCountryName) {
							if (city[i]['CountryName'] == originCountryName) {

								let originElement = document.createElement("option");
								originElement.value = city[i]['Name'];
								document.getElementById("origin-city").appendChild(originElement);
								// console.log(city[i]['Name']);
								// count++;

							}
							if (city[i]['CountryName'] == destinationCountryName) {

								let destinationElement = document.createElement("option");
								destinationElement.value = city[i]['Name'];
								document.getElementById("destination-city").appendChild(destinationElement);
								// console.log(city[i]['Name']);
								// count++;

							}

						}
						else {
							if (city[i]['CountryName'] == originCountryName) {

								let originElement = document.createElement("option");
								originElement.value = city[i]['Name'];
								document.getElementById("origin-city").appendChild(originElement);
								// console.log(city[i]['Name']);
								// count++;

							}
							else if (city[i]['CountryName'] == destinationCountryName) {

								let destinationElement = document.createElement("option");
								destinationElement.value = city[i]['Name'];
								document.getElementById("destination-city").appendChild(destinationElement);
								// console.log(city[i]['Name']);
								// count++;

							}
						}

					}


				});


		});


});
