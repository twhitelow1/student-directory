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
// setEmployees Function
// ---------------------------------------------------------

function setEmployees(apiObject) {
  //save the employees that were fetched to employees
  employees = apiObject;
  generateGallery(employees);
}
// ---------------------------------------------------------
// generateGallery Function
// function is called when the gallery needs to be reset and rendered to display the filtered employee list
// ---------------------------------------------------------

function generateGallery(employeesObject) {
  // clear the gallery so it can be rebuilt
  gallery.innerHTML = "";
  // whatever employees that were passed into the generateGallery are the filtered employees and should be used to display the employees
  visibleEmployees = employeesObject;
  // for each employee create a card
  visibleEmployees.forEach((employee, index) => {
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
    // insert the card
    gallery.insertAdjacentHTML('beforeend', html);
    // create and event listener that creates a modal of the data from the card when card is clicked
    gallery.lastElementChild.addEventListener('click', (e) => setModalDetails(e.currentTarget.dataset.id))
  })
};

//-------------------------------------------------
//  Helper function used in the setModalDetails function
//  changes the visibiltyof the modal prev/nav buttons
// -----------------------------------------------
const setModalButtons = (prevBtn, nextBtn) => {
  modalPrevBtn.disabled = prevBtn;
  modalNextBtn.disabled = nextBtn;
}

//-----------------------------------------------
// Function that sets the information display in modal
//--------------------------------------------------
const setModalDetails = (employeeId) => {
  //grab employee object
  employee = visibleEmployees[employeeId]
  //make the modal visible
  modalContainer.style.display = "block";
  // set the global currentEmployee, which stores the visibleEmployees[index] of the current employee 
  currentEmployee = parseInt(employeeId)

  // Setup modal prev/next buttons
  // If current employee is the first one then disable the prev button
  if (visibleEmployees.length > 1) {
    if (currentEmployee == 0) {
      setModalButtons(true, false);
      //if current employee is the last employee then disable the next button
    } else if (currentEmployee == (visibleEmployees.length - 1)) {
      setModalButtons(false, true);
      //if current employee isn't the last employee or the first then both buttons work
    } else {
      setModalButtons(false, false);
    }
    // only one employee listed so buttons do not work
  } else {
    setModalButtons(true, true);
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
//  Callback functions for the modal previous and next buttons
// -------------------------------------------------------

const nextEmployee = () => {
  modalInfoContainer.innerHTML = "";
  setModalDetails(currentEmployee + 1)
}

const prevEmployee = () => {
  modalInfoContainer.innerHTML = "";
  setModalDetails(currentEmployee - 1)
}

//  -----------------------------------------
//  Search Bar Event Listener
//  -----------------------------------------
const doSearch = (e) => {
  cardNames = document.querySelectorAll('.card-name')
  const searchInput = e.target.value;
  newList = []
  // for each employee combine first/last name and then if that fullname includes the search input then push that employee object into a new array
  employees.forEach(employee => {
    let fullname = `${employee.name.first} ${employee.name.last}`
    if (fullname.toLowerCase().includes(searchInput)) {
      newList.push(employee)
    }
  })
  // now generate an new gallery with the new sorted array of employees
  generateGallery(newList);
}

searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', e => doSearch(e))
searchInput.addEventListener('search', e => doSearch(e))

