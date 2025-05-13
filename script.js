document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const container = document.getElementById('container');
    let flippedCount = 0;
    
    // Sample image URLs (reduce to 6 images)
    const imageUrls = [
        'img/1.png',
        'img/2.png',
        'img/3.png',
        'img/4.png',
        'img/5.png',
        'img/6.png',
    ];

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        
        // Random position from left
        const randomX = Math.random() * window.innerWidth;
        // Random jump height between 30% and 70% of viewport height
        const jumpHeight = -(30 + Math.random() * 40) + 'vh';
        // Random animation duration between 2 and 4 seconds
        const duration = 2 + Math.random() * 2;
        
        heart.style.setProperty('--heart-x', randomX + 'px');
        heart.style.setProperty('--jump-height', jumpHeight);
        heart.style.setProperty('--float-duration', duration + 's');
        heart.style.setProperty('--start-delay', Math.random() * 2 + 's');
        
        document.body.appendChild(heart);
        
        // Remove the heart element after animation ends
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    function startHeartAnimation() {
        // Create initial hearts
        for (let i = 0; i < 10; i++) {
            createFloatingHeart();
        }
        
        // Continuously create new hearts
        setInterval(() => {
            if (document.querySelectorAll('.heart').length < 15) {
                createFloatingHeart();
            }
        }, 1000);
    }

    // Generate grid cells (6 instead of 9)
    for (let i = 0; i < 6; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        
        const flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        
        const front = document.createElement('div');
        front.className = 'flip-card-front';
        front.innerHTML = '<svg class="click-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>';
        
        const back = document.createElement('div');
        back.className = 'flip-card-back';
        const img = document.createElement('img');
        img.src = imageUrls[i];
        img.alt = `Image ${i + 1}`;
        img.className = 'w-full h-full object-cover';
        back.appendChild(img);
        
        flipCard.appendChild(front);
        flipCard.appendChild(back);
        cell.appendChild(flipCard);
        grid.appendChild(cell);

        cell.addEventListener('click', () => {
            if (!flipCard.classList.contains('flipped')) {
                flipCard.classList.add('flipped');
                flippedCount++;
                
                if (flippedCount === 6) { // Changed from 9 to 6
                    setTimeout(() => {
                        document.body.classList.add('completed');
                        startHeartAnimation();
                    }, 500);
                }
            }
        });
    }
}); 