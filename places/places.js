
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

            for (let i = 0; i < 5; i++) {

                let venue = result['response']['groups'][0]['items'][i]['venue'];
                // let address = venue['location']['formattedAddress'];
                let id = venue['id'];
                let name=venue['name'];
                let address="";
                let addresslength=venue['location']['formattedAddress']['length'];
                addresslength=Number(addresslength);
                for(let j=0;j<addresslength;j++){
                    address=address+venue['location']['formattedAddress'][j]+", ";
                }


                fetch(`https://api.foursquare.com/v2/venues/${id}/photos?&client_id=${clintid}&client_secret=${clintsecret}&v=20210101`
                ).then(resp => resp.json())
                    .then(photo => {

                        // console.log(photo);
                        // console.log(photo['response']['photos']['items'][0]['source']);

                        let source = photo['response']['photos']['items'][0];
                        let prefix = source['prefix'];;
                        let suffix = source['suffix'];;
                        let link = `${prefix}300x300${suffix}`;

                        console.log(name)
                        console.log(address);
                        console.log(link);

                        let container = document.getElementById("contain");
                        let div = document.createElement("div");
                        let img = document.createElement("img");
                        img.src = link;
                        container.appendChild(div);
                        div.appendChild(img);

                    });

            }
        });
});