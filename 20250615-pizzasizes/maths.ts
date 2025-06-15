(function () {
    const html = String.raw`
        <p>
            Radius: <input
                data-id="radius"
                type="number"
                min="0"
                step="any"
                value="2"
                style="margin-right: 1em; width: 6em">
            Diameter: <input
                data-id="diameter"
                type="number"
                min="0"
                step="any"
                style="width: 6em">
        </p>
        <p>
            Area: <span data-id="area"></span>
        </p>
    `;

    const root = document.getElementById("interactive-maths");
    if (!root) {
        return;
    }
    root.innerHTML = html;

    const radius = root.querySelector('[data-id="radius"]') as HTMLInputElement;
    const diameter = root.querySelector(
        '[data-id="diameter"]',
    ) as HTMLInputElement;
    const area = root.querySelector('[data-id="area"]') as HTMLSpanElement;

    function updateFromRadius() {
        const r = parseFloat(radius.value);
        if (!isNaN(r)) {
            diameter.value = (2 * r).toString();
            area.textContent = (Math.PI * r ** 2).toFixed(2);
        }
        radius.reportValidity();
        diameter.reportValidity();
    }

    function updateFromDiameter() {
        const d = parseFloat(diameter.value);
        if (!isNaN(d)) {
            radius.value = (d / 2).toString();
            area.textContent = (Math.PI * (d / 2) ** 2).toFixed(2);
        }
        radius.reportValidity();
        diameter.reportValidity();
    }

    radius.addEventListener("input", updateFromRadius);
    diameter.addEventListener("input", updateFromDiameter);

    updateFromRadius();
})();
