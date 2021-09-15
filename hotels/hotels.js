
let cityinfo = document.querySelector('.city');
let btn = document.querySelector('.submitCity');
let checkinDateInfo = document.querySelector('.checkinDate');
let checkoutDateInfo = document.querySelector('.checkoutDate');
let adultsno = document.querySelector('.adults');


cityinfo.value = 'kolkata';
checkinDateInfo.value = '2021-09-15';
checkoutDateInfo.value = '2021-09-20';
adultsno.value = '1';

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

            for (let i = 0; i < 3; i++) {

                fetch(`https://hotels-com-provider.p.rapidapi.com/v1/hotels/booking-details?checkout_date=${checkoutDateInfo.value}&hotel_id=${hotels[i]['destinationId']}&currency=INR&locale=en_US&checkin_date=${checkinDateInfo.value}&adults_number=${adultsno.value}&children_ages=4%2C0`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
                        "x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f"
                    }
                })
                    .then(resp => resp.json())
                    .then(dataHotels => {

                        console.log(i);
                        console.log(dataHotels);

                        let name=dataHotels['name'];
                        let address = dataHotels['address']['fullAddress'];
                        let overview = dataHotels['overview']['overviewSections'];
                        let roomTypeNames = dataHotels['roomTypeNames'];
                        let rooms=null;
                        if(dataHotels['roomsAndRates']!=null){
                            rooms = dataHotels['roomsAndRates']['rooms'];
                        }
                        let price=null;
                        if(dataHotels['featuredPrice']!=null){
                            price = dataHotels['featuredPrice']['currentPrice']['formatted'];
                        }
                        else{
                            console.log("buzz");
                            return;
                        }
                        // let rooms = dataHotels['roomsAndRates']['rooms'];
                        // let price = dataHotels['featuredPrice']['currentPrice']['formatted'];
                        let starrating = dataHotels['starRatingTitle'];

                        console.log(name);
                        console.log(address);
                        // console.log(overview);
                        // console.log(roomTypeNames);
                        console.log(rooms);
                        console.log(price);
                        console.log(starrating);

                        let roomLength=rooms['length'];
                        for(let j=0;j<roomLength;j++){
                            console.log(rooms[j]['name']);
                            let imageLength=rooms[j]['images']['length'];
                            for(let k=0;k<imageLength;k++){
                                console.log(rooms[j]['images'][k]['fullSizeUrl']);
                            }
                            console.log("\n");
                        }

                        let overviewlength = Number(overview['length']);
                        for (let j = 0; j < overviewlength; j++) {
                            if (overview[j]['title'] == 'Main amenities') {
                                console.log('Main amenities');
                                let aminities = overview[j]['content'];
                                let aminitieslength = Number(aminities['length']);
                                for (let k = 0; k < aminitieslength; k++) {
                                    console.log(aminities[k]);
                                }
                                console.log("\n");
                            }
                            if (overview[j]['title'] == 'For families') {
                                console.log('For families');
                                let family = overview[j]['content'];
                                let familylength = Number(family['length']);
                                for (let k = 0; k < familylength; k++) {
                                    console.log(family[k]);
                                }
                                console.log("\n");
                            }
                            if (overview[j]['title'] == 'What’s around') {
                                console.log('What’s around');
                                let around = overview[j]['content'];
                                let aroundlength = Number(around['length']);
                                for (let k = 0; k < aroundlength; k++) {
                                    console.log(around[k]);
                                }
                                console.log("\n");
                            }
                            if (overview[j]['title'] == 'HOTEL_FREEBIES') {
                                console.log('HOTEL_FREEBIES');
                                let freebies = overview[j]['content'];
                                let freebieslength = Number(freebies['length']);
                                for (let k = 0; k < freebieslength; k++) {
                                    console.log(freebies[k]);
                                }
                                console.log("\n");
                            }
                        }
                        console.log("\n");
                        let roomTypelength=roomTypeNames['length'];
                        console.log('types of rooms');
                        for(let j=0;j<roomTypelength;j++){
                            if(roomTypeNames[j]!=""&&roomTypeNames[j]!="x-deleted"){
                                console.log(roomTypeNames[j]);
                            }
                        }

                    });
            }


        });
});


// checkoutDateInfo.value='2021-09-20';
// checkinDateInfo.value='2021-09-15';
// adultsno.value='1';
// fetch(`https://hotels-com-provider.p.rapidapi.com/v1/hotels/booking-details?checkout_date=${checkoutDateInfo.value}&hotel_id=239764&currency=INR&locale=en_US&checkin_date=${checkinDateInfo.value}&adults_number=${adultsno.value}&children_ages=4%2C0`, {
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
//         "x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f"
//     }
// })
//     .then(resp => resp.json())
//     .then(dataHotels => {
//         // console.log(i);
//         console.log(dataHotels);
//         let address = dataHotels['address']['fullAddress'];
//         let overview = dataHotels['overview']['overviewSections'];
//         let roomTypeNames = dataHotels['roomTypeNames'];
//         // let rooms = dataHotels['roomsAndRates']['rooms'];
//         let price = dataHotels['featuredPrice']['currentPrice']['formatted'];
//         let starrating = dataHotels['starRatingTitle'];

//         console.log(address);
//         console.log(overview);
//         console.log(roomTypeNames);
//         // console.log(rooms);
//         console.log(price);
//         console.log(starrating);

//     });
