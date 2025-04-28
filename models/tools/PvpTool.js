class PvpTool{
    constructor (cost, margin){
        this.cost = cost;
        this.margin = margin;
    }

    pvpCalc(){
        return this.cost /(1- this.margin);
    }
    
    static margCalc(cost,pvp){
        return (-cost/pvp)+1;
    }
}

module.exports = PvpTool;