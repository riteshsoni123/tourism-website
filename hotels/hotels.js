fetch("https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?locale=en_US&currency=USD&query=varanasi", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
        "x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f"
    }
})
    .then(resp => resp.json())
    .then(dataHotels => {
        console.log(dataHotels);
    });

// 1885977536

fetch("https://hotels-com-provider.p.rapidapi.com/v1/hotels/booking-details?checkout_date=2022-03-27&hotel_id=1885977536&currency=USD&locale=en_US&checkin_date=2022-03-26&adults_number=1&children_ages=4%2C0", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
        "x-rapidapi-key": "05dce523ffmshb8fc17a05f8c86ap156854jsn4d098c6ba72f"
    }
})
    .then(resp => resp.json())
    .then(dataHotels => {
        console.log(dataHotels);
    });