const url = "https://wagon-garage-api.herokuapp.com/batch295/cars";
const carForm = document.querySelector('#new-car');
const carList = document.querySelector(".cars-list");

const carTagBuilder = car => (
  `<div class="car">
    <div class="car-image">
      <img src="https://loremflickr.com/280/280/car,${car.model}" />
    </div>
    <div class="car-info">
      <h4>${car.brand} ${car.model}</h4>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Plate:</strong> ${car.plate}</p>
    </div>
  </div>`
);

const updateCarsList = (carsArray) => {
  carList.innerText = '';
  carsArray.forEach((car) => {
    carList.insertAdjacentHTML("beforeend", carTagBuilder(car));
  });
};

const fetchCars = () => {
  fetch(url)
    .then(response => response.json())
    .then(updateCarsList);
};

const buildCarObject = form => (
  {
    brand: form.querySelector('#brand').value,
    model: form.querySelector('#model').value,
    plate: form.querySelector('#plate').value,
    owner: form.querySelector('#owner').value
  }
);

const resetForm = () => {
  carForm.querySelector('#brand').focus();
  carForm.reset();
};

const postCar = (carObject) => {
  const carJSONString = JSON.stringify(carObject);
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: carJSONString
  })
    .then(response => response.json())
    .then(fetchCars)
    .then(resetForm);
};

const carFormBehaviour = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const carObject = buildCarObject(form);
  postCar(carObject);
};

export { carFormBehaviour, fetchCars };
