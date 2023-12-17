const fs = require('fs');

const lines = fs.readFileSync('./inputs/day_1.txt', 'utf-8').split('\r\n');

const regex = /\d|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g;
const second_regex = /\d|(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)/g;

const digits = lines.map(line => {
    return [
        line.match(regex)[0],
        line.split("").reverse().join("").match(second_regex)[0].split("").reverse().join("")
    ]
})

const get_no = (x) => {
    if (!isNaN(Number(x))) { 
        return Number(x)
    } else {
        switch(x) {
            case 'one': return 1;
            case 'two': return 2;
            case 'three': return 3;
            case 'four': return 4;
            case 'five': return 5;
            case 'six': return 6;
            case 'seven': return 7;
            case 'eight': return 8;
            case 'nine': return 9;
        }
    }
}


const numbers = digits.map(set => {
    const first_no = get_no(set[0]);
    const last_no = get_no(set[1]);    
    console.log(Number(`${first_no}${last_no}`))
    return Number(`${first_no}${last_no}`)
})

const total = numbers.reduce((a,b) => a+b, 0)

console.log(total);