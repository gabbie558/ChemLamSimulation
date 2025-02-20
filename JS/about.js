const DevButton = document.getElementById('learn-more'); 
const aboutSystem = document.getElementById('aboutSystem'); 
const aboutTeam = document.getElementById('aboutTeam'); 
const systemButton = document.getElementById('systemButton'); 

// Helper function to handle fade transitions
function fadeTransition(hideSection, showSection) {
    hideSection.classList.remove('fade-in');
    hideSection.classList.add('fade-out');

    setTimeout(() => {
        hideSection.style.display = 'none';
        hideSection.classList.remove('fade-out');

        showSection.style.display = 'block';
        showSection.classList.add('fade-in');
    }, 500); // Matches animation duration
}

DevButton.addEventListener('click', () => fadeTransition(aboutSystem, aboutTeam));
systemButton.addEventListener('click', () => fadeTransition(aboutTeam, aboutSystem));
