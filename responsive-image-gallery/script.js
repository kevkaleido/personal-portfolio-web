document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const galleryImages = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');
    const prevBtn = document.querySelector('.lightbox .prev');
    const nextBtn = document.querySelector('.lightbox .next');
    let currentImageIndex;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            const color = button.getAttribute('data-color'); // Retrieve data-color attribute
            document.body.style.backgroundColor = color; // Change body background color

            galleryImages.forEach(img => {
                if (filter === 'all' || img.getAttribute('data-category') === filter) {
                    img.style.display = 'block';
                } else {
                    img.style.display = 'none';
                }
            });
        });
    });

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            currentImageIndex = index;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
    });

    window.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});
