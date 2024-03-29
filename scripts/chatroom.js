
const chatWrapper = document.querySelector('#chat-wrapper');
const inputChat = document.querySelector('#chat-mss');

const sendIcon = document.querySelector('#send-icon');


let loggedinUserName = localStorage.getItem('userName');

let chats = [];
let templateMine = "";
let templateOther = "";

const fetchAllChats = () => {

    return fetch('https://localhost:44310/api/Chats')

    return fetch("https://localhost:5001/api/Chats")

        .then(res => res.json())
        .then(res => {
            console.log(res)
            chats = [...res.data]
            return res;
        })
}

const fetchTemplates = () => {
    fetch('../templates/message-mine.txt')
        .then(res => res.text())
        .then(res => templateMine = res);

    return fetch('../templates/message-others.txt')
        .then(res => res.text())
        .then(res => templateOther = res);
}

const sendMessage = () => {

    var inputMessage = inputChat.value.trim();

    if (inputMessage == '') return;

    var msgObject = {
        userName: loggedinUserName,
        message: inputMessage
    }

    inputChat.value = '';

    fetch('https://localhost:44310/api/Chats', {

    fetch('https://localhost:5001/api/Chats', {

        method: 'POST',
        body: JSON.stringify(msgObject),
        headers: {
            'Content-Type': 'application/json',

        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.isSuccess) {
                console.log('Message sent')
                refreshChats();
            }
            else {
                console.log('Message not sent')
            }
        })
        .catch(error => console.error(error));



}

const renderChats = () => {

    chatWrapper.innerHTML = "";

    chats.forEach(chat => {
        let chatTemplate = "";

        if (chat.userName == loggedinUserName) {
            chatTemplate = templateMine;
        }
        else {
            chatTemplate = templateOther;
        }

        let newChat = chatTemplate.replace('$$USERNAME', chat.userName)
            .replace('$$MESSAGE', chat.message)
            .replace('$$TIME', chat.dateSent);


        chatWrapper.innerHTML += newChat;

        chatWrapper.scrollTop = chatWrapper.scrollHeight;

    })

}

const init = async () => {
    await fetchTemplates();
    await fetchAllChats();
    renderChats();

    setInterval(refreshChats, 2000);
}

const refreshChats = async () => {
    await fetchAllChats();
    renderChats();
}


init();


sendIcon.addEventListener('click', () => {
    sendMessage();
})
const obj = {
    firstName : "Jude",
    lastName : "Ade",
    email : "hhhh@gmail.com",
    passWord : "ghjkl"
}
var token = localStorage.setItem("token" , "dsfghjklcvgbnm");
var reqyt = localStorage.getItem("token");

fetch("http://swifted-001-site1.etempurl.com/api/Admin/CreateAdmin", {

fetch("https://localhost:5001/api/Users/register", {

    method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + reqyt
        

        }
}).then(res => res.json())
.then(response => console.log(response))

