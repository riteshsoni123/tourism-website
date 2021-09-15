
let cityinfo = document.querySelector('.city');
let btn = document.querySelector('.submitCity');
let checkinDateInfo = document.querySelector('.checkinDate');
let checkoutDateInfo = document.querySelector('.checkoutDate');
let adultsno = document.querySelector('.adults');


cityinfo.value = 'kolkata';
checkinDateInfo.value = '2021-09-17';
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
                        let starrating = dataHotels['starRatingTitle'];

                        console.log(name);
                        console.log(address);
                        console.log(rooms);
                        console.log(price);
                        console.log(starrating);

                        let inforamtion=document.getElementById("information");

                        let divhotel=document.createElement("div");
                        let divbasic_info=document.createElement("div");

                        let divname=document.createElement("div");
                        let divaddress=document.createElement("div");
                        let divprice=document.createElement("div");
                        let divstars=document.createElement("div");

                        inforamtion.appendChild(divhotel);

                        divhotel.appendChild(divbasic_info);

                        divbasic_info.appendChild(divname);
                        divbasic_info.appendChild(divaddress);
                        divbasic_info.appendChild(divprice);
                        divbasic_info.appendChild(divstars);

                        divhotel.classList.add("hotel");
                        divbasic_info.classList.add("basic-info");
                        divname.classList.add("name");
                        divaddress.classList.add("address");
                        divprice.classList.add("price");
                        divstars.classList.add("stars");

                        divname.innerHTML=name;
                        divaddress.innerHTML=address;
                        divprice.innerHTML=price;
                        divstars.innerHTML=starrating;

                        let divadv_info=document.createElement("div");
                        divhotel.appendChild(divadv_info);
                        divadv_info.classList.add("adv-info");

                        let divhotel_name=document.createElement("div");
                        let hotel_nameh1=document.createElement("h1");

                        divadv_info.appendChild(divhotel_name);
                        divhotel_name.appendChild(hotel_nameh1);

                        hotel_nameh1.innerHTML=name;

                        let divadv_info_sub=document.createElement("div");
                        divadv_info.appendChild(divadv_info_sub);
                        divadv_info_sub.classList.add("adv-info-sub");

                        let overviewlength = Number(overview['length']);
                        for (let j = 0; j < overviewlength; j++) {
                            if (overview[j]['title'] == 'Main amenities') {

                                console.log('Main amenities');

                                let divadv_info_box=document.createElement("div");
                                let divheading=document.createElement("div");
                                let headingh1=document.createElement("h1");
                                let divinfo=document.createElement("div");
                                let infoul=document.createElement("ul");

                                divadv_info_box.classList.add("adv-info-box");
                                divheading.classList.add("heading");
                                divinfo.classList.add("info");

                                divadv_info_sub.appendChild(divadv_info_box);

                                divadv_info_box.appendChild(divheading);
                                divadv_info_box.appendChild(divinfo);

                                divheading.appendChild(headingh1);

                                divinfo.appendChild(infoul);

                                headingh1.innerHTML="Main Amenities"

                                let aminities = overview[j]['content'];
                                let aminitieslength = Number(aminities['length']);

                                for (let k = 0; k < aminitieslength; k++) {

                                    let infoulli=document.createElement("li");
                                    infoul.appendChild(infoulli);
                                    infoulli.innerHTML=aminities[k];

                                    console.log(aminities[k]);

                                }

                                console.log("\n");
                            }
                            if (overview[j]['title'] == 'For families') {

                                console.log('For families');

                                let divadv_info_box=document.createElement("div");
                                let divheading=document.createElement("div");
                                let headingh1=document.createElement("h1");
                                let divinfo=document.createElement("div");
                                let infoul=document.createElement("ul");

                                divadv_info_box.classList.add("adv-info-box");
                                divheading.classList.add("heading");
                                divinfo.classList.add("info");

                                divadv_info_sub.appendChild(divadv_info_box);

                                divadv_info_box.appendChild(divheading);
                                divadv_info_box.appendChild(divinfo);

                                divheading.appendChild(headingh1);

                                divinfo.appendChild(infoul);

                                headingh1.innerHTML="For families";

                                let family = overview[j]['content'];
                                let familylength = Number(family['length']);

                                for (let k = 0; k < familylength; k++) {

                                    let infoulli=document.createElement("li");
                                    infoul.appendChild(infoulli);
                                    infoulli.innerHTML=family[k];

                                    console.log(family[k]);

                                }
                                console.log("\n");
                            }
                            if (overview[j]['title'] == 'What’s around') {

                                console.log('What’s around');

                                let divadv_info_box=document.createElement("div");
                                let divheading=document.createElement("div");
                                let headingh1=document.createElement("h1");
                                let divinfo=document.createElement("div");
                                let infoul=document.createElement("ul");

                                divadv_info_box.classList.add("adv-info-box");
                                divheading.classList.add("heading");
                                divinfo.classList.add("info");

                                divadv_info_sub.appendChild(divadv_info_box);

                                divadv_info_box.appendChild(divheading);
                                divadv_info_box.appendChild(divinfo);

                                divheading.appendChild(headingh1);

                                divinfo.appendChild(infoul);

                                headingh1.innerHTML="What’s around";

                                let around = overview[j]['content'];
                                let aroundlength = Number(around['length']);

                                for (let k = 0; k < aroundlength; k++) {

                                    let infoulli=document.createElement("li");
                                    infoul.appendChild(infoulli);
                                    infoulli.innerHTML=around[k];

                                    console.log(around[k]);

                                }
                                console.log("\n");
                            }
                            if (overview[j]['title'] == 'HOTEL_FREEBIES') {

                                console.log('HOTEL_FREEBIES');

                                // let divadv_info_box=document.createElement("div");
                                // let divheading=document.createElement("div");
                                // let headingh1=document.createElement("h1");
                                // let divinfo=document.createElement("div");
                                // let infoul=document.createElement("ul");

                                // divadv_info_box.classList.add("adv-info-box");
                                // divheading.classList.add("heading");
                                // divinfo.classList.add("info");

                                // divadv_info_sub.appendChild(divadv_info_box);

                                // divadv_info_box.appendChild(divheading);
                                // divadv_info_box.appendChild(divinfo);

                                // divheading.appendChild(headingh1);

                                // divinfo.appendChild(infoul);

                                // headingh1.innerHTML="HOTEL_FREEBIES";

                                let freebies = overview[j]['content'];
                                let freebieslength = Number(freebies['length']);

                                for (let k = 0; k < freebieslength; k++) {

                                    // let infoulli=document.createElement("li");
                                    // infoul.appendChild(infoulli);
                                    // infoulli.innerHTML=freebies[k];

                                    console.log(freebies[k]);

                                }
                                console.log("\n");
                            }
                        }


                        console.log("\n");

                        let divadv_info_box=document.createElement("div");
                        let divheading=document.createElement("div");
                        let headingh1=document.createElement("h1");
                        let divinfo=document.createElement("div");
                        let infoul=document.createElement("ul");

                        divadv_info_box.classList.add("adv-info-box");
                        divheading.classList.add("heading");
                        divinfo.classList.add("info");

                        divadv_info_sub.appendChild(divadv_info_box);

                        divadv_info_box.appendChild(divheading);
                        divadv_info_box.appendChild(divinfo);

                        divheading.appendChild(headingh1);

                        divinfo.appendChild(infoul);

                        headingh1.innerHTML="Types of room";

                        let roomTypelength=roomTypeNames['length'];

                        console.log('types of rooms');

                        for(let j=0;j<roomTypelength;j++){

                            if(roomTypeNames[j]!=""&&roomTypeNames[j]!="x-deleted"){

                                let infoulli=document.createElement("li");
                                infoul.appendChild(infoulli);
                                infoulli.innerHTML=roomTypeNames[j];

                                console.log(roomTypeNames[j]);

                            }
                        }

                        let divroom_info=document.createElement("div");
                        let divroom_heading=document.createElement("div");
                        let room_headingh1=document.createElement("h1");
                        let divroom_img=document.createElement("div");

                        divroom_info.classList.add("room-info");
                        divroom_heading.classList.add("room-heading");
                        divroom_img.classList.add("room-img");

                        divadv_info.appendChild(divroom_info);

                        divroom_info.appendChild(divroom_heading);
                        divroom_info.appendChild(divroom_img);

                        divroom_heading.appendChild(room_headingh1);

                        if(rooms==null){
                            return;
                        }


                        let roomLength=rooms['length'];

                        for(let j=0;j<roomLength;j++){

                            // if(rooms[j]['images'])

                            console.log(rooms[j]['name']);

                            let imageLength=rooms[j]['images']['length'];
                            if(imageLength==0){
                                continue;
                            }

                            console.log(rooms[j]['images'][0]['fullSizeUrl']);

                            let divroom_img_box=document.createElement("div");
                            let divimg=document.createElement("div");
                            let divroom_name=document.createElement("div");
                            let imgimg=document.createElement("img");
                            let room_nameh1=document.createElement("h1");

                            divroom_img_box.classList.add("room-img-box");
                            divimg.classList.add("img");
                            divroom_name.classList.add("room-name");

                            divroom_img.appendChild(divroom_img_box);

                            divroom_img_box.appendChild(divimg);
                            divroom_img_box.appendChild(divroom_name);

                            divimg.appendChild(imgimg);

                            divroom_name.appendChild(room_nameh1);

                            room_nameh1.innerHTML=rooms[j]['name']
                            imgimg.src=rooms[j]['images'][0]['fullSizeUrl'];

                            for(let k=0;k<imageLength;k++){
                                console.log(rooms[j]['images'][k]['fullSizeUrl']);
                            }
                            console.log("\n");
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
