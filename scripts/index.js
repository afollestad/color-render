const body = $("body");
const metaColor = $("meta[name='theme-color']");
const colorInfoContainer = $("#color-info-container");
const colorInfoDisplay = $("#color-info-display");
const colorInput = $("#color-input");

function updateColor(color) {
    body.css("background-color", color);
    metaColor.attr("content", color);
    window.location.hash = escape(color);

    const colorData = tinycolor(color);
    if (colorData.isValid()) {
        colorInfoContainer.css("visibility", "visible");
        displayValidColorData(colorData);
    } else {
        colorInfoContainer.css("visibility", "hidden");
    }
}

function displayValidColorData(colorData) {
    var colorDisplay;
    if (colorData.getFormat() === "hex") {
        // If the user inputted a hexadecimal, show the RGB code.
        colorDisplay = colorData.toRgbString();
    } else if (colorData.getAlpha() < 1) {
        // Else if the color is not opaque, we show the hexadecimal with the transparency component.
        colorDisplay = `#${colorData.toHex8()}`;
    } else {
        // Else we fallback to showing the opaque hexadecimal.
        colorDisplay = `#${colorData.toHex()}`;
    }

    updateTitle(`Color Render - ${colorDisplay}`);
    colorInfoDisplay.text(colorDisplay);

    colorInfoContainer.css(
        "color",
        (colorData.isLight() || colorData.getAlpha() < 0.5) ? "black" : "white"
    );
}

$(document).ready(function () {
    colorInput.on('input', function () {
        // Color input was changed by the user.
        updateColor($(this).val());
    });

    var prefillColor = getUnescapedURLHash();
    if (prefillColor) {
        colorInput.val(prefillColor);
    }
    updateColor(prefillColor);
});