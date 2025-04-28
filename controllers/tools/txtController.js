
const fs = require('fs');
const path = require('path');
const TxtTool = require('../../models/tools/TxtTool'); 

exports.processTxtFiles = async (req, res) => {
  try {
    console.log('Iniciando procesamiento de archivos TXT...');
    // Verificar si se han subido archivos
    if (!req.files || !req.files.txtFiles) {
      return res.status(400).json({ error: 'No se han subido archivos TXT' });
    }
    // Obtener los archivos subidos
    console.log('Archivos recibidos:', req.files.txtFiles);
    const txtFiles = Array.isArray(req.files.txtFiles)
      ? req.files.txtFiles
      : [req.files.txtFiles]; // Asegurarse de que sea un array

    console.log(`Se subieron ${txtFiles.length} archivo(s)`);

    // Crear una instancia de TxtTool
    const txtTool = new TxtTool();

    // Leer el contenido de cada archivo
    const contents = txtFiles.map((file) => txtTool.readFile(file.data));

    // Combinar los contenidos
    const combinedContent = txtTool.combineFiles(contents);

    console.log('Contenido combinado:', combinedContent);

    // Generar el archivo Excel
    const excelFile = await txtTool.generateExcel(combinedContent);

    console.log('Archivo Excel generado');

    // Enviar el archivo Excel como respuesta
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    console.log('Enviando archivo Excel...');
    res.setHeader('Content-Disposition', 'attachment; filename=combined.xlsx');
    console.log('Archivo Excel enviado');
    res.send(excelFile);
    console.log('Respuesta enviada');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//¡PERDONEMEN TODOS NO ACECTO!