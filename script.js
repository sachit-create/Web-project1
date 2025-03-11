
let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice_box = document.querySelector("#voice-box")


function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;   // Speed of speech
    text_speak.pitch = 1;  // Pitch of voice
    text_speak.volume = 1; // Volume level
    text_speak.lang = "en-US"; // Setting language to English (US)

    // Select a specific voice (optional)
    let voices = window.speechSynthesis.getVoices();
    text_speak.voice = voices.find(voice => voice.name.includes("Google") || voice.name.includes("Microsoft")) || voices[0];

    window.speechSynthesis.speak(text_speak);
}

function wish_me(){
    let day=new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12){
        speak("Good morning Sachit , How are you!")
    }else if(hours>=12 && hours<16){
        speak("Good afternoon Sachit, What i can do for you")
    }else{
        speak("Good evening Sachit")
    }
}

window.addEventListener('load',()=>{
    wish_me()
})


let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition =new SpeechRecognition() 

recognition.onresult = (event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText=transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
        recognition.start()
        btn.style.display="none"
        voice_box.style.display="flex"
})

var list = [
    "speak again",
    "i am not understanding",
    "I didn't understand that. Can you say it again?",
]

function takeCommand(message){
    btn.style.display="flex"
    voice_box.style.display="none"
    if (message.includes("hello") || message.includes("hey")){
        speak("Hello Sachit Kohli  , How i can assist you today.")
    }
    else if(message.includes("who are you") || message.includes("hu r u")){
        speak("i am a ai assistant created by sachit kohli on 11 march 2025")
    }
    else if(message.includes("open youtube") || message.includes("open YouTube")){
        speak("opening youtube for you.")
        window.open("https://www.youtube.com/")
    }
    else if(message.includes("open my channel")){
        speak("opening your channel")
        window.open("https://youtube.com/@blankers861?si=4MMmc4cHbe26mbEZ")
    }
    else if(message.includes("open github") || message.includes("open getup")){
        speak("opening github for you")
        window.open("https://github.com/sachit-create")
    }else if(message.includes("open calculator")){
        speak("Calculator opened.")
        window.open("calculator://")
    }
    else if(message.includes("open vscode") || message.includes("open vs code")){
        speak("Happy coding Sachit")
        window.open("vscode://file/D:/home_work")
    }
    else if(message.includes("close yourself")){
        window.close("https://www.youtube.com/")
    }
    else if(message.includes("open chat gpt") || message.includes("open chatgpd") ||  message.includes("open chatgpd")){
        speak("big ai is opening")
        window.open("https://www.chatgpt.com/")
    }
    else if(message.includes("open files") || message.includes("open files")){
        speak("files opened")
        window.open("File Explorer://")
    }
    else {
        let i = Math.random()
        if(i<=0.33333){
            i=0
        }else if(i > 0.333333 && i<=0.66666){
            i=1
        }else{
            i=2
        }
        speak(list[i])
    }
}

