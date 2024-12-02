// Function to fetch the Markdown content from the file and render it
async function loadMarkdown() {
    try {
      // Fetch the markdown file (adjust the path if needed)
      const response = await fetch('CMS/updates.md');
      const markdown = await response.text();
  
      // Parse the markdown using the 'marked' library
      const htmlContent = marked.parse(markdown); // Updated for version 4.x.x
  
      // Get the title and content from the markdown
      const titleMatch = htmlContent.match(/<h1.*?>(.*?)<\/h1>/);
      const content = html.match(/<p>(.*?)<\/p>/); // Fetch paragraph - main content
      
      // Insert content into the update-banner div
      const updateBanner = document.getElementById('update-banner');
      const updateContent = document.getElementById('update-content');
  
      // Add title (if any) and content to the banner
      if (titleMatch) {
        updateContent.innerHTML = content;
      } 
    } catch (error) {
      console.error('Error loading markdown:', error);
    }
  }
  
  // Call the function to load the markdown content when the page loads
  window.onload = loadMarkdown;