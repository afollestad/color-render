// Clicking the color-info span copies the hex to the user's clipboard and displays a tooltip.
new ClipboardJS('#color-info-copy', {
    text: function (trigger) {
        return colorInput.val();
    }
});

tippy("#color-info-copy", {
    content: "Copied!",
    trigger: "click"
});
