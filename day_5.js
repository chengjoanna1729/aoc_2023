const fs = require('fs');

const seeds = fs.readFileSync('./inputs/day_5_seeds.txt', 'utf-8').split(' ').map(Number);
const seed_to_soil = fs.readFileSync('./inputs/day_5_seed_soil.txt', 'utf-8').split('\r\n').map(row => row.split(' ').map(Number));
const soil_to_fertiliser = fs.readFileSync('./inputs/day_5_soil_fertiliser.txt', 'utf-8').split('\r\n').map(row => row.split(' ').map(Number));
const fertiliser_water = fs.readFileSync('./inputs/day_5_fertiliser_water.txt', 'utf-8').split('\r\n').map(row => row.split(' ').map(Number));
const water_light = fs.readFileSync('./inputs/day_5_water_light.txt', 'utf-8').split('\r\n').map(row => row.split(' ').map(Number));
const light_temp = fs.readFileSync('./inputs/day_5_light_temperature.txt', 'utf-8').split('\r\n').map(row => row.split(' ').map(Number));
const temp_humidity = fs.readFileSync('./inputs/day_5_temperature_humidity.txt', 'utf-8').split('\r\n').map(row => row.split(' ').map(Number));
const humidity_location = fs.readFileSync('./inputs/day_5_humidity_location.txt', 'utf-8').split('\r\n').map(row => row.split(' ').map(Number));

const compute_next_array = (og_array, og_new_map) => {
    return og_array.map(og => {
        let item;
        og_new_map.forEach(row => {
            if (row[1] <= og && og <= (row[1] + row[2] - 1)) {
                item = og + row[0] - row[1]
            }
        });
        if (!item) {
            item = og;
        }
        return item;
    });
}

const seeds2 = fs.readFileSync('./inputs/day_5_seeds2.txt', 'utf-8').split('\r\n');
const part_two_seeds = seeds2.map(pair => {
    const range = pair.split(' ').map(Number);
    return Array.from(new Array(range[1]), (x, i) => i + range[0]);
});

const soils = compute_next_array(part_two_seeds[0], seed_to_soil);
const fertilisers = compute_next_array(soils, soil_to_fertiliser);
const waters = compute_next_array(fertilisers, fertiliser_water);
const lights = compute_next_array(waters, water_light);
const temps = compute_next_array(lights, light_temp);
const humidities = compute_next_array(temps, temp_humidity);
const locations = compute_next_array(humidities, humidity_location);

console.log(Math.min(...locations));