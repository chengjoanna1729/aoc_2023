const fs = require('fs');

const rows = fs.readFileSync('./inputs/day_4.txt', 'utf-8').split('\r\n');

const card_infos = rows.map(row => {
    const latter_half = row.split(": ")[1];
    return latter_half.split(" | ").map(half => half.split(" ").map(Number).filter(x=>x))
})

let points = 0;
let games_map = {};
card_infos.forEach((info, index) => {
    const card_no = index+1;

    const winning_nos = info[0];
    const my_nos = info[1];
    let wins = 0;
    my_nos.forEach(no => {
        if (winning_nos.includes(no)) {
            wins += 1;
        }
    })
    const game_points = 2**(wins-1);

    if (!games_map[card_no]) {
        games_map[card_no] = {};
    }
    games_map[card_no].points = game_points;
    if (!games_map[card_no].copies) {
        games_map[card_no].copies = 1;
    } else {
        games_map[card_no].copies += 1;
    }
    const self_copies = games_map[card_no].copies

    for (i=1; i<=wins;i++) {
        const game_no = card_no + i;
        if (!games_map[game_no]) {
            games_map[game_no] = {};
        }

        const game_copies = games_map[game_no].copies;
        if (!game_copies) {
            games_map[game_no].copies = self_copies;
        } else {
            games_map[game_no].copies += self_copies;
        }
    }
    if (wins > 0) {

        points += 2**(wins-1);
    }
})
console.log("Part 1: ", points);

let copies = 0;
for (const [key, value] of Object.entries(games_map)) {
    copies += value.copies
}
console.log("Part 2: ", copies);
