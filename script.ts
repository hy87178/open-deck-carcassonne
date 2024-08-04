interface Tile {
    tile_id: number;
    tile_type: string;
}

// タイルデータの配列
const tiles: Tile[] = [
    { tile_id: 1, tile_type: "tile_1.png" },
    { tile_id: 2, tile_type: "tile_1.png" },
    { tile_id: 3, tile_type: "tile_1.png" },
    { tile_id: 4, tile_type: "tile_1.png" },
    { tile_id: 5, tile_type: "tile_1.png" },
    { tile_id: 6, tile_type: "tile_2.png" },
    { tile_id: 7, tile_type: "tile_2.png" },
    { tile_id: 8, tile_type: "tile_2.png" },
    { tile_id: 9, tile_type: "tile_3.png" },

];

let remainingTiles: Tile[] = [];
let displayedTiles: Tile[] = [];

// 初期設定
function initializeGame() {
    remainingTiles = [...tiles];
    displayedTiles = [];
    updateRemainingTilesCount();
    displayRandomTile();
    setNextTileButtonState(true, false); // button_1がアクティブ
}

// "New Game" ボタンが押されたとき
document.querySelector("button")?.addEventListener("click", () => {
    initializeGame();
});

// タイルをランダムに表示
function displayRandomTile() {
    if (remainingTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingTiles.length);
        const selectedTile = remainingTiles.splice(randomIndex, 1)[0];
        displayedTiles.push(selectedTile);

        const imageElement = document.querySelector(".image img");
        if (imageElement) {
            imageElement.setAttribute("src", `path/to/your/images/${selectedTile.tile_type}`);
        }

        updateRemainingTilesCount();

        if (remainingTiles.length === 0) {
            alert("ゲーム終了！全てのタイルが表示されました。");
        }
    }
}

// 残りタイル数の表示を更新
function updateRemainingTilesCount() {
    const remainingText = document.querySelector(".text p");
    if (remainingText) {
        remainingText.textContent = `REMAINING TILES : ${remainingTiles.length}`;
    }
}

// "Next tile" ボタンの状態を更新
function setNextTileButtonState(button1Active: boolean, button2Active: boolean) {
    const button1 = document.querySelector(".button1") as HTMLButtonElement;
    const button2 = document.querySelector(".button2") as HTMLButtonElement;

    if (button1 && button2) {
        button1.disabled = !button1Active;
        button2.disabled = !button2Active;
    }
}

// "Next tile" ボタンが押されたとき
document.querySelector(".button1")?.addEventListener("click", () => {
    displayRandomTile();
    setNextTileButtonState(false, true);
});

document.querySelector(".button2")?.addEventListener("click", () => {
    displayRandomTile();
    setNextTileButtonState(true, false);
});

// ゲーム開始時に初期化
initializeGame();
