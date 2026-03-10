<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <title>Amazon Deals</title>
  <style>
body{
font-family: Arial;
background:#f5f5f5;
text-align:center;
}

h1{
margin-top:20px;
}

.products{
display:flex;
flex-wrap:wrap;
justify-content:center;
gap:20px;
padding:20px;
}

.card{
background:white;
padding:15px;
border-radius:10px;
width:220px;
box-shadow:0 4px 10px rgba(0,0,0,0.1);
}

.card img{
width:100%;
border-radius:8px;
height:auto;
display:block;
}

.card a{
display:block;
margin-top:10px;
background:#ff9900;
color:white;
padding:10px;
text-decoration:none;
border-radius:6px;
font-weight:bold;
}

.card a:hover{
background:#e68a00;
}
</style>
  <style>body { box-sizing: border-box; }</style>
  <script src="https://cdn.tailwindcss.com/3.4.17" type="text/javascript"></script>
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>
  <script src="/_sdk/element_sdk.js" type="text/javascript"></script>
 </head>
 <body>
  <h1>🔥 Amazon Best Deals</h1>
  <div class="products" id="products"></div>
  <script>

const products = [

{
name:"Wireless Earbuds",
img:"https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
link:"https://amzn.to/4lh1nZr"
},

{
name:"Smart Watch",
img:"https://m.media-amazon.com/images/I/61ZjlBOp+rL._AC_SL1500_.jpg",
link:"https://amzn.to/4d7byxw"
},

{
name:"SSD Drive",
img:"https://m.media-amazon.com/images/I/81mS1j5nqBL._AC_SL1500_.jpg",
link:"https://amzn.to/40T35qo"
},

{
name:"Bluetooth Headphones",
img:"https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg",
link:"https://amzn.to/4ud1BoF"
},

{
name:"Speaker",
img:"https://m.media-amazon.com/images/I/71l2q6v1D+L._AC_SL1500_.jpg",
link:"https://amzn.to/40SpLXM"
},

{
name:"Webcam",
img:"https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg",
link:"https://amzn.to/3Nc6Tjs"
},

{
name:"Power Bank",
img:"https://m.media-amazon.com/images/I/71eO8m8s0BL._AC_SL1500_.jpg",
link:"https://amzn.to/46M2FFY"
},

{
name:"Smart Hub",
img:"https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_SL1500_.jpg",
link:"https://amzn.to/47kGcQm"
},

{
name:"Mobile Mission",
img:"https://m.media-amazon.com/images/I/81mS1j5nqBL._AC_SL1500_.jpg",
link:"https://www.amazon.com/hz/mobile/mission?_encoding=UTF8&p=l8lgZu%2FzlWnt2d4LjvsnaDjUpiaf0risM0OXG%2FqxZ3O1INV3rH5MDVL5X6ch7TbjZYfKbI766fYgIFHmBVy3TzdEv8ZvNmanHHDTznRu0ctrE%2FqDhs8PG9zpGws8jHl9BLEAvADcvSAg6CH3yIona7xdKE6UUGb9xxFd2ZZc67BFoV4d0lwKu8oMbSiahUTB4pV%2BUbAcoTyaKKTBhrExqoB9e%2BZ%2FH9W%2Buwt1m3rPT2J%2BB5PkGVJ7Xz3YeZk9ulriZwEXhkeKPW562R4XzxxZumfFN6vcxV5KV1Ng8W0o2z6k3l5hSZq0vlFlcHF%2FzRrqLIcn5AFfdGdKcQYxdMaKMgQ6I7WiPO6U06kEUnEV6BPubiSInU%2BWzI7aWUIVQAStJaEy7Txjouq%2F2iKD9DlZaQrTREikHJzyT4VOcj728FPoA9x1eV%2BETA%3D%3D"
},

{
name:"Portable Monitor",
img:"https://m.media-amazon.com/images/I/81mS1j5nqBL._AC_SL1500_.jpg",
link:"https://www.amazon.com/Coolby-15-6inch-1920x1080-Computer-Charging/dp/B0CRR6YQ6N"
},

{
name:"Wireless Earphones",
img:"https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg",
link:"https://www.amazon.com/TAGRY-Bluetooth-Headphones-Earphones-Waterproof/dp/B09DT48V16"
},

{
name:"iPhone Titanium",
img:"https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
link:"https://www.amazon.com/Apple-iPhone-Version-Desert-Titanium/dp/B0DPJMTH4N"
},

{
name:"iPad Air",
img:"https://m.media-amazon.com/images/I/61ZjlBOp+rL._AC_SL1500_.jpg",
link:"https://www.amazon.com/Apple-11-inch-Wi-Fi-Cellular-128GB/dp/B0FG8HLRZY"
},

{
name:"Gaming Controller",
img:"https://m.media-amazon.com/images/I/71l2q6v1D+L._AC_SL1500_.jpg",
link:"https://www.amazon.com/mh?_encoding=UTF8&s=B0FRLJ3YVM%2CB0D7VG4754"
},

{
name:"Tech Bundle",
img:"https://m.media-amazon.com/images/I/71eO8m8s0BL._AC_SL1500_.jpg",
link:"https://www.amazon.com/mh?_encoding=UTF8&s=B0G4SWDNBB%2CB0DPJMTH4N%2CB0DP3CP2SY"
},

{
name:"Gaming Laptop",
img:"https://m.media-amazon.com/images/I/81mS1j5nqBL._AC_SL1500_.jpg",
link:"https://www.amazon.com/Display-Processor-Graphics-Windows-AG15-32P-39R2/dp/B0DT7FC9B7"
},

{
name:"Unlocked Smartphone",
img:"https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg",
link:"https://www.amazon.com/International-Unlocked-T-Mobile-Snapdragon-Smartphone/dp/B0DTHQVYWR"
}

];

const container = document.getElementById("products");

products.forEach(product => {

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${product.img}" alt="${product.name}" loading="lazy">
<h3>${product.name}</h3>
<a href="${product.link}" target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
`;

container.appendChild(card);

});

</script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9da36679f3d72d86',t:'MTc3MzE1NzA0Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
