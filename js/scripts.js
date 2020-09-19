/**
 * Random User API Object
 *
 * First Name       results.name.first
 * Last Name        results.name.last
 * Email            results.email
 * City             results.location.city
 * Phone Number     results.phone
 * Address
 *   street         results.location.street
 *   city           results.location.city
 *   state          results.location.state
 *   postcode       results.location.postcode
 * Birthday         results.dob.date
 * Picture          results.picture (.thumbnail / .medium / .large)
 *
 *
 * Request Multiple Users
 *  https://randomuser.me/api/?results=#
 *
 * Exclude Fields that we do not need
 *  https://randomuser.me/api/?exc=login,gender,registered,cell,nat
 *
 * Combined API URL
 *  https://randomuser.me/api/?exc=login,gender,registered,cell,nat&results=12
 *
 */

const gallery = document.getElementById('gallery');
const serachBar = document.querySelector('.search-container');

// ---------------------------------------------------------
// FETCH FUNCTIONS
// ---------------------------------------------------------
fetch('https://randomuser.me/api/?exc=login,gender,registered,cell,nat&results=12', {
  method: "GET",
  withCredentials: true,
  headers: {
    "X-Auth-Token": "8F0X-O1UM-B3WJ-6G4W"
  }
})
  .then(response => response.json())
  .then(data => generateGallery(data.results))
  .catch(error => console.log(error))

// ---------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------

function generateGallery(employees) {
  employees.forEach(employee => {
    const html = `
      <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
      </div>
    `;
    gallery.insertAdjacentHTML('beforeend', html);
  })
};

 // ---------------------------------------------------------
 // EVENT FUNCTIONS
 // ---------------------------------------------------------