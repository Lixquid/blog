document.getElementById("clickme")?.addEventListener("click", function () {
    (this as HTMLButtonElement).innerText = "Hello World!";
});
