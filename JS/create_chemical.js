let draggedItem = null;
let liquidLevel = 0;
let colorMix = [];

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
    
    if (draggedItem && draggedItem.startsWith('chemical')) {
        let liquid = document.getElementById('liquid');

        // Ensure correct color mapping
        let colors = {
            chemical1: 'blue',   // Phenolphthalein
            chemical2: 'red',    // NaOH
            chemical3: 'yellow', // HCl
            chemical4: 'transparent' // Water
        };

        let newColor = colors[draggedItem];

        if (newColor) {
            // Increase liquid level
            liquidLevel = Math.min(100, liquidLevel + 20);
            liquid.style.height = liquidLevel + '%';

            // Store previous color before mixing
            colorMix.push(newColor);
            
            // Blend colors (basic logic)
            let mixedColor = mixColors(colorMix);
            liquid.style.backgroundColor = mixedColor;
        }
    }
});

// Function to mix colors (simple approach)
function mixColors(colors) {
    if (colors.includes('red') && colors.includes('blue')) return 'purple';
    if (colors.includes('red') && colors.includes('yellow')) return 'orange';
    if (colors.includes('blue') && colors.includes('yellow')) return 'green';
    if (colors.includes('red') && colors.includes('blue') && colors.includes('yellow')) return 'brown';
    return colors[colors.length - 1] || 'transparent';
}

// Undo last poured chemical
function undoLastPour() {
    let liquid = document.getElementById('liquid');
    
    if (liquidLevel > 0) {
        liquidLevel = Math.max(0, liquidLevel - 20);
        liquid.style.height = liquidLevel + '%';

        colorMix.pop(); // Remove last poured chemical
        let mixedColor = mixColors(colorMix);
        liquid.style.backgroundColor = mixedColor;
    }
}

// Mixing animation
function mixContents() {
    let beaker = document.getElementById('beaker');
    beaker.classList.add('mixing');

    setTimeout(() => {
        beaker.classList.remove('mixing');
    }, 2000);
}

// Show and hide info box
function showInfo(text) {
    let infoBox = document.getElementById('infoBox');
    infoBox.innerText = text;
    infoBox.style.display = 'inline';
}

function hideInfo() {
    let infoBox = document.getElementById('infoBox');
    infoBox.style.display = 'none';
}
