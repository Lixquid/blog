(function () {
    type Suit = "c" | "d" | "h" | "s";
    type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    const suitMap: Record<Suit, string> = {
        c: "&#x2663;&#xfe0f;",
        d: "&#x2666;&#xfe0f;",
        h: "&#x2665;&#xfe0f;",
        s: "&#x2660;&#xfe0f;",
    };
    const rankMap: Record<Rank, string> = {
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "J",
        12: "Q",
        13: "K",
        14: "A",
    };

    const html = String.raw`
        <p>Played Cards: <span data-name="cards"></span></p>
        <p>Winner: <span data-name="winner">None</span></p>
        <p>Leading Suit: <span data-name="leading">None</span></p>
        <select data-name="suit">
            <option value="c">${suitMap.c}</option>
            <option value="d">${suitMap.d}</option>
            <option value="h">${suitMap.h}</option>
            <option value="s">${suitMap.s}</option>
        </select>
        <select data-name="rank">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">J</option>
            <option value="12">Q</option>
            <option value="13">K</option>
            <option value="14">A</option>
        </select>
        <button data-name="add">Add</button>
    `;

    const root = document.getElementById("interactive-tool");
    if (!root) {
        return;
    }
    root.innerHTML = html;

    const cards = root.querySelector("[data-name=cards]") as HTMLSpanElement;
    const winner = root.querySelector("[data-name=winner]") as HTMLSpanElement;
    const leading = root.querySelector(
        "[data-name=leading]"
    ) as HTMLSpanElement;
    const suit = root.querySelector("[data-name=suit]") as HTMLSelectElement;
    const rank = root.querySelector("[data-name=rank]") as HTMLSelectElement;
    const add = root.querySelector("[data-name=add]") as HTMLButtonElement;

    function cardHTML([suit, rank]: [Suit, Rank]) {
        return String.raw`${suitMap[suit]}${rankMap[rank]}`;
    }

    const playedCards: [Suit, Rank][] = [];
    function refresh() {
        cards.replaceChildren(
            ...playedCards.map((card) => {
                const button = document.createElement("button");
                button.innerHTML = cardHTML(card);
                button.addEventListener("click", function () {
                    playedCards.splice(playedCards.indexOf(card), 1);
                    refresh();
                });
                return button;
            })
        );

        const leadingSuit = playedCards.length > 0 ? playedCards[0][0] : null;
        leading.innerHTML = leadingSuit ? suitMap[leadingSuit] : "None";

        const scores = playedCards.map(([suit, rank], index) => {
            return [
                index,
                rank +
                    (suit === leadingSuit ? 100 : 0) +
                    (suit === "d" ? 200 : 0),
            ] as const;
        });
        if (playedCards.length === 0) {
            winner.innerHTML = "None";
        } else {
            const winningCard =
                playedCards[scores.reduce((a, b) => (a[1] > b[1] ? a : b))[0]];
            winner.innerHTML = cardHTML(winningCard);
        }
    }
    add.addEventListener("click", function () {
        playedCards.push([suit.value as Suit, parseInt(rank.value) as Rank]);
        refresh();
    });
})();
