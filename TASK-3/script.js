let currentArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function shuffleDemo() {
    const shuffled = shuffleArray(currentArray);
    document.getElementById('result').innerHTML = `Результат: [${shuffled.join(', ')}]`;
}

// Отображаем начальный массив
document.getElementById('arrayDisplay').innerHTML = `[${currentArray.join(', ')}]`;