document.addEventListener("DOMContentLoaded", () => {
  // --- Slip Elements ---
  const slipDate = document.getElementById("slip-date");
  const slipItems = document.getElementById("slip-items");
  const slipTotal = document.getElementById("slip-total");

  // --- Form + Buttons ---
  const QButton = document.getElementById("QButton");
  const MButton = document.getElementById("MButton");
  const userNameInput = document.getElementById("userName");
  const userEmailInput = document.getElementById("userMail");
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

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

  // --- Request Quote Button ---
// ✅ Get form elements
const nameInput = document.getElementById("userName");
const emailInput = document.getElementById("userMail");
const quoteBtn = document.getElementById("QButton");
const meetingBtn = document.getElementById("MButton");

// ✅ Your EmailJS IDs (replace with your real ones)
const SERVICE_ID = "service_bdnwc5q";   // from EmailJS dashboard
const TEMPLATE_ID = "template_1e8u7rd"; // from EmailJS dashboard
const PUBLIC_KEY = "L5mm9nhYsTb21CJv1"; // from EmailJS dashboard

// ✅ Initialize EmailJS
(function () {
  emailjs.init(PUBLIC_KEY);
})();

// ✅ Common function to send email
function sendEmail(templateParams, button) {
  button.disabled = true;
  button.textContent = "Sending...";

  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
    .then(() => {
      alert("✅ Your request was sent successfully!");
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send. Please try again later.");
    })
    .finally(() => {
      button.disabled = false;
      button.textContent = button.id === "QButton" ? "Request-A-Quote" : "Book Meeting";
    });
}

// ✅ Quote request
quoteBtn.addEventListener("click", () => {
  if (!nameInput.value || !emailInput.value) {
    alert("⚠️ Please enter your name and email.");
    return;
  }

  const templateParams = {
    from_name: nameInput.value,
    from_email: emailInput.value,
    message: "Client is requesting a quote."
  };

  sendEmail(templateParams, quoteBtn);
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








 


