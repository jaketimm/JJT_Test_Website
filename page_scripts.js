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
// JS for full page background image with button advance
// Set the height of the background image on load, make sure it doesn't resize
function setFullHeight() {
	const homePage = document.querySelector('.home-page');
	homePage.style.height = `${window.innerHeight}px`;
}

// Set height on load
window.addEventListener('load', setFullHeight);
// Listen for orientation changes
window.addEventListener('orientationchange', handleOrientationChange);

function handleOrientationChange() {
    setFullHeight();
}

// Cycle the home page background image.
const images = [
	'images/20180815_100849.jpg',
	'images/20180816_184505.jpg',
	'images/20180816_190002.jpg'
];

let currentIndex = 0;

function changeBackground() {
	const homePage = document.querySelector('.home-page');
	homePage.style.backgroundImage = `url('${images[currentIndex]}')`;

}

function nextImage() {
	currentIndex = (currentIndex + 1) % images.length; // Move to next image
	changeBackground();
}

function prevImage() {
	currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to previous image
	changeBackground();
}
