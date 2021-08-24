

let button = document.querySelector('.countryinput');
let button2 = document.querySelector('.cityinput');

let origin = document.querySelector('.origin-country');
let destination = document.querySelector('.destination-country');

let origin_city = document.querySelector('.origin-city');
let destination_city = document.querySelector('.destination-city');

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


origin.value = "IN";
destination.value = "IN";

originCountryName = "India";
destinationCountryName = "India";


cityinput.addEventListener('click', function () {




	fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin.value}/${destination.value}/2021-08-28?inboundpartialdate=2021-08-28`, {
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


			fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin_city.value}/${destination_city.value}/2021-08-28?inboundpartialdate=2021-08-28`, {
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

					let departureDate="";
					let destinationCity="";
					let destinationCountry="";
					let originCity="";
					let originCountry="";
					let carrierName="";
					let price="";

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

							//manipulating the DOM
							let inforamtion=document.getElementById("information");
							let divParent=document.createElement("div");
							let divDepartureDate=document.createElement("div");
							let divDestinationCity=document.createElement("div");
							let divDestinationCountry=document.createElement("div");
							let divOriginCity=document.createElement("div");
							let divOriginCountry=document.createElement("div");
							let divCarrierName=document.createElement("div");
							let divPrice=document.createElement("div");

							divPrice.innerHTML=price;
							divDepartureDate.innerHTML=departureDate;
							divDestinationCity.innerHTML=destinationCity;
							divDestinationCountry.innerHTML=destinationCountry;
							divOriginCity.innerHTML=originCity;
							divOriginCountry.innerHTML=originCountry;
							divCarrierName.innerHTML=carrierName;

							inforamtion.appendChild(divParent);
							divParent.appendChild(divPrice);
							divParent.appendChild(divDepartureDate);
							divParent.appendChild(divOriginCity);
							divParent.appendChild(divOriginCountry);
							divParent.appendChild(divDestinationCity);
							divParent.appendChild(divDestinationCountry);
							divParent.appendChild(divCarrierName);

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
					origin.value = country[i]['code'];
					// console.log(country[i]['code'])
					// console.log(origin.value);
				}
				if (destination.value == country[i]['name']) {
					destination.value = country[i]['code'];
					// console.log(country[i]['code']);
					// console.log(destination.value);
				}

			}



			fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin.value}/${destination.value}/2021-08-28?inboundpartialdate=2021-08-28`, {
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

						if (city[i]['CountryName'] == originCountryName) {

							let originElement = document.createElement("option");
							originElement.value = city[i]['Name'];
							document.getElementById("origin-city").appendChild(originElement);
							// console.log(count,city[i]['Name']);
							// count++;

						}
						if (city[i]['CountryName'] == destinationCountryName) {

							let destinationElement = document.createElement("option");
							destinationElement.value = city[i]['Name'];
							document.getElementById("destination-city").appendChild(destinationElement);
							// console.log(count,city[i]['Name']);
							// count++;

						}

					}


				});


		});


});
