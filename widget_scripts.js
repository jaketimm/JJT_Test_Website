
document.addEventListener('DOMContentLoaded', function () {
    var widgetContainer = document.getElementById('widget-container');

    // Create the Facebook profile widget
    var widgetDiv = document.createElement('div');
    widgetDiv.className = 'sk-ww-facebook-profile';
    widgetDiv.setAttribute('data-embed-id', '25493981');

    // Append the widget to the container
    widgetContainer.appendChild(widgetDiv);

    // Create the script tag to load the widget script
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://widgets.sociablekit.com/facebook-profile/widget.js';
    scriptTag.defer = true;

    // Append the script tag to the container
    document.body.appendChild(scriptTag);
});

