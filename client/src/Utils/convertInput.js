export default function convertInput (input) {
    input.cuisines = input.cuisines.split('-');
    input.servings = parseInt(input.servings);
    input.healthScore = parseInt(input.healthScore);
    input.readyInMinutes = parseInt(input.readyInMinutes);

    return input;
}