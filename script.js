let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice_box = document.querySelector("#voice-box");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";

    let voices = window.speechSynthesis.getVoices();
    
    // Select a male voice for both PC and Mobile
    let maleVoice = voices.find(voice =>
        voice.name.includes("Google UK English Male") || 
        voice.name.includes("Microsoft David") || 
        voice.name.includes("Google US English") || 
        voice.name.includes("Samsung US English Male") || // For Samsung devices
        voice.name.includes("Android Male") // For some Android TTS engines
    );

    text_speak.voice = maleVoice || voices[0];

    window.speechSynthesis.speak(text_speak);
}

// Ensure voices are loaded properly on mobile
window.speechSynthesis.onvoiceschanged = () => {
    speak(wish_me());
};

function wish_me() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning Sachit, How are you!");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sachit, What can I do for you?");
    } else {
        speak("Good evening Sachit");
    }
}

window.addEventListener('load', () => {
    setTimeout(() => { wish_me(); }, 500);
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice_box.style.display = "flex";
});

var list = [
    "Speak again",
    "I am not understanding",
    "I didn't understand that. Can you say it again?",
];

function takeCommand(message) {
    btn.style.display = "flex";
    voice_box.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sachit Kohli, How can I assist you today?");
    } else if (message.includes("who are you") || message.includes("hu r u")) {
        speak("I am an AI assistant created by Sachit Kohli on 11 March 2025.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube for you.");
        window.open("https://www.youtube.com/");
    } else if (message.includes("open my channel")) {
        speak("Opening your channel.");
        window.open("https://youtube.com/@blankers861?si=4MMmc4cHbe26mbEZ");
    } else if (message.includes("open github")) {
        speak("Opening GitHub for you.");
        window.open("https://github.com/sachit-create");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator.");
        window.open("https://www.desmos.com/scientific"); // Universal solution
    } else if (message.includes("open vscode")) {
        speak("Happy coding, Sachit.");
        window.open("vscode://file/D:/home_work");
    } else if (message.includes("close yourself")) {
        window.close();
    } else if (message.includes("open chat gpt")) {
        speak("Big AI is opening.");
        window.open("https://www.chatgpt.com/");
    } else if (message.includes("open files")) {
        speak("Files opened.");
        window.open("File Explorer://");
    } else {
        let randomResponse = list[Math.floor(Math.random() * list.length)];
        speak(randomResponse);
    }
}