fetch('https://api.spacexdata.com/v4/launches/latest')
    .then(response => response.json())
    .then(data => displayData(data));


async function displayData(data) {
    const rocket = await getRocket(data.rocket);
    const image = data.links.flickr.original[0];
    const launchSuccess = data.success;
    const description = data.details;
    const name = data.name;
    const launchDate = data.date_utc;

    console.log(rocket, image, launchSuccess, description, name, launchDate);

    const displayDiv = document.getElementsByClassName('latest')[0];

    var launchName = document.createElement('p');
    launchName.innerText = `Name of Launch: ${name}`;

    displayDiv.appendChild(launchName);

    var dateOfLaunch = document.createElement('p');
    dateOfLaunch.innerText = `Date of Launch: ${launchDate}`;

    displayDiv.appendChild(dateOfLaunch);

    var successOfLaunch = document.createElement('p');
    successOfLaunch.innerText = `Success: ${launchSuccess}`;

    displayDiv.appendChild(successOfLaunch);

    var launchDescription = document.createElement('p');
    launchDescription.innerText = description;

    displayDiv.appendChild(launchDescription);

    var launchImageHeader = document.createElement('p');
    launchImageHeader.innerText = 'Image of Launch';
    
    displayDiv.appendChild(launchImageHeader);

    var launchImage = document.createElement('img');
    launchImage.setAttribute('src', image);

    displayDiv.appendChild(launchImage);

    var rocketInfoHeader = document.createElement('h2');
    rocketInfoHeader.innerText = 'Rocket Information';

    displayDiv.appendChild(rocketInfoHeader);

    var rocketName = document.createElement('p')
    rocketName.innerText = `Rocket Name: ${rocket.name}`;

    displayDiv.appendChild(rocketName);

    var rocketImageHeader = document.createElement('p');
    rocketImageHeader.innerText = 'Image of Rocket';
    
    displayDiv.appendChild(rocketImageHeader);

    var rocketImage = document.createElement('img');
    rocketImage.setAttribute('src', rocket.image);

    displayDiv.appendChild(rocketImage);


}

async function getRocket(rocketId) {
    var rocket = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketId}`)
        .then(response => response.json())
        .then(data => data);

    return {
        name: rocket.name,
        image: rocket.flickr_images[0]
    }
}