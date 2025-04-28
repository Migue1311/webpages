const ExcelJS = require('exceljs');

class TxtTool {
  constructor() {}

  /**
   * Función para leer el contenido de un archivo TXT
   * @param {Buffer} fileData - Datos del archivo como Buffer
   * @returns {string} - Contenido del archivo como string
   */
  readFile(fileData) {
    return fileData.toString('utf-8'); // Convertir Buffer a string
  }

  /**
   * Función para combinar el contenido de varios archivos TXT
   * @param {Array<string>} contents - Lista de contenidos de archivos TXT
   * @returns {string} - Contenido combinado
   */
  combineFiles(contents) {
    if (contents.length === 0) {
      throw new Error('No hay contenido para combinar');
    }

    // Tomar la primera línea del primer archivo como encabezado
    const [header, ...firstFileLines] = contents[0].split('\n');

    // Ignorar la primera línea de los demás archivos
    const otherFilesLines = contents.slice(1).map((content) => {
      const lines = content.split('\n');
      return lines.slice(1); // Ignorar la primera línea
    });

    // Combinar todas las líneas
    const combinedLines = [header, ...firstFileLines, ...otherFilesLines.flat()];

    // Asegurarse de que cada línea esté separada por tabulaciones
    const formattedLines = combinedLines.map((line) => line.split('\t').join('\t'));

    return formattedLines.join('\n'); // Unir con saltos de línea
  }

  /**
   * Función para generar un archivo Excel a partir del contenido combinado
   * @param {string} combinedContent - Contenido combinado de los archivos TXT
   * @returns {Buffer} - Archivo Excel como buffer
   */
  async generateExcel(combinedContent) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    // Dividir el contenido combinado en filas
    const rows = combinedContent.split('\n').map((row) => row.split('\t'));

    // Agregar las filas al archivo Excel
    rows.forEach((row) => worksheet.addRow(row));

    // Generar el archivo Excel como buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}

module.exports = TxtTool;
