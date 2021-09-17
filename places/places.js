
var button = document.querySelector('.btn');
var inputvalue = document.querySelector('.inputvalue');

btn.addEventListener('click', function () {

    let clintid = "L2LEFRWKXUWBUYFATD3B1KZHYSEWT1TKLL3ARBVK04EXFPEW";
    let clintsecret = "3JNNOQPCFFCPVECEQBRHW0XBVOLAKW25CSVARSNOEJJOD4FY";

    fetch(`https://api.foursquare.com/v2/venues/explore?cat=arts&mode=url&near=${inputvalue.value}&client_id=${clintid}&client_secret=${clintsecret}&v=20210101`
    ).then(resp => resp.json())
        .then(result => {

            console.log(result);
            var length = result['response']['groups'][0]['items']['length'];
            console.log(Number(length));
            length = Number(length);



            for (let i = 0; i < 5; i++) {

                let venue = result['response']['groups'][0]['items'][i]['venue'];
                // let address = venue['location']['formattedAddress'];
                let id = venue['id'];
                let name = venue['name'];
                let address = "";
                let addresslength = venue['location']['formattedAddress']['length'];
                addresslength = Number(addresslength);
                for (let j = 0; j < addresslength; j++) {
                    address = address + venue['location']['formattedAddress'][j] + ", ";
                }


                fetch(`https://api.foursquare.com/v2/venues/${id}/photos?&client_id=${clintid}&client_secret=${clintsecret}&v=20210101`
                ).then(resp => resp.json())
                    .then(photo => {

                        console.log(photo);
                        // console.log(photo['response']['photos']['items'][0]['source']);
                        if (photo['response']['photos']['items']['length'] == 0) {
                            return;
                        }

                        let source = photo['response']['photos']['items'][0];
                        let prefix = source['prefix'];;
                        let suffix = source['suffix'];;
                        let link = `${prefix}300x300${suffix}`;

                        console.log(i);
                        console.log(name)
                        console.log(address);
                        console.log(link);

                        createImages(name, address, link);
                    });

            }
        });
});


function createImages(name, address, link) {

    let placeinformation = document.getElementById("contain");
    let divplace_info_box = document.createElement("div");
    let divplace_img = document.createElement("div");
    let divplace_info = document.createElement("div");
    let divplace_name = document.createElement("div");
    let divplace_address = document.createElement("div");
    let divhead1 = document.createElement("div");
    let divhead_info1 = document.createElement("div");
    let divhead2 = document.createElement("div");
    let divhead_info2 = document.createElement("div");
    let place_imgimg = document.createElement("img");

    divplace_info_box.classList.add("place-info-box");
    divplace_img.classList.add("place-img");
    divplace_info.classList.add("place-info");
    divplace_name.classList.add("place-name");
    divplace_address.classList.add("place-address");
    divhead1.classList.add("head");
    divhead_info1.classList.add("head-info");
    divhead2.classList.add("head");
    divhead_info2.classList.add("head-info");

    placeinformation.appendChild(divplace_info_box);

    divplace_info_box.appendChild(divplace_img);
    divplace_info_box.appendChild(divplace_info);

    divplace_img.appendChild(place_imgimg);

    divplace_info.appendChild(divplace_name);
    divplace_info.appendChild(divplace_address);

    divplace_name.appendChild(divhead1);
    divplace_name.appendChild(divhead_info1);

    divplace_name.appendChild(divhead2);
    divplace_name.appendChild(divhead_info2);

    place_imgimg.src = link;
    divhead1.innerHTML = "Name:";
    divhead_info1.innerHTML = name;
    divhead2.innerHTML = "Address:";
    divhead_info2.innerHTML = address;
    
}