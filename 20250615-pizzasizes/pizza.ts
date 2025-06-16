(function () {
    const html = String.raw`
        <label style="display: block; margin-bottom: 0.5em;">
            <input type="checkbox" data-id="include-price"> Include Price Calculations
        </label>
        <label style="display: block; margin-bottom: 0.5em;">
            <input type="checkbox" data-id="show-diff"> Show Area Difference
        </label>
        <label style="display: block; margin-bottom: 1em;">
            <input type="checkbox" data-id="show-diagram"> Show Diagram
        </label>
        <table border="1" cellpadding="4" style="border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Diameter</th>
                    <th data-id="th-price" style="display: none;">Price</th>
                    <th style="border-left-width: 2px;">Area</th>
                    <th data-id="th-diff" style="display: none;">Δ Area</th>
                    <th data-id="th-cpa" style="display: none;">Cost per Area</th>
                    <th style="border-left-width: 2px;"></th>
                </tr>
            </thead>
            <tbody data-id="rows"></tbody>
        </table>
        <button data-id="add-row" style="margin-top: 1em;">Add Row</button>
        <br>
        <svg data-id="diagram" width="550" height="400" style="display: none; margin-top: 1em; border: 1px solid var(--color-border);"></svg>
    `;

    const root = document.getElementById("interactive-pizza");
    if (!root) return;
    root.innerHTML = html;

    const includePrice = root.querySelector(
        '[data-id="include-price"]',
    ) as HTMLInputElement;
    const showDiff = root.querySelector(
        '[data-id="show-diff"]',
    ) as HTMLInputElement;
    const showDiagram = root.querySelector(
        '[data-id="show-diagram"]',
    ) as HTMLInputElement;
    const rows = root.querySelector(
        '[data-id="rows"]',
    ) as HTMLTableSectionElement;
    const addRowBtn = root.querySelector(
        '[data-id="add-row"]',
    ) as HTMLButtonElement;
    const thPrice = root.querySelector(
        '[data-id="th-price"]',
    ) as HTMLTableCellElement;
    const thDiff = root.querySelector(
        '[data-id="th-diff"]',
    ) as HTMLTableCellElement;
    const thCPA = root.querySelector(
        '[data-id="th-cpa"]',
    ) as HTMLTableCellElement;
    const svgContainer = root.querySelector(
        '[data-id="diagram"]',
    ) as SVGSVGElement;

    function createRow() {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input type="number" min="0" step="any" style="width: 6em"></td>
            <td data-id="td-price" style="display: none;"><input type="number" min="0" step="any" style="width: 6em"></td>
            <td data-id="td-area" style="border-left-width: 2px;"></td>
            <td data-id="td-diff" style="display: none;"></td>
            <td data-id="td-cpa" style="display: none;"></td>
            <td style="border-left-width: 2px;">
                <button data-id="remove" title="Remove">&times;</button>
            </td>
        `;
        const diameterInput = tr.querySelector(
            'input[type="number"]',
        ) as HTMLInputElement;
        const priceTd = tr.querySelector(
            '[data-id="td-price"]',
        ) as HTMLTableCellElement;
        const priceInput = priceTd.querySelector("input") as HTMLInputElement;
        const areaTd = tr.querySelector(
            '[data-id="td-area"]',
        ) as HTMLTableCellElement;
        const diffTd = tr.querySelector(
            '[data-id="td-diff"]',
        ) as HTMLTableCellElement;
        const cpaTd = tr.querySelector(
            '[data-id="td-cpa"]',
        ) as HTMLTableCellElement;
        const removeBtn = tr.querySelector(
            '[data-id="remove"]',
        ) as HTMLButtonElement;

        function update() {
            const d = parseFloat(diameterInput.value);
            let area = "";
            let cpa = "";
            if (!isNaN(d) && d > 0) {
                const a = Math.PI * (d / 2) ** 2;
                area = a.toFixed(2);
                if (includePrice.checked) {
                    const price = parseFloat(priceInput.value);
                    if (!isNaN(price) && price > 0) {
                        cpa = (price / a).toFixed(4);
                    } else {
                        cpa = "";
                    }
                }
                areaTd.textContent = area;
                cpaTd.textContent = cpa;
            }
            // diffTd will be updated globally
        }

        diameterInput.addEventListener("input", () => {
            update();
            updateAllDiffs();
        });
        priceInput.addEventListener("input", update);
        includePrice.addEventListener("change", update);
        removeBtn.addEventListener("click", () => {
            tr.remove();
            updateAllDiffs();
        });
        showDiff.addEventListener("change", () => {
            diffTd.style.display = showDiff.checked ? "" : "none";
        });
        update();
        return tr;
    }

    function updateAllDiffs() {
        let prevArea: number | null = null;

        // Delta area calculations
        Array.from(rows.children).forEach((row) => {
            const areaTd = (row as HTMLElement).querySelector(
                '[data-id="td-area"]',
            ) as HTMLTableCellElement;
            const diffTd = (row as HTMLElement).querySelector(
                '[data-id="td-diff"]',
            ) as HTMLTableCellElement;
            const area = parseFloat(areaTd.textContent || "");
            if (!isNaN(area) && prevArea !== null) {
                diffTd.textContent = (area - prevArea).toFixed(2);
            } else {
                diffTd.textContent = "";
            }
            diffTd.style.display = showDiff.checked ? "" : "none";
            prevArea = !isNaN(area) ? area : prevArea;
        });

        // Diagram rendering
        const diameters = Array.from(rows.children)
            .map((row) => {
                const diameterInput = (row as HTMLElement).querySelector(
                    'input[type="number"]',
                ) as HTMLInputElement;
                return parseFloat(diameterInput.value);
            })
            .filter((d): d is number => !isNaN(d) && d > 0);
        const maxDiameter = Math.max(...diameters);
        const maxArea = Math.PI * (maxDiameter / 2) ** 2;
        diameters.sort((a, b) => b - a);
        svgContainer.innerHTML = diameters
            .map((d, i) => {
                const r = (d / 2 / maxDiameter) * 400;
                const color = `hsl(${(d / maxDiameter) * 360}, 50%, 40%)`;

                // A circle to show physical size
                // A bar to show relative size
                return `
                    <circle cx="200" cy="${r}" r="${r}" fill="${color}" stroke="black" stroke-width="1" />
                    <text x="200" y="${r * 2 - 12}" text-anchor="middle" font-size="24" fill="white">${d}</text>
                    <rect x="${450 + (i / diameters.length) * 100}" y="0" rx="5" width="${100 / diameters.length}" height="${((Math.PI * (d / 2) ** 2) / maxArea) * 100}%" fill="${color}" stroke-width="1" stroke="rgba(1, 1, 1, 0.5)" />
                `;
            })
            .join("");
    }

    function updateColumnVisibility() {
        const showPrice = includePrice.checked;
        thPrice.style.display = showPrice ? "" : "none";
        thCPA.style.display = showPrice ? "" : "none";
        const showDelta = showDiff.checked;
        thDiff.style.display = showDelta ? "" : "none";
        Array.from(rows.children).forEach((row) => {
            const priceTd = (row as HTMLElement).querySelector(
                '[data-id="td-price"]',
            ) as HTMLTableCellElement;
            const cpaTd = (row as HTMLElement).querySelector(
                '[data-id="td-cpa"]',
            ) as HTMLTableCellElement;
            const diffTd = (row as HTMLElement).querySelector(
                '[data-id="td-diff"]',
            ) as HTMLTableCellElement;
            if (priceTd) priceTd.style.display = showPrice ? "" : "none";
            if (cpaTd) cpaTd.style.display = showPrice ? "" : "none";
            if (diffTd) diffTd.style.display = showDelta ? "" : "none";
        });
    }

    function toggleDiagramVisibility() {
        svgContainer.style.display = showDiagram.checked ? "" : "none";
    }
    showDiagram.addEventListener("change", toggleDiagramVisibility);

    addRowBtn.addEventListener("click", () => {
        rows.appendChild(createRow());
        updateColumnVisibility();
        updateAllDiffs();
    });

    includePrice.addEventListener("change", () => {
        updateColumnVisibility();
    });
    showDiff.addEventListener("change", () => {
        updateColumnVisibility();
        updateAllDiffs();
    });

    // Add initial row
    rows.appendChild(createRow());
    updateColumnVisibility();
    updateAllDiffs();
    toggleDiagramVisibility();
})();
