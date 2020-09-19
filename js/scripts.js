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
closeButton.addEventListener('click', () => { modalContainer.style.display = "none"; modalInfoContainer.innerHTML = ""; });


//create the  modal info container. this is the second child of the modal div.
const modalInfoContainer = document.createElement('div');
modalInfoContainer.setAttribute('class', 'modal-info-container');

//build modal and append to body
modalContainer.appendChild(modalDiv);
modalDiv.appendChild(closeButton);
modalDiv.appendChild(modalInfoContainer);
document.body.appendChild(modalContainer);

// Create container for modal nav buttons
const modalBtnContainer = document.createElement('div');
modalBtnContainer.setAttribute('class', 'modal-btn-container');
// Create the previous button
const modalPrevBtn = document.createElement('button');
modalPrevBtn.setAttribute('type', 'button');
modalPrevBtn.setAttribute('id', 'modal-prev');
modalPrevBtn.setAttribute('class', 'modal-prev btn');
modalPrevBtn.innerText = 'Prev';
// Create the next button
const modalNextBtn = document.createElement('button');
modalNextBtn.setAttribute('type', 'button');
modalNextBtn.setAttribute('id', 'modal-next');
modalNextBtn.setAttribute('class', 'modal-next btn');
modalNextBtn.innerText = 'Next';

// Append buttons and container to modal
modalBtnContainer.appendChild(modalPrevBtn);
modalBtnContainer.appendChild(modalNextBtn);
modalDiv.appendChild(modalBtnContainer);

// Add event listener to  buttons
modalPrevBtn.addEventListener('click', () => prevEmployee());
modalNextBtn.addEventListener('click', () => nextEmployee());

//--------------------------------------------------------
// Create searchbar
//-------------------------------------------------------
const searchContainer = document.querySelector('.search-container');
// Create form element and add attributes
searchBar = document.createElement('form')
searchBar.setAttribute('action', '#');
searchBar.setAttribute('method', 'get');

// Append form and form inputs
searchBar.innerHTML = `
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    `
searchContainer.appendChild(searchBar);

//--------------------------------------------------------
// Set Variables
// ------------------------------------------------------0

const gallery = document.getElementById('gallery');
const serachBar = document.querySelector('.search-container');
let employees = {};
let visibleEmployees = [];
let currentEmployee = 0;


// ---------------------------------------------------------
// FETCH FUNCTIONS
// ---------------------------------------------------------
let data = fetch('https://randomuser.me/api/?exc=login,gender,registered,cell&results=12&nat=us,br,ca', {
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
  gallery.innerHTML = "";
  visibleEmployees = employeesObject;
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
    gallery.lastElementChild.addEventListener('click', (e) => addModalDetails(e.currentTarget.dataset.id))
  })
};

// callback function for click event set to employee card in gallery
const addModalDetails = (employeeId) => {
  //grab employee object
  employee = visibleEmployees[employeeId]
  //show the modal
  modalContainer.style.display = "block";
  currentEmployee = parseInt(employeeId)

  //set nav buttons
  // If current employee is the first one then disable the prev button
  if (currentEmployee == 0) {
    modalPrevBtn.disabled = true;
    modalNextBtn.disabled = false;
    //if current employee is the last employee then disable the next button
  } else if (currentEmployee == 11) {
    modalNextBtn.disabled = true;
    modalPrevBtn.disabled = false;
    //if current employee isn't the last employee or the first then both buttons work
  } else {
    modalPrevBtn.disabled = false;
    modalNextBtn.disabled = false;
  }

  //reformat birthday
  const date = new Date(employee.dob.date)
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const y = date.getUTCFullYear();
  const birthday = `${m}/${d}/${y}`

  //populate the modal information and save to html variable
  let html = `
  <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
      <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
      <p class="modal-text">${employee.email}</p>
      <p class="modal-text cap">${employee.location.city}</p>
      <hr>
        <p class="modal-text">${employee.phone}</p>
        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
        <p class="modal-text">Birthday: ${birthday}</p>
  `
  modalInfoContainer.insertAdjacentHTML('beforeend', html);

}

// -------------------------------------------------------
//  nextEmployee callback function for the modal next button
// -------------------------------------------------------

const nextEmployee = () => {
  if (currentEmployee < 11) {
    modalInfoContainer.innerHTML = "";
    addModalDetails(currentEmployee + 1)
  }
}

const prevEmployee = () => {
  if (currentEmployee > 0) {
    modalInfoContainer.innerHTML = "";
    addModalDetails(currentEmployee - 1)
  }
}

//  -----------------------------------------
//  Event Listeners
//  -----------------------------------------

searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', (e) => {
  cardNames = document.querySelectorAll('.card-name')
  const searchInput = e.target.value;
  // let employeeNames = employees.map(employee => `${employee.name.first} ${employee.name.last}`);
  newList = []
  employees.forEach(employee => {
    let fullname = `${employee.name.first} ${employee.name.last}`
    if (fullname.toLowerCase().includes(searchInput)) {
      newList.push(employee)
    }
  })
  generateGallery(newList);
})

