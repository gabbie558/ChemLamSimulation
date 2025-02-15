const atoms = document.querySelectorAll('.atom');
const dropzone = document.querySelector('.dropzone');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeModal = document.getElementById('close-modal');

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

    let resultMessage = 'Invalid molecule ❌';

    if (molecule === 'HHO') {
        resultMessage = 'You made Water (H₂O)! ✅';
    } else if (molecule === 'COO') {
        resultMessage = 'You made Carbon Dioxide (CO₂)! ✅';
    } else if (molecule === 'CO') {
        resultMessage = 'You made Carbon Monoxide (CO)! ✅';
    } else if (molecule === 'CHHHH') {
        resultMessage = 'You made Methane (CH₄)! ✅';
    } else if (molecule === 'CCHHHHHHO') {
        resultMessage = 'You made Ethanol (C₂H₆O)! ✅';
    }

    // Display result in modal
    modalText.textContent = resultMessage;
    modal.style.display = 'block';
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
