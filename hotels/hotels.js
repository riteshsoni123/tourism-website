
let cityinfo = document.querySelector('.city');
let btn = document.querySelector('.submitCity');



submitCity.addEventListener('click', function () {
    fetch(`https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?locale=en_IN&currency=INR&query=${cityinfo.value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
            "x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f"
        }
    })
        .then(resp => resp.json())
        .then(dataHotels => {
            console.log(dataHotels);
            let hotels=dataHotels['suggestions'][1]['entities'];
            console.log(hotels);
        });
});




// overviewselection
// roomTypeNames
// starrating
// price
// address

// fetch("https://hotels-com-provider.p.rapidapi.com/v1/hotels/booking-details?checkout_date=2022-03-27&hotel_id=2233324416&currency=INR&locale=en_US&checkin_date=2022-03-26&adults_number=1&children_ages=4%2C0", {
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
//         "x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f"
//     }
// })
//     .then(resp => resp.json())
//     .then(dataHotels => {
//         console.log(dataHotels);
//         let address=dataHotels['address']['fullAddress'];
//         let overview=dataHotels['overview']['overviewSections'];
//         let roomTypeNames=dataHotels['roomTypeNames'];
//         let rooms=dataHotels['roomsAndRates']['rooms'];
//         let price=dataHotels['featuredPrice']['currentPrice']['formatted'];
//         let starrating=dataHotels['starRatingTitle'];

//         console.log(address);
//         console.log(overview);
//         console.log(roomTypeNames);
//         console.log(rooms);
//         console.log(price);
//         console.log(starrating);

//     });