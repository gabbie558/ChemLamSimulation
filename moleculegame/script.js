const atoms = document.querySelectorAll('.atom');
const dropzone = document.querySelector('.dropzone');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeModal = document.getElementById('close-modal');

// Help button and modal elements
const helpButton = document.getElementById('help-button'); 
const helpModal = document.getElementById('help-modal');
const closeHelpModal = document.getElementById('close-help-modal');

// Help modal pages
const nextHelpButton = document.getElementById('next-help');
const prevHelpButton = document.getElementById('prev-help');
const helpPage1 = document.getElementById('help-page-1');
const helpPage2 = document.getElementById('help-page-2');

// Trash button
const trashButton = document.getElementById('trash-button');

// Store original colors for atoms
const atomColors = {
    H: '#ff4b5c',  // Red for Hydrogen
    O: '#4bafff',  // Blue for Oxygen
    C: '#ffbb33',  // Yellow for Carbon
    N: '#7d3cff'   // Purple for Nitrogen
};

// Enable dragging for atoms
atoms.forEach(atom => {
    atom.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', atom.id);
    });
});

// Allow dragover event for the dropzone
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Handle dropping atoms into the dropzone
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    let atomId = e.dataTransfer.getData('text/plain');

    if (atomId && atomColors[atomId]) {
        let newAtom = document.createElement('div');
        newAtom.classList.add('atom');
        newAtom.textContent = atomId;
        newAtom.style.backgroundColor = atomColors[atomId]; 
        newAtom.setAttribute('draggable', true);

        // Allow dragging out of dropzone (removal)
        newAtom.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'remove'); 
            e.target.remove();
        });

        dropzone.appendChild(newAtom);
    }
});

// Check molecule composition
function checkMolecule() {
    let molecule = Array.from(dropzone.querySelectorAll('.atom'))
                        .map(atom => atom.textContent.trim()) 
                        .sort() 
                        .join('');

    console.log("Formed Molecule:", molecule); 

    let resultMessage = 'Invalid molecule ❌';
    let imagePath = ''; 

    // Valid molecule checks
    const moleculeMap = {
        'HHO': ['You made Water (H₂O)! ✅', '../ChemLabSimulation/images/water2.jpg'],
        'COO': ['You made Carbon Dioxide (CO₂)! ✅', '../ChemLabSimulation/images/co2.jpg'],
        'CO': ['You made Carbon Monoxide (CO)! ✅', '../ChemLabSimulation/images/co.jpg'],
        'CHHHH': ['You made Methane (CH₄)! ✅', '../ChemLabSimulation/images/methane.webp'],
        'CCHHHHHHO': ['You made Ethanol (C₂H₆O)! ✅', '../ChemLabSimulation/images/ethanol.jpg'],
        'HHOO': ['You made Hydrogen Peroxide (H₂O₂)! ✅', '../ChemLabSimulation/images/h2o2.jpg']
    };

    if (moleculeMap[molecule]) {
        [resultMessage, imagePath] = moleculeMap[molecule];
    }

    // Display result in modal
    modalText.textContent = resultMessage;

    // Update or create image inside modal
    let modalImage = document.getElementById('modal-image');
    if (!modalImage) {
        modalImage = document.createElement('img');
        modalImage.id = 'modal-image';
        modalImage.style.maxWidth = '150px'; 
        modalImage.style.marginTop = '10px';
        document.querySelector('.modal-content').appendChild(modalImage);
    }

    modalImage.src = imagePath;
    modalImage.style.display = imagePath ? 'block' : 'none';

    modal.style.display = 'block';
}

// Close result modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close result modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Clear dropzone when trash button is clicked
trashButton.addEventListener('click', () => {
    dropzone.innerHTML = ''; 
});
helpModal.style.display = 'block';
// Open help modal
helpButton.addEventListener('click', () => {
    helpModal.style.display = 'block';
    helpPage1.style.display = 'block';
    helpPage2.style.display = 'none';
});

// Close help modal
closeHelpModal.addEventListener('click', () => {
    helpModal.style.display = 'none';
});

// Close help modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === helpModal) {
        helpModal.style.display = 'none';
    }
});

// Navigate to help modal page 2
nextHelpButton.addEventListener('click', () => {
    helpPage1.style.display = 'none';
    helpPage2.style.display = 'block';
});

// Navigate back to help modal page 1
prevHelpButton.addEventListener('click', () => {
    helpPage1.style.display = 'block';
    helpPage2.style.display = 'none';
});
