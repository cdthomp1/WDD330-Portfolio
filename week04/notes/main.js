var name;
var radioVal;
var userStatus;

function watchName() {
    var input = document.getElementById('name');
    var display = document.getElementById('userName');
    name = input.value;
    document.getElementById('nameInput').classList.add('hidden');
    display.classList.remove('hidden');
    display.innerText = `Hello ${name}! What Can I do for you today?`;
    document.getElementById('radioGroupBtns').classList.remove('hidden');
}

function watchRadio() {
    var radios = document.getElementsByName('rad');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radioVal = radios[i].value
            break;
        }
    }

    if (radioVal === "0") {
        showGoodbye();
    } else {
        nextQ();
    }
}

function showGoodbye() {
    document.getElementById('radioGroupBtns').classList.add('hidden');
    document.getElementById('goodBye').classList.remove('hidden');
    document.getElementById('goodbyeName').innerText = `Goodbye ${name}. Till next time.`;
}

function nextQ() {
    document.getElementById('radioGroupBtns').classList.add('hidden');
    document.getElementById('finalQ').classList.remove('hidden');
}

function statusUpdate() {
    userStatus = document.getElementById('status').value;
    var userStatusDiv = document.getElementById('userStatus');
    userStatusDiv.classList.remove('hidden')
    userStatusDiv.innerText = `You are: ${userStatus}`
}

document.getElementById('dynamic').addEventListener('submit', function (e) {
    watchName();
    e.preventDefault();
}, false);