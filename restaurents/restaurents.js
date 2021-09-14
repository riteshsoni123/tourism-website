
var button = document.querySelector('.submitCity');
var inputvalue = document.querySelector('.city');


submitCity.addEventListener('click', function () {
    let clintid = "L2LEFRWKXUWBUYFATD3B1KZHYSEWT1TKLL3ARBVK04EXFPEW";
    let clintsecret = "3JNNOQPCFFCPVECEQBRHW0XBVOLAKW25CSVARSNOEJJOD4FY";

    fetch(`https://api.foursquare.com/v2/venues/explore?cat=food&mode=url&near=${inputvalue.value}&client_id=${clintid}&client_secret=${clintsecret}&v=20210101`
    )
        .then(resp => resp.json())
        .then(dataRestaurents => {

            console.log(dataRestaurents);
            let items = dataRestaurents['response']['groups'][0]['items'];
            console.log(items);
            let length = Number(items['length']);
            for (let i = 0; i < length; i++) {
                let name = items[i]['venue']['name'];
                let address = "";
                let location = items[i]['venue']['location']['formattedAddress'];
                addresslen = Number(location['length']);
                for (let j = 0; j < addresslen; j++) {
                    address = address + location[j] + ",";
                }
                console.log(i);
                console.log(name);
                console.log(address);
            }

        });
});

// let clintid = "L2LEFRWKXUWBUYFATD3B1KZHYSEWT1TKLL3ARBVK04EXFPEW";
// let clintsecret = "3JNNOQPCFFCPVECEQBRHW0XBVOLAKW25CSVARSNOEJJOD4FY";

// fetch(`https://api.foursquare.com/v2/venues/explore?cat=food&mode=url&near=varanasi&client_id=${clintid}&client_secret=${clintsecret}&v=20210101`
// )
//     .then(resp => resp.json())
//     .then(dataRestaurents => {

//         console.log(dataRestaurents);
//         let items = dataRestaurents['response']['groups'][0]['items'];
//         console.log(items);
//         let length = Number(items['length']);
//         for (let i = 0; i < length; i++) {
//             let name = items[i]['venue']['name'];
//             let address = "";
//             let location = items[i]['venue']['location']['formattedAddress'];
//             addresslen = Number(location['length']);
//             for (let j = 0; j < addresslen; j++) {
//                 address = address + location[j] + ",";
//             }
//             console.log(i);
//             console.log(name);
//             console.log(address);
//         }

//     });