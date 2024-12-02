// Function to fetch the Markdown content from the file and render it as plain text
async function loadMarkdown() {
    try {
        // Fetch the markdown file (adjust the path if needed)
        const response = await fetch('CMS/updates.md');
        const markdown = await response.text();

        // Check if the fetch was successful (response.status 200)
        if (!response.ok) {
            console.log('Updates Markdown file not found or unable to fetch.');
            return; // Exit if the file can't be fetched (e.g., file does not exist)
        }

        // Extract the title from the frontmatter using regex
        const titleMatch = markdown.match(/^title:\s*(.*)$/m);

        // Remove the YAML frontmatter (everything before and including the first '---')
        const contentMatch = markdown.replace(/^---.*?---/s, '').trim(); // Remove the frontmatter block

        // Convert markdown links to HTML anchor tags, and remove other markdown syntax
        const htmlContent = contentMatch
            .replace(/\[([^\]]+)\]\(<([^>]+)>\)/g, '<a href="$2">$1</a>') // Convert markdown links to anchor tags
            .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold markdown syntax
            .replace(/_(.*?)_/g, '$1') // Remove italic markdown syntax
            .replace(/#+\s*(.*)/g, '$1'); // Remove headers (optional, if you want plain text)

        // Get the update-banner and update-content elements
        const updateBanner = document.getElementById('update-banner');
        const updateContent = document.getElementById('update-content');

        updateContent.innerText = htmlContent; // Set the main content as plain text

    } catch (error) {
        console.error('Error loading markdown:', error);
    }
}

// Call the function to load the markdown content when the page loads
window.onload = loadMarkdown;