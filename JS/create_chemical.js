let draggedItem = null;
let liquidLevel = 0;
let colorMix = [];
let lastColor = null;

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', function(event) {
        draggedItem = event.target.id;
    });
});

document.getElementById('table').addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.getElementById('table').addEventListener('drop', function(event) {
    event.preventDefault();
    if (draggedItem.startsWith('chemical')) {
        let liquid = document.getElementById('liquid');
        lastColor = liquid.style.backgroundColor;
        liquidLevel = Math.min(100, liquidLevel + 20);
        liquid.style.height = liquidLevel + '%';
        let colors = { chemical1: 'blue', chemical2: 'red', chemical3: 'yellow' };
        colorMix.push(colors[draggedItem]);
        let mixedColor = colorMix.length>1 ? 'pink' : colors[draggedItem];
        liquid.style.backgroundColor = mixedColor;
    }
});

function undoLastPour() {
    let liquid = document.getElementById('liquid');
    if (liquidLevel > 0) {
        liquidLevel = Math.max(0, liquidLevel - 20);
        liquid.style.height = liquidLevel + '%';
        colorMix.pop();
        liquid.style.backgroundColor = lastColor || 'transparent';
    }
}

function mixContents() {
    let beaker = document.getElementById('beaker');
    beaker.classList.add('mixing');
    setTimeout(() => beaker.classList.remove('mixing'), 2000);

    let bubbleInterval = setInterval(() => {
        let bubble = document.createElement('div');
        bubble.classList.add('bubble');
        beaker.appendChild(bubble);

        let size = Math.random() * 20 + 10;  // Bubble size between 10px and 30px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;  // Random horizontal position

        bubble.style.animationDuration = `${Math.random() * 2 + 1}s`;  // Random speed (1s to 3s)

        // Remove bubble after animation
        setTimeout(() => {
            bubble.remove();
        }, 2000);
    }, 200);

    // Stop bubbling after 2 seconds
    setTimeout(() => {
        clearInterval(bubbleInterval);
    }, 2000);
}

function openChemicalInfo() {
    let modal = document.getElementById('chemicalInfoModal');
    modal.style.display = 'flex';
}

function closeChemicalInfo() {
    let modal = document.getElementById('chemicalInfoModal');
    let modalContent = modal.querySelector('.modal-content');

    // Apply closing animation
    modalContent.style.animation = 'scaleDown 0.3s ease-in-out forwards';
    modal.style.animation = 'fadeOut 0.3s ease-in-out forwards';

    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.style.animation = 'scaleUp 0.3s ease-in-out forwards';
        modal.style.animation = 'fadeIn 0.3s ease-in-out';
    }, 300);
}