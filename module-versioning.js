const fs = require('fs');
const ExcelJS = require('exceljs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const dependencies = Object.keys(packageJson.dependencies);

const workbook = new ExcelJS.Workbook();

const worksheet = workbook.addWorksheet(`${packageJson.name}`);

worksheet.addRow(['Name', 'Version']);

dependencies.forEach((module) => {
    worksheet.addRow([module, packageJson.dependencies[module]]);
});
 

const filePath = `./${packageJson.name}_v${packageJson.version}.xlsx`;

workbook.xlsx.writeFile(filePath)
    .then(() => {
        console.log(`Module list saved to ${filePath}`);
    })
    .catch((error) => {
        console.error('Error saving module list:', error);
    });
