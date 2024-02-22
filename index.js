const { readFile } = require('fs/promises');

async function readThisFile(logFile) {
    try {


        const data = await readFile(logFile);
        console.log(data.toString());

        return data;
    } catch (error) {
        console.error(`Got an error trying to read the file: {error.message}` + error);
    }
}

readThisFile('logs/input-logs.txt');