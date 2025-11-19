document.addEventListener("DOMContentLoaded", () => {
  // --- Slip Elements ---
  const slipDate = document.getElementById("slip-date");
  const slipItems = document.getElementById("slip-items");
  const slipTotal = document.getElementById("slip-total");
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

  // --- Form + Buttons ---


  let currentItems = [];
  let currentTotal = 0;

  // --- Update Slip ---
  function updateSlip() {
    slipDate.textContent = "Date: " + new Date().toLocaleDateString();

    const selected = document.querySelectorAll("input[type='checkbox']:checked");
    let items = [];
    let total = 0;
    let discount = false;

    slipItems.innerHTML = "";

    selected.forEach(input => {
      const name = input.dataset.name || "Unnamed Item";
      const price = input.dataset.price;

      if (price === "discount") {
        discount = true;
      } else if (price && !isNaN(price)) {
        const value = parseFloat(price);
        total += value;
        items.push({ name, value });
      }
    });

    if (discount) {
      total = total * 0.9;
      items.push({ name: "10% discount applied", value: "-10%" });
    }

    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.value === "-10%" ? item.value : "R" + item.value}`;
      slipItems.appendChild(li);
    });

    slipTotal.textContent = "R" + total.toFixed(2);

    currentItems = items;
    currentTotal = total;
  }

  // --- Keep Slip Updated ---
  checkboxes.forEach(input => {
    input.addEventListener("change", updateSlip);
  });
  setInterval(updateSlip, 1000);


//  Your EmailJS IDs and Key
const SERVICE_ID = "service_bdnwc5q";   // from EmailJS dashboard
const TEMPLATE_ID = "template_1e8u7rd"; // from EmailJS dashboard
const PUBLIC_KEY = "L5mm9nhYsTb21CJv1"; // from EmailJS dashboard

//   Initialize EmailJS
(function () {
  emailjs.init(PUBLIC_KEY);
})();
  const MButton = document.getElementById("MButton");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userMail");

const btn = document.getElementById('QButton');
 btn.addEventListener('click', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';



     const params = {
    user_name: userName.value,
    user_email: userEmail.value,
    items: slipItems.textContent,
    total: slipTotal.textContent,
    date: slipDate.textContent,
  };

   emailjs.send(SERVICE_ID, TEMPLATE_ID, params,this)
    .then(() => {
      btn.textContent = 'Request-A-Quote';
      alert('Sent!');
    }, (err) => {
      btn.textContent = 'Request-A-Quote';
      alert(JSON.stringify(err));
    });
});




  // --- Book Meeting Button ---
  MButton.addEventListener("click", () => {
    window.location.href = "#booking-calendar-link"; // change link
  });

  // --- NAV TIME / LOCATION / WEATHER ---
  const timeEl = document.getElementById("navTime");
  const locationEl = document.getElementById("navLocation");
  const weatherEl = document.getElementById("navWeather");

  function updateTime() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString();
  }
  updateTime();
  setInterval(updateTime, 1000);

  const API_KEY = "d0b0bf933be40c2edd9b8200f35daece";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();

        locationEl.textContent = `${data.name}, ${data.sys.country}`;
        weatherEl.textContent = `${data.weather[0].description}, ${data.main.temp}°C`;
      } catch (err) {
        locationEl.textContent = "Location unavailable";
        weatherEl.textContent = "Weather unavailable";
      }
    }, () => {
      locationEl.textContent = "Permission denied";
    });
  } else {
    locationEl.textContent = "Location not supported";
  }
});


   function toggleDrawer() {
      document.getElementById("drawer").classList.toggle("open");
   };









 


