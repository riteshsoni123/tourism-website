

let button = document.querySelector('.countryinput');
let origin = document.querySelector('.origin');
let destination = document.querySelector('.destination');
let originCountryName='';
let destinationCountryName='';

function addListOfCountry() {
	let country = "";

	fetch('../countries.json')
		.then(res => res.json())
		.then(data => {
			country = data;
			// return country.result;
			console.log(country);
			for (let i = 0; i < 243; i++) {

				let originElement = document.createElement("option");
				let destinationElement = document.createElement("option");

				originElement.value = country[i]['name'];
				destinationElement.value = country[i]['name'];

				document.getElementById("origin").appendChild(originElement);
				document.getElementById("destination").appendChild(destinationElement);

			}
		});
}

addListOfCountry();

function addListOfCities() {

	let city = "";

	fetch('../countries.json')
		.then(res => res.json())
		.then(data => {
			country = data;
			// return country.result;
			console.log(country);
			for (let i = 0; i < 243; i++) {

				let originElement = document.createElement("option");
				let destinationElement = document.createElement("option");

				originElement.value = country[i]['name'];
				destinationElement.value = country[i]['name'];

				document.getElementById("origin").appendChild(originElement);
				document.getElementById("destination").appendChild(destinationElement);

			}
		});


}




origin.value = "IN";
destination.value = "US";

originCountryName="India";
destinationCountryName="United States";

countryinput.addEventListener('click', function () {


	fetch('../countries.json')
		.then(res => res.json())
		.then(data => {
			country = data;
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
				.then(data => {
					console.log(data);
					console.log(data['Places']);

					let city = data['Places'];
					let length=city['length'];
					length=Number(length);

					// return country.result;

					console.log(city);
					// let count=0;

					for (let i = 0; i < length; i++) {

						if(city[i]['CountryName']==originCountryName){

							let originElement = document.createElement("option");
							originElement.value = city[i]['Name'];
							document.getElementById("origin-city").appendChild(originElement);
							// console.log(count,city[i]['Name']);
							// count++;

						}
						else if(city[i]['CountryName']==destinationCountryName){

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


// countryinput.addEventListener('click', function () {

// 	fetch('../countries.json')
// 		.then(res => res.json())
// 		.then(data => {
// 			country = data;
// 			// return country.result;
// 			// console.log(country);
// 			for (let i = 0; i < 243; i++) {

// 				if (origin.value == country[i]['name']) {
// 					origin.value = country[i]['code'];
// 					// console.log(country[i]['code'])
// 					// console.log(origin.value);
// 				}
// 				if (destination.value == country[i]['name']) {
// 					destination.value = country[i]['code'];
// 					// console.log(country[i]['code']);
// 					// console.log(destination.value);
// 				}

// 			}



// 			fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${origin.value}/INR/${origin.value}/${origin.value}/${destination.value}/2021-08-28?inboundpartialdate=2021-08-28`, {
// 				"method": "GET",
// 				"headers": {
// 					"x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f",
// 					"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
// 				}
// 			})
// 				.then(resp => resp.json())
// 				.then(result => {
// 					console.log(result);
// 					let count = 0;
// 					let routelength = result['Routes']['length'];
// 					routelength = Number(routelength);
// 					for (let i = 0; i < routelength; i++) {

// 						let destinationId = result["Routes"][i]["DestinationId"];
// 						let price = result["Routes"][i]["Price"];
// 						let datetime = result["Routes"][i]["QuoteDateTime"];

// 						if (price != undefined) {

// 							console.log("Number=", count);
// 							console.log("price=", price);

// 							let quoteId = result["Routes"][i]["QuoteIds"][0];
// 							let quotelength = result["Quotes"]["length"];

// 							quotelength = Number(quotelength);

// 							for (let j = 0; j < quotelength; j++) {

// 								if (quoteId == result['Quotes'][j]['QuoteId']) {

// 									let departureDate = result['Quotes'][j]['OutboundLeg']['DepartureDate'];
// 									let originId = result['Quotes'][j]['OutboundLeg']['OriginId'];
// 									let carrierId = result['Quotes'][j]['OutboundLeg']['CarrierIds'][0];
// 									let placelength = result['Places']['length'];

// 									console.log("DepartureDate=", departureDate);

// 									placelength = Number(placelength);

// 									for (let k = 0; k < placelength; k++) {

// 										if (destinationId == result['Places'][k]['PlaceId']) {

// 											let destinationCity = result['Places'][k]['CityName'];
// 											let destinationCountry = result['Places'][k]['CountryName'];

// 											console.log("DestinationCity=", destinationCity, destinationId);
// 											console.log("DestinatonCountry=", destinationCountry);

// 										}
// 										else if (originId == result['Places'][k]['PlaceId']) {

// 											let originCity = result['Places'][k]['CityName'];
// 											let originCountry = result['Places'][k]['CountryName'];

// 											console.log("OriginCity=", originCity);
// 											console.log("OriginCountry=", originCountry);

// 										}
// 										else {
// 											continue;
// 										}
// 									}

// 									let carrierlength = result['Carriers']['length'];

// 									carrierlength = Number(carrierlength);

// 									for (let k = 0; k < carrierlength; k++) {

// 										if (carrierId == result['Carriers'][k]['CarrierId']) {

// 											let carrierName = result['Carriers'][k]['Name'];
// 											console.log("CarrierName=", carrierName);
// 											// console.log("\n");

// 										}
// 									}

// 								}
// 							}
// 							count++;
// 							// if (count == 8) {
// 							// 	break;
// 							// }
// 							console.log("\n");
// 						}

// 					}

// 				});


// 		});



// });





