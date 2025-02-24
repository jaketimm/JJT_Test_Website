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

	// Adjust Topper Section
	const BannerSection = document.getElementById('Banner-Section');
	if (BannerSection) {
		BannerSection.style.paddingTop = `${headerHeight}px`;
	}

	// Adjust Topper Section
	const TitleSection = document.getElementById('cs-content-831');
	if (TitleSection) {
		TitleSection.style.paddingTop = `${headerHeight}px`;
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

//////////////////////////////////////////////////////////////////////////////////
//animate typing words on screen 
const words = ['Go', 'And', 'Explore'];
const animatedText = document.querySelector('.cs-animated-text');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isFinalCycle = false;

// Start with first word already displayed
animatedText.textContent = words[0];
charIndex = words[0].length;
isDeleting = true; // Start in deleting mode

function type() {
    const currentWord = words[wordIndex];
    
    // Check if we're on the last word (three)
    if (wordIndex === words.length - 1 && !isDeleting && charIndex === currentWord.length) {
        animatedText.classList.add('stopped');
        return; // Stop the animation
    }

    if (!isDeleting) {
        // Typing
        animatedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentWord.length) {
            // Pause before deleting (changed to 750ms)
            setTimeout(() => {
                isDeleting = true;
            }, 750);
        }
    } else {
        // Deleting
        animatedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    // Adjust timing based on typing or deleting
    const typingSpeed = isDeleting ? 50 : 150;
    setTimeout(type, typingSpeed);
}

// Start the animation when the page loads with 500ms delay before first deletion
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 500); // Initial delay before starting deletion
});
