// Scripts to run the top banner nav bar

// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

CShamburgerMenu.addEventListener('click', function () {
	CShamburgerMenu.classList.toggle('cs-active');
	CSnavbarMenu.classList.toggle('cs-active');
	CSbody.classList.toggle('cs-open');
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector('#cs-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
	const onClick = () => {
		item.classList.toggle('cs-active');
	};
	item.addEventListener('click', onClick);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Single function to adjust padding based on the navigation header height
function adjustSectionsOffset() {
	// Get the height of the navigation header
	const header = document.getElementById('cs-navigation');
	if (!header) return;  // Ensure header exists

	const headerHeight = header.offsetHeight;

	// Adjust Topper Section
	const topperSection = document.getElementById('RPsbs-products');
	if (topperSection) {
		topperSection.style.paddingTop = `${headerHeight}px`;
	}

}

// Attach event listeners 
window.addEventListener('load', adjustSectionsOffset);
window.addEventListener('resize', adjustSectionsOffset);



// FAQ Boxes
const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
for (const item of faqItems) {
	const onClick = () => {
		item.classList.toggle('active')
	}
	item.addEventListener('click', onClick)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                Include all code below here for homepage gallery background                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////
// JS to move between images using arrow buttons on page. There is a transition fade b/t images
// Cycle the home page background image.

// Include all images to cycle
const imagesDesktop = [
	'images/20180815_100849.jpg',
	'images/20180816_184505.jpg',
	'images/20180816_190002.jpg'
];

// cropped versions of images to use for 650px width of less
const imagesMobile = [
    'images/20180815_100849 - m.jpg',
	'images/20180816_184505 - m.jpg',
	'images/20180816_190002 - m.jpg'
];

let currentIndex = 0;
let images = [];

// Function to set images based on screen size
function setImages() {
    images = (window.innerWidth < 650) ? imagesMobile : imagesDesktop; // Adjust the width as needed
}

// Function to change the background image with fade b/t images
function changeBackground() {

	const homePage = document.querySelector('.home-page');

	setTimeout(() => {
		homePage.style.backgroundImage = `url('${images[currentIndex]}')`;
	
		// Fade in effect
		homePage.style.opacity = 1; // Fade back in
	}, 1000); // Match this duration with the CSS transition duration

}


// Function to move to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; // Move to next image
    changeBackground();
}

// Function to move to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to previous image
    changeBackground();
}

// Initialize the images and set the initial background
function initialize() {
    setImages();
    changeBackground();
}

// Update images on resize
window.addEventListener('resize', () => {
    const previousIndex = currentIndex; // Save the current index
    setImages();
    currentIndex = Math.min(previousIndex, images.length - 1); // Ensure currentIndex is within bounds
    changeBackground();
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
