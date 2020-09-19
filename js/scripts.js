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


fetch('https://randomuser.me/api/?exc=login,gender,registered,cell,nat&results=12', {
  method: "GET",
  withCredentials: true,
  headers: {
    "X-Auth-Token": "8F0X-O1UM-B3WJ-6G4W"
  }
})
  .then(response => response.json())
  .then(data => console.log(data.results))
  .catch(error => console.log(error))