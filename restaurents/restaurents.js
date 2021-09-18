
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
                let venue = dataRestaurents['response']['groups'][0]['items'][i]['venue'];
                let id = venue['id'];

                addresslen = Number(location['length']);
                for (let j = 0; j < addresslen; j++) {
                    address = address + location[j] + ",";
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
                        console.log(name);
                        console.log(address);
                        console.log(link);

                        createImages(name, address, link);
                    });
            }

        });
});



function createImages(name, address, link) {

    let placeinformation = document.getElementById("contain");

    let divplace_info_box=create(placeinformation,"div","place-info-box");

    let divplace_img=create(divplace_info_box,"div","place-img");

    let divplace_info=create(divplace_info_box,"div","place-info");

    let place_imgimg=createNoClass(divplace_img,"img");

    let divplace_name=create(divplace_info,"div","place-name");

    let divplace_address=create(divplace_info,"div","place-address");

    let divhead1=create(divplace_name,"div","head");

    let divhead_info1=create(divplace_name,"div","head-info");

    let divhead2=create(divplace_name,"div","head");

    let divhead_info2=create(divplace_address,"div","head-info");

    place_imgimg.src = link;
    divhead1.innerHTML = "Name:";
    divhead_info1.innerHTML = name;
    divhead2.innerHTML = "Address:";
    divhead_info2.innerHTML = address;

}

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