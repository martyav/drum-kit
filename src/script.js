
function playSound(event) {
    let code = null;
    let uiButton = null;
    let audio = null;
    
    if (event.type === 'keydown') {
        code = event.keyCode;
        uiButton = document.querySelector(`.key[data-key="${code}"]`);    
    } else if (event.type === 'click') {
        if (event.target === 'button.key') {
            code = event.target.dataset.key;
            uiButton = event.target;
        } else {
            code = event.target.parentElement.dataset.key;
            uiButton = event.target.parentElement;
        }
    }

    audio = document.querySelector(`audio[data-key="${code}"]`);
        
    try {
        audio.currentTime = 0; // rewind on every press
        audio.play();
        uiButton.classList.add('playing');
    }
    catch (error) {
        console.log(`${error}.\nProperty is attached to null because there is no available audio for a press from key with key code ${code}`);
    }
}

function removeTransition(event) {
    if (event.target.classList.contains('playing')) {
        event.target.classList.remove('playing'); // we could use .toggle, but that would also add/remove/add the class if the button registers the key as being held down
    } 
}

function setUpInteractions() {
    const keys = Array.from(document.querySelectorAll('.key'));

    window.addEventListener('keydown', playSound);
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    keys.forEach(key => key.onclick = playSound);
}

window.onload = setUpInteractions;