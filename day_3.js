const fs = require('fs');

const rows = fs.readFileSync('./inputs/day_3.txt', 'utf-8').split('\r\n');

const row_length = rows[0].length;
const number_rows = rows.length;

const is_symbol = (row, col) => {
    const cell = rows[row]?.[col];

    if (!cell | cell === ".") {
        return false;
    } else if (!isNaN(Number(cell))) {
        return false;
    } else {
        return true;
    }
}

let numbers = [];
let gears = [];
for (i=0;i<number_rows;i++) {
    let current_number = [];
    // [[value, row, vol], [value, rol, col]]
    for (j=0;j<row_length;j++) {
        const cell_value = rows[i][j]
        if (isNaN(cell_value)) {
            if (current_number.length > 0) {
                numbers.push(current_number);
                current_number = [];
            }
            // Part 2
            if (cell_value === "*") {
                gears.push([i,j])
            }
        } else {
            current_number.push([cell_value, i, j])
            if (j === row_length - 1) {
                numbers.push(current_number);
            }
        }
    }
}

let part_sum = 0;
numbers.forEach(number => {
    let has_symbol = false;
    number.forEach(digit => {
        const row = digit[1];
        const col = digit[2];

        for (i=-1;i<=1;i++) {
            for (j=-1;j<=1;j++) {
                if (!(i == 0 && j == 0)) {
                    const symbol = is_symbol(row+i, col+j)
                    if (symbol) {
                        has_symbol = true;
                        break;
                    }
                }
            }
        }
    })

    if (has_symbol) {
        let actual_number = "";
        number.forEach(digit => actual_number += digit[0])
        part_sum += Number(actual_number)
    }
})
console.log("Part 1: ", part_sum);

//

let ratio_sum = 0;
gears.forEach(gear => {
    let adj_part_numbers = [];
    const row = gear[0];
    const col = gear[1];

    numbers.forEach(number => {
        let number_is_adj = false;
        number.forEach(digit => {
            const digit_row = digit[1];
            const digit_col = digit[2];
        
            for (i=-1;i<=1;i++) {
                for (j=-1;j<=1;j++) {
                    if (!(i == 0 && j == 0)) {
                        if (row+i === digit_row && col+j === digit_col) {
                            number_is_adj = true;
                        }
                    }
                }
            }
        })
        if (number_is_adj) {
            adj_part_numbers.push(number);
        }
    })

    if (adj_part_numbers.length === 2) {
        let first_num = "";
        adj_part_numbers[0].forEach(digit => first_num += digit[0])
        let second_num = "";
        adj_part_numbers[1].forEach(digit => second_num += digit[0])
        ratio_sum += (Number(first_num) * Number(second_num))
    }
})

console.log("Part 2: ", ratio_sum)