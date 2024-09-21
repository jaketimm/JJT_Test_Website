// Scripts to run the top banner nav bar

// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#bcw-navigation');
const CShamburgerMenu = document.querySelector('#bcw-navigation .bcw-toggle');

CShamburgerMenu.addEventListener('click', function () {
	CShamburgerMenu.classList.toggle('bcw-active');
	CSnavbarMenu.classList.toggle('bcw-active');
	CSbody.classList.toggle('bcw-open');
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the bcw-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector('#bcw-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#bcw-navigation .bcw-dropdown'));
for (const item of dropDowns) {
	const onClick = () => {
		item.classList.toggle('bcw-active');
	};
	item.addEventListener('click', onClick);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Single function to adjust padding based on the navigation header height
function adjustSectionsOffset() {
	// Get the height of the navigation header
	const header = document.getElementById('bcw-navigation');
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
const faqItems = Array.from(document.querySelectorAll('.bcw-faq-item'));
for (const item of faqItems) {
	const onClick = () => {
		item.classList.toggle('active')
	}
	item.addEventListener('click', onClick)
}

