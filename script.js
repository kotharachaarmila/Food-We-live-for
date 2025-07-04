// Open/Close for login/register wrapper
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const iconClose = document.querySelector('.icon-close');

// Optional check
if (registerLink && loginLink && wrapper) {
  registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
  });

  loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
  });
}

if (iconClose && wrapper) {
  iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
  });
}

// === Donate Popup ===
const donatePopup = document.getElementById('donatepopup');
const donateBtn = document.querySelector('.btnDonate-popup');

if (donateBtn && donatePopup) {
  const donateClose = donatePopup.querySelector('.icon-close');

  donateBtn.addEventListener('click', () => {
    donatePopup.classList.add('active');
  });

  donateClose.addEventListener('click', () => {
    donatePopup.classList.remove('active');
  });
}

// === Quiz Button (Redirects to quiz.html) ===
const quizBtn = document.querySelector('.btnquiz-popup');
if (quizBtn) {
  quizBtn.addEventListener('click', () => {
    window.location.href = "quiz.html";
  });
}

// === Logout ===
function logout() {
  localStorage.removeItem("isLoggedIn");
  alert("Logged out!");
}

// === Home/About toggle ===
const homeBtn = document.querySelector('.btnhome-popup');
const aboutBtn = document.querySelector('.btnabout-popup');
const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');

if (homeBtn && homeSection && aboutSection) {
  homeBtn.addEventListener('click', () => {
    homeSection.style.display = 'block';
    aboutSection.style.display = 'none';
  });
}

if (aboutBtn && homeSection && aboutSection) {
  aboutBtn.addEventListener('click', () => {
    homeSection.style.display = 'none';
    aboutSection.style.display = 'block';
  });
}

// === Smooth scroll ===
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// === Login Form Submit ===
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();

    if (validateEmail(email) && validatePassword(password)) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", email.split("@")[0]);
      wrapper?.classList.remove('active-popup');
      showProfile();
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });
}

// === Email/Password Validation ===
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// === Show Profile ===
function showProfile() {
  const profileBox = document.getElementById('profile-box');
  const name = localStorage.getItem("userName") || "User";
  const nameSpan = document.getElementById('profile-name');
  if (profileBox && nameSpan) {
    nameSpan.innerText = name;
    profileBox.style.display = "block";
  }
}

// === Profile Picture Preview ===
const profileInput = document.getElementById('profile-pic');
if (profileInput) {
  profileInput.addEventListener('change', function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById('profile-preview');
      if (preview) {
        preview.src = e.target.result;
      }
    };
    reader.readAsDataURL(this.files[0]);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const pledgeForm = document.getElementById("pledgeForm");
  const pledgeDisplay = document.getElementById("pledgeDisplay");

  // Load existing pledges from localStorage
  const savedPledges = JSON.parse(localStorage.getItem("pledges")) || [];
  savedPledges.forEach(displayPledge);

  pledgeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("pledgeName").value.trim();
    const message = document.getElementById("pledgeMessage").value.trim();

    if (name && message) {
      const pledge = { name, message };
      displayPledge(pledge);

      savedPledges.push(pledge);
      localStorage.setItem("pledges", JSON.stringify(savedPledges));

      pledgeForm.reset();
    }
  });

  function displayPledge({ name, message }) {
    const tile = document.createElement("div");
    tile.className = "pledge-tile";
    tile.innerHTML = `<strong>${name}</strong><p>${message}</p>`;
    pledgeDisplay.appendChild(tile);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("hungerMap")) {
    const map = L.map("hungerMap").setView([20.5937, 78.9629], 4); // India centered

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map © <a href="https://openstreetmap.org">OpenStreetMap</a>',
    }).addTo(map);

    const hungerSpots = [
      { lat: 28.6139, lng: 77.2090, name: "Delhi - Relief Area" },
      { lat: 19.0760, lng: 72.8777, name: "Mumbai Slum Aid Center" },
      { lat: 13.0827, lng: 80.2707, name: "Chennai Rural Outreach" },
      { lat: 25.3176, lng: 82.9739, name: "Varanasi Food Campaign" },
    ];

    hungerSpots.forEach((spot) => {
      L.marker([spot.lat, spot.lng])
        .addTo(map)
        .bindPopup(`<strong>${spot.name}</strong><br><button onclick="window.location.href='donate.html'" style='margin-top:5px; padding:5px 10px;'>Donate</button>`);
    });
  }
});
// Scroll animation using Intersection Observer
const fadeIns = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
    }
  });
});

fadeIns.forEach(element => observer.observe(element));
// Count and show total number of spots
function updateSpotCount() {
  const total = hungerSpots.length + addedSpots.length;
  const countElement = document.getElementById("spotCount");
  if (countElement) countElement.textContent = `🧭 Total Hunger Spots Tracked: ${total}`;
}
updateSpotCount();
// This gets called automatically from the Google Maps API
function initMap() {
  const centerAP = { lat: 15.9129, lng: 79.7400 }; // Andhra Pradesh

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: centerAP,
  });

  const hungerSpots = [
    { lat: 16.5062, lng: 80.6480, title: "Bhavanipuram - Vijayawada" },
    { lat: 17.6868, lng: 83.2185, title: "Narasimhanagar - Visakhapatnam" },
    { lat: 16.3067, lng: 80.4365, title: "Brundavan Gardens - Guntur" },
    { lat: 13.6288, lng: 79.4192, title: "Settipalli - Tirupati" },
    { lat: 15.8281, lng: 78.0373, title: "Gulab Nagar - Kurnool" },
    { lat: 14.6819, lng: 77.6006, title: "Old Town - Anantapur" },
    { lat: 14.4426, lng: 79.9865, title: "Harijanawada - Nellore" }
  ];

  hungerSpots.forEach(spot => {
    new google.maps.Marker({
      position: { lat: spot.lat, lng: spot.lng },
      map: map,
      title: spot.title
    });
  });

  // Show user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      new google.maps.Marker({
        position: userPos,
        map: map,
        title: "You are here",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });

      map.setCenter(userPos);
      map.setZoom(12);
    });
  }
}
