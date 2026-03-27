
const russianAlphabet = "а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я";
const englishAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";

function isPangram(word, lang='ru'){
    let alphabet = lang === 'ru' ? russianAlphabet : englishAlphabet;
    let missingLetters = [];
    let ok = true;
    alphabet.split(',').forEach(l => {
        ok &= RegExp(l).test(word);
        if(!RegExp(l).test(word)){
            missingLetters.push(l);
        }
    });
    return [ok, missingLetters];
}

let testPhrases = [
    {
        lang: 'ru',
        phrase: 'Съешь же ещё этих мягких французских булок, да выпей чаю'
    },
    {
        lang: 'en',
        phrase: 'The quick brown fox jumps over the lazy dog'
    },
    {
        lang: 'ru',
        phrase: 'фраза или предложение, в котором используются все буквы алфавита'
    },
]

function makeAltert(messageHtml,type='success'){
    let d = document.createElement('div');
    d.className = 'alert ' + type;
    d.innerHTML = messageHtml;
    return d;
}

function initializeExamples(){
    let container = document.querySelector('.examples');
    let ul = document.createElement('ul');
    ul.innerHTML += testPhrases.map(p => {
        const [ok, shortages] = isPangram(p.phrase, p.lang);
        let li = `<li>${p.phrase} [${p.lang}]: ${ok ? 'Да' : 'нет'}`
        if(!ok){
            li += '<br/>недостающие символы: ' + shortages.join(',');
        }
        li += '</li>';
        return li;
    }).join('');
    container.appendChild(ul);
}

function clearAlerts(){
    document.querySelectorAll('.alert').forEach(al => al.remove());
}

document.addEventListener('DOMContentLoaded', ()=>{
    initializeExamples();
    let submitBtn = document.querySelector('#submitButton');
    let form = document.querySelector('form');
    
    form.addEventListener('submit', function(e){
        e.preventDefault();
        clearAlerts();
        
        let formData = new FormData(form);
        let lang = formData.get('language');
        let phrase = formData.get('word');
        if(phrase.length === 0){
            form.appendChild(makeAltert('<P>поле пустой</p>', 'error'));
            setTimeout(()=>{clearAlerts();}, 2000);
            return;
        }
        submitBtn.disabled = true;
        document.querySelector('.loader').style.setProperty('display', 'block');
        
        let result = isPangram(phrase, lang);
        let responseMessage = `<p>${result[0] ? '<i class="fa-solid fa-circle-check"></i><span>Является панграммой</span>' : '<i class="fa-solid fa-x"></i><span>Не Является панграммой</span>'}</p>`;
        let type = 'success';
        if(!result[0]){
            type = 'error';
            responseMessage += '<p>недостающие символы:<br/>';
            result[1].forEach(missing => {
                responseMessage += missing + ',';
            });
            responseMessage += '</p>';
        }
        setTimeout(()=>{
            document.querySelector('.loader').style.removeProperty('display');
            form.appendChild(makeAltert(responseMessage, type));
            submitBtn.disabled = false;
        }, 3000);
    });
})
