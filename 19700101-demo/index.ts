(function () {
    const html = String.raw`
        <button>Increment</button>:
        <span>0</span>
    `;

    const root = document.getElementById("interactive-example");
    if (!root) {
        return;
    }
    root.innerHTML = html;

    const inc = root.querySelector("button") as HTMLButtonElement;
    const count = root.querySelector("span") as HTMLSpanElement;

    inc.addEventListener("click", function () {
        count.innerText = (parseInt(count.innerText) + 1).toString();
    });
})();
