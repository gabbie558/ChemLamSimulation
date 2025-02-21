let draggedItem = null;
let liquidLevel = 0;
let colorMix = [];
let currentContainer = 'beaker';

// Drag and drop functionality
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

        // Color mapping using hex codes
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

// Info box (hover over chemicals)
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".item");
    const infoBox = document.getElementById("infoBox");

    items.forEach(item => {
        item.addEventListener("mouseover", (event) => {
            const description = event.currentTarget.getAttribute("data-description");
            if (description) {
                infoBox.textContent = description;
                infoBox.style.display = "block";
                infoBox.style.left = `${event.pageX + 10}px`;
                infoBox.style.top = `${event.pageY + 10}px`;
            }
        });

        item.addEventListener("mousemove", (event) => {
            infoBox.style.left = `${event.pageX + 10}px`;
            infoBox.style.top = `${event.pageY + 10}px`;
        });

        item.addEventListener("mouseout", () => {
            infoBox.style.display = "none";
        });
    });
});

// ------------------------- 📝 Help Modal Navigation -------------------------
let currentPageIndex = 0;
const helpPages = document.querySelectorAll('.help-page');

// Show the correct help page
function showHelpPage(index) {
    helpPages.forEach((page, i) => {
        page.style.display = i === index ? 'block' : 'none';
    });
}

// Next button functionality
function nextPage() {
    if (currentPageIndex < helpPages.length - 1) {
        currentPageIndex++;
        showHelpPage(currentPageIndex);
    }
}

// Back button functionality
function previousPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        showHelpPage(currentPageIndex);
    }
}

// Close Help Modal
function closeHelp() {
    document.getElementById("helpModal").style.display = "none";
    currentPageIndex = 0; // Reset to the first page when closed
    showHelpPage(currentPageIndex);
}

// Open Help Modal when 'Need Help?' is clicked
document.querySelector("#helpLink").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("helpModal").style.display = "block";
    showHelpPage(currentPageIndex); // Always start from the first help page
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("helpModal").style.display = "block";
    showHelpPage(0); // Show the first help page by default
});