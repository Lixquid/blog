(function () {
    const pattern = "([ugoa]*)([+-=])([rwx]+)";

    const html = String.raw`
        <input
            type="text"
            value="ug+rw"
            pattern="${pattern}"
            style="margin-bottom: 0.5em" />

        <div style="display: flex">
            <div style="flex: 1; min-width: 12em">
                <ul>
                    <li><label><input type="checkbox" data-name="en" /> Unspecified (All)</label></li>
                    <li><label><input type="checkbox" data-name="ea" /> All</label></li>
                    <li><label><input type="checkbox" data-name="eu" /> User</label></li>
                    <li><label><input type="checkbox" data-name="eg" /> Group</label></li>
                    <li><label><input type="checkbox" data-name="eo" /> Other</label></li>
                </ul>
            </div>
            <div style="flex: 1; min-width: 10em">
                <ul>
                    <li><label><input type="radio" name="op" data-name="oa" /> Add</label></li>
                    <li><label><input type="radio" name="op" data-name="or" /> Remove</label></li>
                    <li><label><input type="radio" name="op" data-name="os" /> Set</label></li>
                </ul>
            </div>
            <div style="flex: 1; min-width: 10em">
                <ul>
                    <li><label><input type="checkbox" data-name="pr" /> Read</label></li>
                    <li><label><input type="checkbox" data-name="pw" /> Write</label></li>
                    <li><label><input type="checkbox" data-name="pe" /> Execute</label></li>
                </ul>
            </div>
        </div>
    `;

    const root = document.getElementById("interactive-symbol");
    if (!root) {
        return;
    }
    root.innerHTML = html;

    const output = root.querySelector("input") as HTMLInputElement;
    const eNon = root.querySelector('[data-name="en"]') as HTMLInputElement;
    const eAll = root.querySelector('[data-name="ea"]') as HTMLInputElement;
    const eUsr = root.querySelector('[data-name="eu"]') as HTMLInputElement;
    const eGrp = root.querySelector('[data-name="eg"]') as HTMLInputElement;
    const eOth = root.querySelector('[data-name="eo"]') as HTMLInputElement;
    const oAdd = root.querySelector('[data-name="oa"]') as HTMLInputElement;
    const oRem = root.querySelector('[data-name="or"]') as HTMLInputElement;
    const oSet = root.querySelector('[data-name="os"]') as HTMLInputElement;
    const pRed = root.querySelector('[data-name="pr"]') as HTMLInputElement;
    const pWrt = root.querySelector('[data-name="pw"]') as HTMLInputElement;
    const pExc = root.querySelector('[data-name="pe"]') as HTMLInputElement;

    // Update checkboxes from output
    const updateCheckboxes = () => {
        if (output.validity.valid) {
            output.classList.remove("invalid");
        } else {
            output.classList.add("invalid");
            return;
        }
        const [, entities, operation, permissions] = output.value.match(
            new RegExp(pattern)
        ) as RegExpMatchArray;

        if (entities === "") {
            eNon.checked = true;
        } else {
            eNon.checked = false;
        }
        eAll.checked = entities.includes("a");
        eUsr.checked = entities.includes("u");
        eGrp.checked = entities.includes("g");
        eOth.checked = entities.includes("o");

        oAdd.checked = operation === "+";
        oRem.checked = operation === "-";
        oSet.checked = operation === "=";

        pRed.checked = permissions.includes("r");
        pWrt.checked = permissions.includes("w");
        pExc.checked = permissions.includes("x");
    };
    output.addEventListener("change", updateCheckboxes);

    // Update output from checkboxes
    const updateOutput = (ev: Event) => {
        let entities = "";
        if (eNon.checked && ev.target === eNon) {
            eAll.checked = false;
            eUsr.checked = false;
            eGrp.checked = false;
            eOth.checked = false;
        } else if (
            ev.target === eAll ||
            ev.target === eUsr ||
            ev.target === eGrp ||
            ev.target === eOth
        ) {
            eNon.checked = false;
        }
        if (eAll.checked) {
            entities = "a";
        }
        if (eUsr.checked) {
            entities += "u";
        }
        if (eGrp.checked) {
            entities += "g";
        }
        if (eOth.checked) {
            entities += "o";
        }

        let operation = "";
        if (oAdd.checked) {
            operation = "+";
        } else if (oRem.checked) {
            operation = "-";
        } else if (oSet.checked) {
            operation = "=";
        }

        let permissions = "";
        if (pRed.checked) {
            permissions += "r";
        }
        if (pWrt.checked) {
            permissions += "w";
        }
        if (pExc.checked) {
            permissions += "x";
        }

        output.value = `${entities}${operation}${permissions}`;
        output.classList.remove("invalid");
    };
    eNon.addEventListener("change", updateOutput);
    eAll.addEventListener("change", updateOutput);
    eUsr.addEventListener("change", updateOutput);
    eGrp.addEventListener("change", updateOutput);
    eOth.addEventListener("change", updateOutput);
    oAdd.addEventListener("change", updateOutput);
    oRem.addEventListener("change", updateOutput);
    oSet.addEventListener("change", updateOutput);
    pRed.addEventListener("change", updateOutput);
    pWrt.addEventListener("change", updateOutput);
    pExc.addEventListener("change", updateOutput);

    updateCheckboxes();
})();
