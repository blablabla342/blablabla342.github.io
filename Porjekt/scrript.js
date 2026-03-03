// Vänta på att hela sidan har laddats in
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LIKE FUNKTION ---
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const countSpan = this.querySelector('.count');
            let currentCount = parseInt(countSpan.innerText);

            if (this.classList.contains('active')) {
                // Undo - Ta bort like
                this.classList.remove('active');
                countSpan.innerText = currentCount - 1;
            } else {
                // Add like
                this.classList.add('active');
                countSpan.innerText = currentCount + 1;
            }
        });
    });

    // --- MOBILMENY LOGIK ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav-panel');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            // Växla mellan att visa och dölja menyn
            if (mobileNav.style.display === 'flex') {
                mobileNav.style.display = 'none';
            } else {
                mobileNav.style.display = 'flex';
            }
        });
    }
});

// Funktion som anropas när man klickar på en länk i mobilmenyn
function toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav-panel');
    if (mobileNav) {
        mobileNav.style.display = 'none';
    }
}