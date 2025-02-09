let draggedItem = null;
let liquidLevel = 0;
let colorMix = [];
let currentContainer = 'beaker';

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

        // Corrected color mapping using hex codes
        let colors = {
            chemical1: '#8A2BE2',  // Phenolphthalein (Purple)
            chemical2: '#FF0000',  // NaOH (Red)
            chemical3: '#FFFF00',  // HCl (Yellow)
            chemical4: '#FFFFFF'   // Water (Transparent/White)
        };

        let newColor = colors[draggedItem];

        if (newColor) {
            // Increase liquid level
            liquidLevel = Math.min(100, liquidLevel + 20);
            liquid.style.height = liquidLevel + '%';

            // Store previous color before mixing
            colorMix.push(newColor);
            
            // Blend colors using gradient
            let mixedColor = mixColors(colorMix);
            liquid.style.background = mixedColor;
        }
    }
});

// Function to mix colors using gradient
function mixColors(colors) {
    if (colors.length === 1) return `linear-gradient(to bottom, ${colors[0]}, ${colors[0]})`;
    if (colors.includes('#FF0000') && colors.includes('#8A2BE2')) return `linear-gradient(to bottom, #FF69B4, #8A2BE2)`; // Pinkish-purple
    if (colors.includes('#FF0000') && colors.includes('#FFFF00')) return `linear-gradient(to bottom, #FFA500, #FFFF00)`; // Orange
    if (colors.includes('#8A2BE2') && colors.includes('#FFFF00')) return `linear-gradient(to bottom, #008000, #FFFF00)`; // Green
    if (colors.includes('#FF0000') && colors.includes('#8A2BE2') && colors.includes('#FFFF00')) return `linear-gradient(to bottom, #A52A2A, #8A2BE2)`; // Brownish

    return `linear-gradient(to bottom, ${colors[colors.length - 1]}, ${colors[colors.length - 1]})`;
}

// Undo last poured chemical
function undoLastPour() {
    let liquid = document.getElementById('liquid');
    
    if (liquidLevel > 0) {
        liquidLevel = Math.max(0, liquidLevel - 20);
        liquid.style.height = liquidLevel + '%';

        colorMix.pop(); // Remove last poured chemical
        let mixedColor = mixColors(colorMix);
        liquid.style.background = mixedColor;
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
