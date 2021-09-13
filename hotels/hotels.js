
let cityinfo = document.querySelector('.city');
let btn = document.querySelector('.submitCity');
let checkinDateInfo=document.querySelector('.checkinDate');
let checkoutDateInfo=document.querySelector('.checkoutDate');
let adultsno=document.querySelector('.adults');



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
            let hotels = dataHotels['suggestions'][1]['entities'];
            console.log(hotels);

            console.log(checkoutDateInfo.value);
            console.log(checkinDateInfo.value);
            console.log(hotels[0]['destinationId']);
            console.log(adultsno.value);
            // console.log();

            for (let i = 0; i < 4; i++) {

                fetch(`https://hotels-com-provider.p.rapidapi.com/v1/hotels/booking-details?checkout_date=${checkoutDateInfo.value}&hotel_id=${hotels[i]['destinationId']}&currency=INR&locale=en_US&checkin_date=${checkinDateInfo.value}&adults_number=${adultsno.value}&children_ages=4%2C0`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
                        "x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f"
                    }
                })
                    .then(resp => resp.json())
                    .then(dataHotels => {
                        // console.log(dataHotels);
                        let address = dataHotels['address']['fullAddress'];
                        let overview = dataHotels['overview']['overviewSections'];
                        let roomTypeNames = dataHotels['roomTypeNames'];
                        let rooms = dataHotels['roomsAndRates']['rooms'];
                        let price = dataHotels['featuredPrice']['currentPrice']['formatted'];
                        let starrating = dataHotels['starRatingTitle'];

                        console.log(address);
                        console.log(overview);
                        console.log(roomTypeNames);
                        console.log(rooms);
                        console.log(price);
                        console.log(starrating);

                    });
            }


        });
});




// overviewselection
// roomTypeNames
// starrating
// price
// address

