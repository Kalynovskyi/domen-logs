const fs  = require('fs');
const readline = require('readline');

//add try/catch
const fileStream = fs.createReadStream('logs/input-logs.txt');

let outputDomains = [];
const blockedDomains = fs.readFileSync('logs/blocked-logs.txt', 'utf-8');
let i = 1;

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) =>{
    if (line !== "") {
        isOk = line.includes('status: OK') || line.includes('Certificate did not match expected hostname') || line.includes('AM Domains list') || line.includes('PM Domains list')
        if (!isOk) {
            let domain = line.slice(line.indexOf('domain:') + 7, line.indexOf('country:') - 2).trim();
            
            let isHttps = domain.indexOf("https://")
            if (isHttps != -1) {
                domain = domain.slice(8);
            }

            if (blockedDomains.indexOf(domain) == -1) {
                let provider = line.slice(line.indexOf('country:'), line.indexOf('status:'));
                outputDomains += provider + "            " + domain + "'\n'";
                i = i + 1;
            }
        }
    }
});

setTimeout(function(){
    outputDomains = outputDomains.split('\n').sort().join('\n')
    outputDomains += "'\n'" + "Total domains: " + i;

    fs.writeFile('logs/output-logs.txt', outputDomains, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
}, 3000);


rl.on('close', () => {
    console.log('Finished reading the file');
});



//make it as browser page with links; Add sorting by provider