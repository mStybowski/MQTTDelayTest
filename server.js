const mqtt = require('mqtt')
const client  = mqtt.connect('ws://localhost:8083/mqtt')

client.on('connect', function () {
    client.subscribe('fromBrowser', function (err) {
        if(!err)
            console.log("Server has connected to the broker!")
    })
})

client.on('message', function (topic, message) {

    if(topic === "fromBrowser"){
        client.publish("fromServer", message.toString());
        console.log('Otrzymano wiadomosc: ' +  message.toString())
    }
})

