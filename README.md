# BurgerCity_ChatBotAndAdmin.js

This is the first version of a personal ChatBot and CLI accounting administration that I used for a delivery shop 
bussiness during the 2021. It use Express and Socket.IO for the stream connection, Commander and Inquirer for the CLI accounting administration, Mongoose and MongoDB Atlas for the cloud storage, Pupperter, QR generator and the most importar library for this code: 'whatsapp-web.js' for the connection to the phone and be able to interact with the clients.

### (whatsapp-web.js)[https://github.com/pedroslopez/whatsapp-web.js/] is property of (Pedro Lopez)[https://github.com/pedroslopez]. You can watch his entery repository and for sure you will find something of your interest!

### Example Usage
(of course there are some private parts of the code wich are private and you will have to complete by yourself with your own data for the correct work of this App)

> node appCLI.js -h

this command will introduce you to the CLI methods: create a new Sales record, get delete or update (all or specific one), get the balace of the sales over the last week, month, period or all or just call the chatBot to start listening new whatsapp messages

> npm run web

this command will set an instance of the interface with your personal data extracted from the cloud storage and you will be able to recibe and response messages from the clients directly from the web page.
