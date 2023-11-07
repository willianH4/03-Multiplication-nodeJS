import fs from 'fs';
import { yarg } from './config/plugins/args.plugin'

const { b:base, l:limit, s:showTable } = yarg;

let outputMessage = '';
const num = base;
const headerMessage = `
=============================================
                Tabla del ${num}
=============================================\n
`;


for (let index = 1; index <= limit; index++) {
    outputMessage += `${num} X ${index} = ${num * index}\n`;
};

outputMessage = headerMessage + outputMessage;

if (showTable) {
    console.log(outputMessage);
}

const outputPath = `outputs`
fs.mkdirSync(outputPath, {recursive: true});
fs.writeFileSync(`${outputPath}/tabla-${num}.txt`, outputMessage);