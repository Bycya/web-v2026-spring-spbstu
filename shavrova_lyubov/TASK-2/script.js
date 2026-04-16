function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    
    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

function countVowelsDemo() {
    const input = document.getElementById('textInput').value;
    if (!input) {
        document.getElementById('result').innerHTML = 'Введите текст';
        return;
    }
    
    const count = countVowels(input);
    document.getElementById('result').innerHTML = `Гласных букв: ${count}`;
}