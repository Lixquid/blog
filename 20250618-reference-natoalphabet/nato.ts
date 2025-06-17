(function () {
    const html = String.raw`
        Input: <input
            type="text"
            data-id="input"
            value="Test"
            maxlength="100">
        <textarea
            data-id="output"
            readonly
            rows="5"
            style="width: 100%; margin-top: 0.5em; resize: none;"></textarea>
    `;

    const root = document.getElementById("interactive-nato");
    if (!root) return;
    root.innerHTML = html;

    const input = root.querySelector(
        "input[data-id='input']",
    ) as HTMLInputElement;
    const output = root.querySelector(
        "textarea[data-id='output']",
    ) as HTMLTextAreaElement;

    const nato = [
        ["A", "Alpha"],
        ["B", "Bravo"],
        ["C", "Charlie"],
        ["D", "Delta"],
        ["E", "Echo"],
        ["F", "Foxtrot"],
        ["G", "Golf"],
        ["H", "Hotel"],
        ["I", "India"],
        ["J", "Juliett"],
        ["K", "Kilo"],
        ["L", "Lima"],
        ["M", "Mike"],
        ["N", "November"],
        ["O", "Oscar"],
        ["P", "Papa"],
        ["Q", "Quebec"],
        ["R", "Romeo"],
        ["S", "Sierra"],
        ["T", "Tango"],
        ["U", "Uniform"],
        ["V", "Victor"],
        ["W", "Whiskey"],
        ["X", "X-ray"],
        ["Y", "Yankee"],
        ["Z", "Zulu"],
        ["0", "Zee-ro"],
        ["1", "Wun"],
        ["2", "Too"],
        ["3", "Tree"],
        ["4", "Fow-er"],
        ["5", "Fife"],
        ["6", "Six"],
        ["7", "Seven"],
        ["8", "Ait"],
        ["9", "Nin-er"],
    ];

    function updateOutput() {
        const value = input.value.toUpperCase();
        const words = [];
        for (const ch of value) {
            if (ch === " ") {
                words.push("");
                continue;
            }
            const entry = nato.find(([letter]) => letter === ch);
            if (entry) {
                words.push(entry[1]);
            } else {
                words.push(ch);
            }
        }
        output.value = words.join(" ");
    }
    input.addEventListener("input", updateOutput);
    updateOutput();
})();
