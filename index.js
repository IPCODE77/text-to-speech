let textarea = document.getElementById('Enter_Text'),
    submit_btn = document.getElementById('submit'),
    voicelist = document.querySelector('select');

let speech = speechSynthesis,
    isspeaking = true;
function voice1() {
    for (let voice of speech.getVoices()) {
        let selected = voice.name === 'Google US English' ? 'selected' : '';
        let options = ` <option value="${voice.name}" ${selected}>${voice.name} ${voice.lang}</option>`

        voicelist.insertAdjacentHTML('beforeend', options)

    }
}

speech.addEventListener('voiceschanged', voice1)

submit_btn.addEventListener('click', (e) => {
    // console.log(textarea.value.length);

    e.preventDefault()
    if (textarea.value !== "") {
        if (!speech.speaking) {
            texttospeech(textarea.value)
        }
        if (textarea.value.length > 80) {
            setInterval(()=>{
                if(!speech.speaking && !isspeaking){
                    isspeaking = true;
                    submit_btn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if (isspeaking) {
                speech.resume()
                isspeaking = false;
                submit_btn.innerText = 'Pause Speech'
            }
            else {
                speech.pause()
                isspeaking = true;
                submit_btn.innerText = 'Resume Speech'
            }
        }
    }
})

function texttospeech(text) {
    let utterence = new SpeechSynthesisUtterance(text)
    for (let voice of speech.getVoices()) {
        if (voice.name == voicelist.value) {
            utterence.voice = voice
        }
    }

    speech.speak(utterence)
}


let x='Noto is a global font collection for writing in all modern and ancient languages. Noto Serif is a modulated (“serif”) design for texts in the Latin, Cyrillic and Greek scripts, also suitable as the complementary font for other script-specific'
console.log(x.length);
