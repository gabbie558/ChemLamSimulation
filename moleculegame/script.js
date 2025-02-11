const atoms = document.querySelectorAll('.atom');
const dropzone = document.querySelector('.dropzone');
const result = document.getElementById('result');

// Store original colors
const atomColors = {
    H: '#ff4b5c',  // Red for Hydrogen
    O: '#4bafff',  // Blue for Oxygen
    C: '#ffbb33'   // Yellow for Carbon
};

// Enable dragging for atoms
atoms.forEach(atom => {
    atom.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

// Allow dragover event for the dropzone
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Handle dropping atoms into the dropzone
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    let atomId = e.dataTransfer.getData('text');

    if (atomId) {
        let newAtom = document.createElement('div');
        newAtom.classList.add('atom');
        newAtom.textContent = atomId;
        newAtom.style.backgroundColor = atomColors[atomId]; // Keep original color
        newAtom.setAttribute('draggable', true);

        // Enable dragging atoms out of dropzone
        newAtom.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', 'remove'); // Flag for removal
            e.target.remove(); // Remove from dropzone
        });

        dropzone.appendChild(newAtom);
    }
});

// Check molecule composition
function checkMolecule() {
    let molecule = Array.from(dropzone.querySelectorAll('.atom'))
                        .map(atom => atom.textContent.trim()) // Ensure no extra spaces
                        .sort() // Ensure order is always the same
                        .join('');

    console.log("Formed Molecule:", molecule); // Debugging

    if (molecule === 'HHO') {
        result.textContent = 'You made Water (H₂O)! ✅';
    } else if (molecule === 'COO') {
        result.textContent = 'You made Carbon Dioxide (CO₂)! ✅';
    } else if (molecule === 'CO') {
        result.textContent = 'You made Carbon Monoxide (CO)! ✅';
    } else if (molecule === 'CHHHH') {
        result.textContent = 'You made Methane (CH₄)! ✅';
    } else if (molecule === 'CCHHHHHHO') {
        result.textContent = 'You made Ethanol (C₂H₆O)! ✅';
    } else {
        result.textContent = 'Invalid molecule ❌';
    }
}
