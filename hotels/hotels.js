
let cityinfo = document.querySelector('.city');
let btn = document.querySelector('.submitCity');
let checkinDateInfo = document.querySelector('.checkinDate');
let checkoutDateInfo = document.querySelector('.checkoutDate');
let adultsno = document.querySelector('.adults');


cityinfo.value = 'kolkata';
checkinDateInfo.value = '2021-09-19';
checkoutDateInfo.value = '2021-09-23';
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

                        let name = dataHotels['name'];
                        let address = dataHotels['address']['fullAddress'];
                        let overview = dataHotels['overview']['overviewSections'];
                        let roomTypeNames = dataHotels['roomTypeNames'];
                        let rooms = null;
                        if (dataHotels['roomsAndRates'] != null) {
                            rooms = dataHotels['roomsAndRates']['rooms'];
                        }
                        let price = null;
                        if (dataHotels['featuredPrice'] != null) {
                            price = dataHotels['featuredPrice']['currentPrice']['formatted'];
                        }
                        else {
                            console.log("buzz");
                            return;
                        }
                        let starrating = dataHotels['starRatingTitle'];

                        console.log(name);
                        console.log(address);
                        console.log(rooms);
                        console.log(price);
                        console.log(starrating);

                        let divhotel = createBasicInfo(name, address, price, starrating);
                        let divadv_info = createdivadv_info(divhotel);
                        let divadv_info_sub = createdivadv_info_sub(divadv_info, name);

                        let overviewlength = Number(overview['length']);

                        for (let j = 0; j < overviewlength; j++) {
                            if (overview[j]['title'] == 'Main amenities') {

                                console.log('Main amenities');

                                let divadv_info_box = createdivadv_info_box(divadv_info_sub);
                                createdivheading(divadv_info_box, "Main Amenities");
                                let infoul = createinfoul(divadv_info_box);

                                let aminities = overview[j]['content'];
                                let aminitieslength = Number(aminities['length']);

                                for (let k = 0; k < aminitieslength; k++) {
                                    createinfoulli(infoul, aminities[k]);
                                    console.log(aminities[k]);
                                }

                                console.log("\n");
                            }
                            if (overview[j]['title'] == 'For families') {

                                console.log('For families');

                                let divadv_info_box = createdivadv_info_box(divadv_info_sub);
                                createdivheading(divadv_info_box, "For families");
                                let infoul = createinfoul(divadv_info_box);


                                let family = overview[j]['content'];
                                let familylength = Number(family['length']);

                                for (let k = 0; k < familylength; k++) {

                                    createinfoulli(infoul, family[k]);
                                    console.log(family[k]);

                                }
                                console.log("\n");
                            }
                            if (overview[j]['title'] == 'What’s around') {

                                console.log('What’s around');

                                let divadv_info_box = createdivadv_info_box(divadv_info_sub);
                                createdivheading(divadv_info_box, "What’s around");
                                let infoul = createinfoul(divadv_info_box);


                                let around = overview[j]['content'];
                                let aroundlength = Number(around['length']);

                                for (let k = 0; k < aroundlength; k++) {

                                    createinfoulli(infoul, around[k]);
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

                        let divadv_info_box = createdivadv_info_box(divadv_info_sub);
                        createdivheading(divadv_info_box, "Types of rooms");
                        let infoul = createinfoul(divadv_info_box);

                        let roomTypelength = roomTypeNames['length'];

                        console.log('Types of rooms');

                        for (let j = 0; j < roomTypelength; j++) {

                            if (roomTypeNames[j] != "" && roomTypeNames[j] != "x-deleted") {

                                createinfoulli(infoul, roomTypeNames[j]);
                                console.log(roomTypeNames[j]);

                            }
                        }

                        let divroom_info = createdivroom_info(divadv_info);
                        let divroom_img = createdivroom_img(divroom_info);

                        if (rooms == null) {
                            return;
                        }


                        let roomLength = rooms['length'];

                        for (let j = 0; j < roomLength; j++) {

                            // if(rooms[j]['images'])

                            console.log(rooms[j]['name']);

                            let imageLength = rooms[j]['images']['length'];
                            if (imageLength == 0) {
                                continue;
                            }

                            console.log(rooms[j]['images'][0]['fullSizeUrl']);

                            let divroom_img_box = document.createElement("div");
                            let divimg = document.createElement("div");
                            let divroom_name = document.createElement("div");
                            let imgimg = document.createElement("img");
                            let room_nameh1 = document.createElement("h1");

                            divroom_img_box.classList.add("room-img-box");
                            divimg.classList.add("img");
                            divroom_name.classList.add("room-name");

                            divroom_img.appendChild(divroom_img_box);

                            divroom_img_box.appendChild(divimg);
                            divroom_img_box.appendChild(divroom_name);

                            divimg.appendChild(imgimg);

                            divroom_name.appendChild(room_nameh1);

                            room_nameh1.innerHTML = rooms[j]['name']
                            imgimg.src = rooms[j]['images'][0]['fullSizeUrl'];

                            for (let k = 0; k < imageLength; k++) {
                                console.log(rooms[j]['images'][k]['fullSizeUrl']);
                            }
                            console.log("\n");
                        }


                    });
            }


        });
});

// creating the button inside the basic-info class
let sectionhotel_info = document.querySelector(".hotel-info");
let childhotel_info = sectionhotel_info.children;

function createBtn(div) {
    let submit = document.createElement("button");
    submit.classList.add("btn");
    div.appendChild(submit);
    return div;
}

for (let i = 0; i < childhotel_info.length; i++) {
    let divbasic_info = childhotel_info[i].children;
    createBtn(divbasic_info[0]);
}

// making the us of the button to show the information to the user
sectionhotel_info.addEventListener('click', (event) => {
    if (event.target.tagName === "BUTTON") {
        let button = event.target;
        let divbasic_info = button.parentNode;
        let divhotel = divbasic_info.parentNode;
        let tmp = divhotel.children;
        if (button.className === "btn") {
            let disp = tmp[1].style.display;
            console.log(disp);
            tmp[1].style.display = "flex";
            if (disp === "flex") {
                tmp[1].style.display = "none";
            }
            else {
                tmp[1].style.display = "flex";
            }

        }
    }
});

function createBasicInfo(name, address, price, starrating) {

    let inforamtion = document.getElementById("information");

    let divhotel = document.createElement("div");
    let divbasic_info = document.createElement("div");

    let divname = document.createElement("div");
    let divaddress = document.createElement("div");
    let divprice = document.createElement("div");
    let divstars = document.createElement("div");

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

    divname.innerHTML = name;
    divaddress.innerHTML = address;
    divprice.innerHTML = price;
    divstars.innerHTML = starrating;
    divbasic_info = createBtn(divbasic_info);

    return divhotel;
}

function createdivadv_info(divhotel) {

    let divadv_info = document.createElement("div");
    divhotel.appendChild(divadv_info);
    divadv_info.classList.add("adv-info");

    return divadv_info;

}

function createdivadv_info_sub(divadv_info, name) {

    let divhotel_name = document.createElement("div");
    let hotel_nameh1 = document.createElement("h1");

    divhotel_name.classList.add("hotel-name");

    divadv_info.appendChild(divhotel_name);
    divhotel_name.appendChild(hotel_nameh1);

    hotel_nameh1.innerHTML = name;

    let divadv_info_sub = document.createElement("div");
    divadv_info.appendChild(divadv_info_sub);
    divadv_info_sub.classList.add("adv-info-sub");

    return divadv_info_sub;
}

function createdivheading(divadv_info_box, value) {

    let divheading = document.createElement("div");
    let headingh1 = document.createElement("h1");
    divheading.classList.add("heading");
    divadv_info_box.appendChild(divheading);
    divheading.appendChild(headingh1);
    headingh1.innerHTML = value;
}
function createinfoul(divadv_info_box) {

    let divinfo = document.createElement("div");
    let infoul = document.createElement("ul");
    divinfo.classList.add("info");
    divadv_info_box.appendChild(divinfo);
    divinfo.appendChild(infoul);

    return infoul;
}
function createdivadv_info_box(divadv_info_sub) {

    let divadv_info_box = document.createElement("div");
    divadv_info_box.classList.add("adv-info-box");
    divadv_info_sub.appendChild(divadv_info_box);

    return divadv_info_box;
}
function createinfoulli(infoul, value) {
    let infoulli = document.createElement("li");
    infoul.appendChild(infoulli);
    infoulli.innerHTML = value;
}
function createdivroom_info(divadv_info) {
    let divroom_info = document.createElement("div");
    divroom_info.classList.add("room-info");
    divadv_info.appendChild(divroom_info);

    return divroom_info;
}
function createdivroom_img(divroom_info) {
    let divroom_heading = document.createElement("div");
    let room_headingh1 = document.createElement("h1");

    let divroom_img = document.createElement("div");

    divroom_heading.classList.add("room-heading");
    divroom_img.classList.add("room-img");


    divroom_info.appendChild(divroom_heading);
    divroom_info.appendChild(divroom_img);

    divroom_heading.appendChild(room_headingh1);

    room_headingh1.innerHTML = "Images of Rooms";

    return divroom_img;
}