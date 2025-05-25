// Define images, sorted by number
const imageList = [
    { image: 'images/20180815_100849.jpg', mobile_image: 'images/20180815_100849-m-short.jpg', number: 1 },
    { image: 'images/20180816_184505.jpg', mobile_image: 'images/20180816_184505-m-short.jpg', number: 2 },
    { image: 'images/20180816_190002.jpg', mobile_image: 'images/20180816_190002-m-short.jpg', number: 3 }
];



///////////////////////////////////////////////////////////////////////////////////////////////
// Code to load and display images based on screen size and image number
///////////////////////////////////////////////////////////////////////////////////////////////

// Sort images by number to ensure correct order
const sortedImages = imageList.sort((a, b) => a.number - b.number);

let currentIndex = 0;
let currentImages = [];

// Function to set images based on screen size
function setImages() {
    currentImages = sortedImages;
    return currentImages;
}

// Function to change the banner image 
function changeBannerImage() {
    const picture = document.getElementById('bannerPicture');
    const sources = picture.getElementsByTagName('source');
    const currentImage = currentImages[currentIndex];
    
    if (sources.length > 0) {
        sources[0].srcset = window.innerWidth < 650 ? 
            currentImage.mobile_image : 
            currentImage.image;
        picture.querySelector('img').src = window.innerWidth < 650 ? 
            currentImage.mobile_image : 
            currentImage.image;
    }
}

// Function to move to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    changeBannerImage();
}

// Function to move to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    changeBannerImage();
}

// Initialize the images and set the initial banner image
function initialize() {
    setImages();
    changeBannerImage();
}

// Update images on resize
window.addEventListener('resize', () => {
    const previousIndex = currentIndex;
    setImages();
    currentIndex = Math.min(previousIndex, currentImages.length - 1);
    changeBannerImage();
});

// Set images on load
window.addEventListener('load', initialize);

//////////////////////////////////////////////////////////
// Preload images with number > 1
let hasPreloaded = false;

document.addEventListener('DOMContentLoaded', () => {
    function preloadImages(images) {
        images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }

    // Get images to preload (all images with number > 1)
    function getImagesToPreload() {
        const isMobile = window.innerWidth < 650;
        return sortedImages
            .filter(img => img.number > 1)
            .map(img => isMobile ? img.mobile_image : img.image);
    }

    // Preload images based on the initial screen size
    if (!hasPreloaded) {
        const imagesToPreload = getImagesToPreload();
        preloadImages(imagesToPreload);
        hasPreloaded = true;
    }

    // Update preloaded images on resize if needed
    window.addEventListener('resize', () => {
        // Optional: You could add logic here to preload different versions
        // if the screen size changes significantly
    });
});