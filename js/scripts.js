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

// ---------------------------------------------------------
// GENERATE MODAL
// ---------------------------------------------------------

// create modal-container div - this is the parent element of the modal and is appended to body
const modalContainer = document.createElement("div");
modalContainer.className = "modal-container"
modalContainer.style.display = "none"

// create the modal class div that holds the pop up of the modal and is appended to the modal-container
const modalDiv = document.createElement("div")
modalDiv.className = "modal"

//create the close X button that will be on the top of the modal. it is the first child of the modal div
const closeButton = document.createElement("button");
closeButton.setAttribute('class', 'modal-close-btn');
closeButton.setAttribute('id', 'modal-close-btn');
closeButton.setAttribute('type', 'button');

//create the  modal info container. this is the second child of the modal div.
const modalInfoContainer = document.createElement('div');
modalInfoContainer.setAttribute('class', 'modal-info-container');

//build modal and append to body
modalContainer.appendChild(modalDiv);
modalDiv.appendChild(closeButton);
modalDiv.appendChild(modalInfoContainer);
document.body.appendChild(modalContainer);

//--------------------------------------------------------
// Set Variables
// ------------------------------------------------------0

const gallery = document.getElementById('gallery');
const serachBar = document.querySelector('.search-container');
let employees = {};
let galleryCards = document.querySelectorAll('#gallery .card')



// ---------------------------------------------------------
// FETCH FUNCTIONS
// ---------------------------------------------------------
let data = fetch('https://randomuser.me/api/?exc=login,gender,registered,cell,nat&results=12', {
  method: "GET",
  withCredentials: true,
  headers: {
    "X-Auth-Token": "8F0X-O1UM-B3WJ-6G4W"
  }
})
  .then(response => response.json())
  .then(data => setEmployees(data.results))
  .catch(error => {
    gallery.innerHTML = `<h2> Looks like we had an issue grabbing the employees. Refresh the page.`
    gallery.style.display = 'block';
    gallery.style.color = 'tomato';
    console.log(error)
  })

// ---------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------

function setEmployees(apiObject) {
  //save the employeesObject to employees
  employees = apiObject;
  generateGallery(employees);
}

function generateGallery(employeesObject) {
  employeesObject.forEach((employee, index) => {

    const html = `
      <div class="card" data-id="${index}">
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
      </div>
    `;
    gallery.insertAdjacentHTML('beforeend', html);
    // console.log(galle)
    gallery.lastElementChild.addEventListener('click', (e) => console.log(e.currentTarget))
  })

  //now that gallery cards exist save them for later access
  galleryCards = document.querySelectorAll('#gallery .card')
};

// add details to modal when clicked
const addModalDetails = (id) => {
  modalContainer.style.display = "block";
  html = `
  <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
    <h3 id="name" class="modal-name cap">name</h3>
    <p class="modal-text">email</p>
    <p class="modal-text cap">city</p>
    <hr>
    <p class="modal-text">(555) 555-5555</p>
    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
    <p class="modal-text">Birthday: 10/21/2015</p>
  `
  modalInfoContainer.insertAdjacentHTML('beforeend', html);

}

// ---------------------------------------------------------
// EVENT FUNCTIONS
// ---------------------------------------------------------

