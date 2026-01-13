import Stat from 'stats.js'

export default class Stats{

    constructor(){
        this.stats = new Stat()
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)
    }

    begin(){
        this.stats.begin()
    }

    end(){
        this.stats.end()
    }
}
