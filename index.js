// if click on get data plz wait some second 
let details1 = document.getElementById('dimention');
let details2 = document.getElementById('location_info');
let cardlist = document.getElementById('cardlist');
let input = document.getElementById("myFilter");
let cards = document.getElementsByClassName('card');

        details1.classList.add("visually-hidden");
        details2.classList.add("visually-hidden");




function getLocation() {

     document.getElementById('searchBox').classList.remove("visually-hidden");
     details1.classList.remove("visually-hidden");
     details2.classList.remove("visually-hidden");

     btn = document.getElementsByClassName('btn')[0]
     btn.classList.add("visually-hidden");

   const url="https://api.ipify.org?format=json";
    getData(url);
    async function getData(url) {

      const response1 = await fetch(url);
            ip = await response1.json();

       document.getElementById("heading").innerHTML=`MY Public IP ADDRESS : ${ip.ip}`

      const url2 = `https://ipinfo.io/${ip.ip}/json?token=e1640b0a01fbe5`;
      const response2 = await fetch(url2);
         locationData = await response2.json();
      const url3=`https://api.postalpincode.in/pincode/${locationData.postal}`;
       const response3 = await fetch(url3);
             data = await response3.json();
            const regex = /[1-9]/g;
             let count = Number(data[0].Message.match(regex));

       navigator.geolocation.getCurrentPosition(positionResolve,positionReject);

       function positionResolve(position) {
            map = document.getElementById('map')
            map.innerHTML = `<iframe 
                            src="https://maps.google.com?q=+${position.coords.latitude},+${position.coords.longitude}&amp;output=embed"
                class="w-100 "
                "style =height:200;"
                 scrolling = "no";
                 loading="lazy"
                 allow="geolocation" >
                 </iframe>`  
                 const date = new Date();
                 let day = date.getDate();
                 let month = date.getMonth() + 1;
                 let year = date.getFullYear();
                 let hours = date.getHours();
                 let minutes = date.getMinutes(); 
                 let seconds = date.getSeconds(); 

                 let currentDate = `${day}-${month}-${year}`;
                 console.log(currentDate); 
                 details2.innerHTML =`<h4>Time Zone: ${locationData.timezone}</h4>
                <h4>Date And Time: ${currentDate} 
                ${hours}:${minutes}:${seconds}</h4>
                <h4>Pincode: ${locationData.postal}</h4>
                <h4>Message: ${data[0].Message}</h4>`;

 details1.innerHTML =`<h4><span>lat: ${position.coords.latitude}</span>
                                 <span>City: ${locationData.city}</span>
                                 <span>Organigation: ${locationData.org}</span></h4>
                                <h4><span>long: ${position.coords.longitude}</span>
            <span style="padding-right:320px;">Region: ${locationData.region}</span>
                            <span>Hostname: dns.google</span></h4>`;         
         }

        function positionReject(position) {

     console.log("Geolocation is not supported by this browser.");

           }

 while(count>0) {
                let card = document.createElement('div');
                    card.classList.add('card');
                    card.setAttribute("style", "width:100%; box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;")
                    card.innerHTML=` <div class="card-body">
                   <h4 class="card-text card-title">Name :
                   <span style="font-weight: 100;"> ${data[0].PostOffice[count-1].Name}
    </span>
            </h4>               
     <h4 class="card-text">Branch Type :
    <span style="font-weight: 100;"> ${data[0].PostOffice[count-1].BranchType}
    </span>
           </h4>
     <h4 class="card-text">Delivery Status :
     <span style="font-weight: 100;"> ${data[0].Status}
     </span>
            </h4>
    <h4 class="card-text">District :
    <span style="font-weight: 100;">  ${data[0].PostOffice[count-1].District}
      </span>
             </h4>
    <h4 class="card-text">Division :
    <span style="font-weight: 100;"> ${data[0].PostOffice[count-1].Division}
        </span>
             </h4>            
         </div>`
     cardlist.appendChild(card);
         count--;
 }

 let cards= document.getElementsByClassName('card');
     input.addEventListener("keyup",()=>{
      search = input.value.toLowerCase();      

    for (var i = 0; i < cards.length; i++) {
       console.log(search);
        console.log(cards[i].innerText.toLowerCase());
        if(cards[i].innerText.toLowerCase().includes(search)) {

          cards[i].classList.remove("visually-hidden");
              } else {

             cards[i].classList.add("visually-hidden");
                    }
                  }
            })



        }   

}    


