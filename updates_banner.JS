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
}

// Call the function to load the markdown content when the page loads
window.onload = loadMarkdown;