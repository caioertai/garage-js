import { carFormBehaviour, fetchCars } from './cars';

// Listeners
const carForm = document.querySelector('#new-car');
carForm.addEventListener('submit', carFormBehaviour);

// AJAX Calls
fetchCars();
