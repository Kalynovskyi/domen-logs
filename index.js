const fs  = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('logs/input-logs.txt');

let blockedDomains = [];
let i = 1;

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) =>{
    
    if (line !== "") {
        isOk = line.includes('status: OK') || line.includes('Certificate did not match expected hostname')

        if (!isOk) {
            
            let domain = line.slice(line.indexOf('domain:') + 7, line.indexOf('country:') - 2).trim();

            let provider = line.slice(line.indexOf('country:'), line.indexOf('status:'));

            console.log(i + " " + domain + "          " + provider);

            i = i + 1;
            //blockedDomains = '\n' + line;
        }
    }
});

rl.on('close', () => {
    console.log('Finished reading the file');
});



// async function readThisFile(logFile) {
//     try {


//         const data = await readFile(logFile);
//         console.log(data.toString());

//         return data;
//     } catch (error) {
//         console.error(`Got an error trying to read the file: {error.message}` + error);
//     }
// }

// readThisFile('logs/input-logs.txt');