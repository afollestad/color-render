function updateTitle(title) {
    $('meta[property="og:title"]').attr('content', title);
    $('title').text(title);
}

function getUnescapedURLHash() {
    var prefillColor = unescape(window.location.hash);
    if (prefillColor) {
        // Pre-fill from the URL hash.
        prefillColor = prefillColor.substring(1);
    }
    return prefillColor;
}
