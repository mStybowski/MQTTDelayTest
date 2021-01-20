const mqtt = require('mqtt')
const client  = mqtt.connect('ws://localhost:8083/mqtt')

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

client.on('connect', function () {
    client.subscribe(["fromBrowser", "results"], function (err) {
        if(!err)
            console.log("Server has connected to the broker!")
    })
})

function generateCSV(message){
    console.log("YEA!!")
    let myArrayOfStrings = message.split(',');
    console.log(myArrayOfStrings);

    let arrayOfValues = myArrayOfStrings.map(function(x) {
        return {value:parseInt(x)}
    });

    console.log(arrayOfValues);

    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
            {id: 'value', title: 'Value'}
        ]
    });


    csvWriter
        .writeRecords(arrayOfValues)
        .then(()=> console.log('The CSV file was written successfully'));
}

client.on('message', function (topic, message) {

    if(topic !== "fromBrowser"){
        generateCSV(message.toString())
    }
    if(topic === "fromBrowser"){
        client.publish("fromServer", message.toString());
        console.log('Otrzymano wiadomosc: ' +  message.toString())
    }

})

