(function () {
    const pattern = "([ugoa]*)([+-=])([rwx]+)";

    const html = String.raw`
        <input
            id="Xst-output"
            type="text"
            value="ug+rw"
            pattern="${pattern}"
            style="margin-bottom: 0.5em" />

        <div style="display: flex">
            <div style="flex: 1">
                <ul>
                    <li><label><input type="checkbox" id="Xst-ent-none" /> Unspecified (All)</label></li>
                    <li><label><input type="checkbox" id="Xst-ent-all" /> All</label></li>
                    <li><label><input type="checkbox" id="Xst-ent-user" /> User</label></li>
                    <li><label><input type="checkbox" id="Xst-ent-group" /> Group</label></li>
                    <li><label><input type="checkbox" id="Xst-ent-other" /> Other</label></li>
                </ul>
            </div>
            <div style="flex: 1">
                <ul>
                    <li><label><input type="radio" name="Xst-op" id="Xst-op-add" /> Add</label></li>
                    <li><label><input type="radio" name="Xst-op" id="Xst-op-remove" /> Remove</label></li>
                    <li><label><input type="radio" name="Xst-op" id="Xst-op-set" /> Set</label></li>
                </ul>
            </div>
            <div style="flex: 1">
                <ul>
                    <li><label><input type="checkbox" id="Xst-per-read" /> Read</label></li>
                    <li><label><input type="checkbox" id="Xst-per-write" /> Write</label></li>
                    <li><label><input type="checkbox" id="Xst-per-execute" /> Execute</label></li>
                </ul>
            </div>
        </div>
    `;

    const tool = document.getElementById("symbol-tool");
    if (!tool) {
        return;
    }
    tool.innerHTML = html;

    const output = document.getElementById("Xst-output") as HTMLInputElement;
    const entNone = document.getElementById("Xst-ent-none") as HTMLInputElement;
    const entAll = document.getElementById("Xst-ent-all") as HTMLInputElement;
    const entUser = document.getElementById("Xst-ent-user") as HTMLInputElement;
    const entGroup = document.getElementById(
        "Xst-ent-group"
    ) as HTMLInputElement;
    const entOther = document.getElementById(
        "Xst-ent-other"
    ) as HTMLInputElement;
    const opAdd = document.getElementById("Xst-op-add") as HTMLInputElement;
    const opRemove = document.getElementById(
        "Xst-op-remove"
    ) as HTMLInputElement;
    const opSet = document.getElementById("Xst-op-set") as HTMLInputElement;
    const perRead = document.getElementById("Xst-per-read") as HTMLInputElement;
    const perWrite = document.getElementById(
        "Xst-per-write"
    ) as HTMLInputElement;
    const perExecute = document.getElementById(
        "Xst-per-execute"
    ) as HTMLInputElement;

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
            entNone.checked = true;
        } else {
            entNone.checked = false;
        }
        entAll.checked = entities.includes("a");
        entUser.checked = entities.includes("u");
        entGroup.checked = entities.includes("g");
        entOther.checked = entities.includes("o");

        opAdd.checked = operation === "+";
        opRemove.checked = operation === "-";
        opSet.checked = operation === "=";

        perRead.checked = permissions.includes("r");
        perWrite.checked = permissions.includes("w");
        perExecute.checked = permissions.includes("x");
    };
    output.addEventListener("change", updateCheckboxes);

    // Update output from checkboxes
    const updateOutput = (ev: Event) => {
        let entities = "";
        if (entNone.checked && ev.target === entNone) {
            entAll.checked = false;
            entUser.checked = false;
            entGroup.checked = false;
            entOther.checked = false;
        } else if (
            ev.target === entAll ||
            ev.target === entUser ||
            ev.target === entGroup ||
            ev.target === entOther
        ) {
            entNone.checked = false;
        }
        if (entAll.checked) {
            entities = "a";
        }
        if (entUser.checked) {
            entities += "u";
        }
        if (entGroup.checked) {
            entities += "g";
        }
        if (entOther.checked) {
            entities += "o";
        }

        let operation = "";
        if (opAdd.checked) {
            operation = "+";
        } else if (opRemove.checked) {
            operation = "-";
        } else if (opSet.checked) {
            operation = "=";
        }

        let permissions = "";
        if (perRead.checked) {
            permissions += "r";
        }
        if (perWrite.checked) {
            permissions += "w";
        }
        if (perExecute.checked) {
            permissions += "x";
        }

        output.value = `${entities}${operation}${permissions}`;
        output.classList.remove("invalid");
    };
    entNone.addEventListener("change", updateOutput);
    entAll.addEventListener("change", updateOutput);
    entUser.addEventListener("change", updateOutput);
    entGroup.addEventListener("change", updateOutput);
    entOther.addEventListener("change", updateOutput);
    opAdd.addEventListener("change", updateOutput);
    opRemove.addEventListener("change", updateOutput);
    opSet.addEventListener("change", updateOutput);
    perRead.addEventListener("change", updateOutput);
    perWrite.addEventListener("change", updateOutput);
    perExecute.addEventListener("change", updateOutput);

    updateCheckboxes();
})();
