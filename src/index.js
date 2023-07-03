document.addEventListener('DOMContentLoaded', initialise)

    function initialise() {
        fetchDogs();

        const form = document.getElementById('dog-form');
        form.addEventListener('submit', submitForm)
    }

    function fetchDogs(){
        fetch(`http://localhost:3000/dogs`)
        .then((response) => response.json())
        .then(dogs => renderDogs(dogs));
    }

    function renderDogs(dogs) {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = '';

        for(const dog of dogs) {
            const dogRow = createDogRow(dog);
            tableBody.append(dogRow);

        }
    }


    function createDogRow(dog) {
        const row = document.createElement('tr');
        // ... create the necessary <td> elements, set their content and append to row
        // Create and append the name cell
        const nameCell = document.createElement('td');
        nameCell.textContent = dog.name;
        row.append(nameCell);

        // Create and append the breed cell
        const breedCell = document.createElement('td');
        breedCell.textContent = dog.breed;
        row.append(breedCell);


        // Create and append the sex cell
        const sexCell = document.createElement('td');
        sexCell.textContent = dog.sex;
        row.append(sexCell);
        // Add edit button and event listener to populate the form

        const editButton = document.createElement('button')
        editButton.textContent = 'Edit';
        editButton.addEventListener("click", () => populateForm(dog))
        row.append(editButton)



        return row;
    }

    function populateForm(dog) {
        const form = document.getElementById('dog-form');
        form.name.value = dog.name;
        form.breed.value = dog.breed;
        form.sex.value = dog.sex;
        form.dataset.id = dog.id;
    };


    function submitForm(event) {
        event.preventDefault();

        const form = document.getElementById('dog-form')
        const id = form.dataset.id;
        const data = {
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value

        };
   


    fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(() => fetchDogs());

};