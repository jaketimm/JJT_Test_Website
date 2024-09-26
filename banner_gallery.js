// Include all images to cycle
const imagesDesktop = [
    'images/20180815_100849.jpg',
    'images/20180816_184505.jpg',
    'images/20180816_190002.jpg'
];

// Cropped versions of images for 650px width or less
const imagesMobile = [
    'images/20180815_100849 - m.jpg',
    'images/20180816_184505 - m.jpg',
    'images/20180816_190002 - m.jpg'
];

let currentIndex = 0;
let images = [];

// Function to set images based on screen size
function setImages() {
    images = (window.innerWidth < 650) ? imagesMobile : imagesDesktop;
    return images; // Return the current set of images
}

// Function to change the banner image 
function changeBannerImage() {
    const banner = document.querySelector('#Banner-Section .banner img');

    setTimeout(() => {
        banner.src = images[currentIndex]; // Change the image source
    }, 200); // 200ms delay
}

// Function to move to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; // Move to next image
    changeBannerImage();
}

// Function to move to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to previous image
    changeBannerImage();
}

// Initialize the images and set the initial banner image
function initialize() {
    setImages();
    changeBannerImage();
}

// Update images on resize
window.addEventListener('resize', () => {
    const previousIndex = currentIndex; // Save the current index
    setImages();
    currentIndex = Math.min(previousIndex, images.length - 1); // Ensure currentIndex is within bounds
    changeBannerImage();
});

// Set images on load
window.addEventListener('load', initialize);

//////////////////////////////////////////////////////////
// Preload the homepage background images that are initially hidden
// After page finishes loading

document.addEventListener('DOMContentLoaded', () => {
    function preloadImages(images) {
        images.forEach((image) => {
            const img = new Image();
            img.src = image; // This starts loading the image
        });
    }

    // Desktop images to preload (all images except the default one)
    const imagesDesktop = [
        'images/20180816_184505.jpg',
        'images/20180816_190002.jpg'
    ];
    
    // Mobile images to preload (all images except the default one)
    const imagesMobile = [
        'images/20180816_184505 - m.jpg',
        'images/20180816_190002 - m.jpg'
    ];
    
    // Function to set images based on screen size
    function setImages() {
        return (window.innerWidth < 650) ? imagesMobile : imagesDesktop; // Adjust the width as needed
    }

    // Preload images based on the initial screen size
    const imagesToPreload = setImages();
    preloadImages(imagesToPreload);

    // Optional: Add an event listener to handle window resize and preload again if needed
    window.addEventListener('resize', () => {
        preloadImages(setImages()); // Preload again if the size changes
    });
});
