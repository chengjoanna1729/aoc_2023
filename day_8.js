const fs = require('fs');

const rows = fs.readFileSync('./inputs/day_8.txt', 'utf-8').split('\r\n');
const steps = "LRRLRRLLRRRLRRLRLRRRLRRLRRRLRLLRRRLRRRLRLRRRLRRLRRLRLRLLLRRRLRRRLRRLRRLRLRRRLRRLLRRLRRLRLLRLRLRRLRLLRLRLRRRLRRLRLLRLRLLRRLRLRRLLLRLRRLRRRLLLRRLRLRRRLLRRLLLRRRLRRRLLLRRLLRLRRLRLRRLLLRLRRLLLLRRLLRRRLRRLRRLRLRLLRLRRRLLRRLLRRLRRLRRLRRLRLLRRLRRRLRLRLLLRRRLLRRRLRRLRRLLLLRRRR";

const instruction_map = new Map();

rows.forEach(row => {
    const [source, destination] = row.split(' = ')
    const [destL, destR] = destination.slice(1, -1).split(', ');
    instruction_map.set(source, { "L": destL, "R": destR })
})

let step_count_1 = 0
let source = "AAA"

while (source !== "ZZZ") {
    const step_index = step_count_1 % steps.length;
    source = instruction_map.get(source)[steps[step_index]]
    step_count_1 += 1;
}

console.log("Part 1: ", step_count_1);

let starting_nodes = [];

for (let [key, value] of instruction_map) {
    if (key[2] === "A") {
        starting_nodes.push(key);
    }
}

const steps_array = [];
starting_nodes.forEach((node, node_index) => {
    let temp_step_count = 0;
    while (node[2] !== "Z") {
        const step_index = temp_step_count % steps.length;
        node = instruction_map.get(node)[steps[step_index]]
        temp_step_count += 1;
    }
    steps_array.push(temp_step_count);
})

console.log("Part 2: LCM of", steps_array);