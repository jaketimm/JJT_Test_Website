// Function to fetch the Markdown content from the file and render it as plain text
async function loadMarkdown() {
    try {
        // Fetch the markdown file (adjust the path if needed)
        const response = await fetch('CMS/updates.md');
        const markdown = await response.text();

        // Check if the fetch was successful (response.status 200)
        if (!response.ok) {
            console.log('Error: Markdown file not found or unable to fetch.');
            return; // Exit if the file can't be fetched (e.g., file does not exist)
        }

        // Check if the markdown content is empty
        if (!markdown.trim()) {
            console.log('No content available in the markdown file.');
            return; // Exit if the markdown file is empty
        }

        // Extract the title and content using regex (basic parsing)
        const titleMatch = markdown.match(/^title:\s*(.*)$/m);
        const contentMatch = markdown.replace(/^.*?---/s, '').trim(); // Remove the YAML frontmatter

        // Extract only the main content (text without Markdown)
        const plainTextContent = contentMatch.replace(/\[([^\]]+)\]\(<([^>]+)>\)/g, '$1'); // Remove markdown links

        // Get the update-banner and update-content elements
        const updateBanner = document.getElementById('update-banner');
        const updateContent = document.getElementById('update-content');

        updateContent.innerText = plainTextContent; // Set the main content as plain text

    } catch (error) {
        console.error('Error loading markdown:', error);
    }
}

// Call the function to load the markdown content when the page loads
window.onload = loadMarkdown;