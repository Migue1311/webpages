const PvpTool = require('../../models/tools/PvpTool');

exports.calculatePvp = (req, res) => {
  try {
    let { cost, margin } = req.body;  // Extraer datos del request

    if (typeof cost !== 'number' || typeof margin !== 'number') {
      return res.status(400).json({ error: 'El Costo y margen deben ser números' });
    }

    if(margin >= 1){
        margin = margin/100;
    }
    const pvpTool = new PvpTool(cost, margin); // Crear una instancia de PvpTool
    let pvp = pvpTool.pvpCalc(); // Llamar al método de cálculo

    pvp = parseFloat(pvp.toFixed(2));
    res.json({ pvp }); // Enviar respuesta con el resultado
  } catch (error) {
    console.error('Error en calculatePvp:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.calculateMargin = (req,res)=>{
    const {cost, pvp} = req.body;
    if(typeof cost != 'number' || typeof pvp !='number'){
            return res.status(400).json({error: 'El costo y el precio deben ser números'});
    }

    if(!cost || !pvp){
            return res.status(400).json({error: 'Costo y pvp son obligatorios'});
    }
    try{
        let margin = PvpTool.margCalc(cost,pvp);
        margin = parseFloat(margin.toFixed(2))*100 + "%";
        res.json({margin});
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
};
