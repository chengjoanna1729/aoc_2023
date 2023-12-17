const fs = require('fs');

const games = fs.readFileSync('./inputs/day_2.txt', 'utf-8').split('\r\n');

const limits = {
    blue: 14,
    red: 12,
    green: 13
}

// const games_map = {}
// games.map(game => game.split(": ")).forEach(line => {
//     games_map[Number(line[0].slice(5))] = line[1].split("; ");
// });

// const check_in_limits = (item_map) => {
//     for (const [item_key, item_value] of Object.entries(item_map)) {
//         if (item_value > limits[item_key]) {
//             return false;
//         }
//     }
//     return true;
// } 

// let id_sum = 0;
// for (const [key, value] of Object.entries(games_map)) {
//     let all_in_limits = true;
//     value.forEach(bag => {
//         const items = bag.split(", ");
//         const item_map = {}
//         items.forEach(item => {
//             const no_and_colour = item.split(" ")
//             item_map[no_and_colour[1]] = Number(no_and_colour[0])
//         })

//         const in_limits = check_in_limits(item_map)

//         if (!in_limits) {
//             all_in_limits = false;
//         }
//     })

//     if (all_in_limits) {
//         id_sum += Number(key)
//     }
// }

// console.log("Part 1:", id_sum);


const games_map = {}
games.map(game => game.split(": ")).forEach(line => {
    games_map[Number(line[0].slice(5))] = line[1].split("; ");
});

const update_mins = (item_map, mins_map) => {
    for (const [item_key, item_value] of Object.entries(item_map)) {
        if (item_value > mins_map[item_key]) {
            mins_map[item_key] = item_value
        }
    }
} 

let power_sum = 0;
for (const [key, value] of Object.entries(games_map)) {
    const mins_map = {
        blue: 0,
        red: 0,
        green: 0
    }

    value.forEach(bag => {
        const items = bag.split(", ");
        const item_map = {}
        items.forEach(item => {
            const no_and_colour = item.split(" ")
            item_map[no_and_colour[1]] = Number(no_and_colour[0])
        })

        update_mins(item_map, mins_map)
    })

    const power = mins_map["blue"] * mins_map["red"] * mins_map["green"]
    power_sum += power
}
console.log("Part 2:", power_sum);
