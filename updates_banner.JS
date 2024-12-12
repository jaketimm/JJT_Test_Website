// Function to fetch the Markdown content from the file and render it as plain text
async function loadMarkdown() {
    try {
        // Fetch the markdown file (adjust the path if needed)
        const response = await fetch('CMS/updates.md');

        // Check if the fetch was successful (response.status 200)
        if (!response.ok) {
            if (response.status === 404) {
                console.log('Markdown file not found (404).');
            } else {
                console.log(`Error fetching the markdown file: ${response.status} ${response.statusText}`);
            }
            return; // Exit if the file can't be fetched
        }

        const markdown = await response.text();

        // Extract the title from the frontmatter using regex
        const titleMatch = markdown.match(/^title:\s*(.*)$/m);

        // Remove the YAML frontmatter (everything before and including the first '---')
        const contentMatch = markdown.replace(/^---.*?---/s, '').trim(); // Remove the frontmatter block

        // Convert markdown links to HTML anchor tags, and convert bold and italic markdown to HTML
        const htmlContent = contentMatch
            .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
                // Ensure the URL starts with 'http' or 'https'
                if (!/^https?:\/\//.test(url)) {
                    url = 'https://' + url; // Default to 'https://'
                }
                return `<a href="${url}" target="_blank">${text}</a>`; // Create a proper <a> tag
            })
            .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>') // Convert bold markdown to <strong> tags
            .replace(/_(.*?)_/g, '<em>$1</em>') // Convert italic markdown to <em> tags

        // Get the update-banner and update-content elements
        const updateBanner = document.getElementById('update-banner');
        const updateContent = document.getElementById('update-content');

        updateContent.innerHTML = htmlContent; // Set the main content as plain text

    } catch (error) {
        console.error('Error loading markdown:', error);
    }


    const updateContent = document.querySelector('#update-content');  // Select #update-content
    const updateBanner = document.querySelector('#update-banner');    // Select #update-banner
   
    const screenWidth = window.innerWidth;  // Get the height of the screen (viewport)

    // Check if the update-content div is not empty (has text or child elements)
    if (updateContent.textContent.trim() !== '') {
        // Apply 50px padding on mobile (screen height <= 768px) or 100px on larger screens
        if (screenWidth <= 768) {
            updateBanner.style.paddingTop = '50px';  // Apply 50px padding to update-banner on mobile
        } else {
            updateBanner.style.paddingTop = '100px'; // Apply 100px padding to update-banner on larger screens
        }
    }
}

// Call the function to load the markdown content when the page loads
window.onload = loadMarkdown;

