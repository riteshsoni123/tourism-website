
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
                        let divadv_info=create(divhotel,"div","adv-info");
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

                            let divroom_img_box=create(divroom_img,"div","room-img-box");
                            let divimg=create(divroom_img_box,"div","img");
                            let divroom_name=create(divroom_img_box,"div","room-name");
                            let imgimg=createNoClass(divimg,"img")
                            let room_nameh1=createNoClass(divroom_name,"h1");


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
    let divhotel=create(inforamtion,"div","hotel");
    let divbasic_info=create(divhotel,"div","basic-info");
    let divname=create(divbasic_info,"div","name");
    let divaddress=create(divbasic_info,"div","address");
    let divprice=create(divbasic_info,"div","price");
    let divstars=create(divbasic_info,"div","stars");

    divname.innerHTML = name;
    divaddress.innerHTML = address;
    divprice.innerHTML = price;
    divstars.innerHTML = starrating;
    divbasic_info = createBtn(divbasic_info);

    return divhotel;
}
function createdivadv_info_sub(divadv_info, name) {

    let divhotel_name=create(divadv_info,"div","hotel-name");
    let hotel_nameh1=createNoClass(divhotel_name,"h1");
    hotel_nameh1.innerHTML = name;
    let divadv_info_sub=create(divadv_info,"div","adv-info-sub");

    return divadv_info_sub;
}

function createdivheading(divadv_info_box, value) {

    let divheading=create(divadv_info_box,"div","heading");
    let headingh1=createNoClass(divheading,"h1");

    headingh1.innerHTML = value;
}
function createinfoul(divadv_info_box) {

    let divinfo=create(divadv_info_box,"div","info");
    let infoul=createNoClass(divinfo,"ul");

    return infoul;
}
function createdivadv_info_box(divadv_info_sub) {

    let divadv_info_box=create(divadv_info_sub,"div","adv-info-box");

    return divadv_info_box;
}
//////////////////////////
function create(parent,childTag,className){
    let child=document.createElement(childTag);
    child.classList.add(className);
    parent.appendChild(child);
    return child;
}

function createNoClass(parent,childTag){
    let child=document.createElement(childTag);
    parent.appendChild(child);
    return child;
}
//////////////////////////////////////////
function createinfoulli(infoul, value) {

    let infoulli=createNoClass(infoul,"li");
    infoulli.innerHTML = value;
}
function createdivroom_info(divadv_info) {

    let divroom_info=create(divadv_info,"div","room-info")
    return divroom_info;
}
function createdivroom_img(divroom_info) {

    let divroom_heading=create(divroom_info,"div","room-heading");
    let room_headingh1=createNoClass(divroom_heading,"h1");
    room_headingh1.innerHTML = "Images of Rooms";
    let divroom_img=create(divroom_info,"div","room-img");

    return divroom_img;
}