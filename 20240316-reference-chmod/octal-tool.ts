(function () {
    const html = String.raw`
        <input
            type="text"
            value="644"
            pattern="[0-7]{3}"
            maxlength="3"
            style="margin-bottom: 0.5em" />

        <table>
            <head>
                <tr>
                    <th></th>
                    <th>Owner</th>
                    <th>Group</th>
                    <th>Other</th>
                </tr>
            </head>
            <tbody>
                <tr>
                    <th>Read</th>
                    <td><input type="checkbox" data-id="or" class="large"/></td>
                    <td><input type="checkbox" data-id="gr" class="large"/></td>
                    <td><input type="checkbox" data-id="wr" class="large"/></td>
                </tr>
                <tr>
                    <th>Write</th>
                    <td><input type="checkbox" data-id="ow" class="large" checked/></td>
                    <td><input type="checkbox" data-id="gw" class="large" /></td>
                    <td><input type="checkbox" data-id="ww" class="large" /></td>
                </tr>
                <tr>
                    <th>Execute</th>
                    <td><input type="checkbox" data-id="ox" class="large" /></td>
                    <td><input type="checkbox" data-id="gx" class="large" /></td>
                    <td><input type="checkbox" data-id="wx" class="large" /></td>
                </tr>
            </tbody>
        </table>
    `;

    const root = document.getElementById("interactive-octal");
    if (!root) {
        return;
    }
    root.innerHTML = html;

    const output = root.querySelector("input") as HTMLInputElement;
    const or = root.querySelector('[data-id="or"]') as HTMLInputElement;
    const ow = root.querySelector('[data-id="ow"]') as HTMLInputElement;
    const ox = root.querySelector('[data-id="ox"]') as HTMLInputElement;
    const gr = root.querySelector('[data-id="gr"]') as HTMLInputElement;
    const gw = root.querySelector('[data-id="gw"]') as HTMLInputElement;
    const gx = root.querySelector('[data-id="gx"]') as HTMLInputElement;
    const wr = root.querySelector('[data-id="wr"]') as HTMLInputElement;
    const ww = root.querySelector('[data-id="ww"]') as HTMLInputElement;
    const wx = root.querySelector('[data-id="wx"]') as HTMLInputElement;

    // Update checkboxes from output
    const updateCheckboxes = () => {
        if (output.validity.valid) {
            output.classList.remove("invalid");
        } else {
            output.classList.add("invalid");
            return;
        }
        const value = output.value;
        const o = value[0];
        const g = value[1];
        const w = value[2];
        or.checked = o === "4" || o === "5" || o === "6" || o === "7";
        ow.checked = o === "2" || o === "3" || o === "6" || o === "7";
        ox.checked = o === "1" || o === "3" || o === "5" || o === "7";
        gr.checked = g === "4" || g === "5" || g === "6" || g === "7";
        gw.checked = g === "2" || g === "3" || g === "6" || g === "7";
        gx.checked = g === "1" || g === "3" || g === "5" || g === "7";
        wr.checked = w === "4" || w === "5" || w === "6" || w === "7";
        ww.checked = w === "2" || w === "3" || w === "6" || w === "7";
        wx.checked = w === "1" || w === "3" || w === "5" || w === "7";
    };
    output.addEventListener("change", updateCheckboxes);

    // Update output from checkboxes
    const updateOutput = () => {
        const o =
            (or.checked ? 4 : 0) + (ow.checked ? 2 : 0) + (ox.checked ? 1 : 0);
        const g =
            (gr.checked ? 4 : 0) + (gw.checked ? 2 : 0) + (gx.checked ? 1 : 0);
        const w =
            (wr.checked ? 4 : 0) + (ww.checked ? 2 : 0) + (wx.checked ? 1 : 0);
        output.value = `${o}${g}${w}`;
        output.classList.remove("invalid");
    };
    or.addEventListener("change", updateOutput);
    ow.addEventListener("change", updateOutput);
    ox.addEventListener("change", updateOutput);
    gr.addEventListener("change", updateOutput);
    gw.addEventListener("change", updateOutput);
    gx.addEventListener("change", updateOutput);
    wr.addEventListener("change", updateOutput);
    ww.addEventListener("change", updateOutput);
    wx.addEventListener("change", updateOutput);

    updateCheckboxes();
})();
