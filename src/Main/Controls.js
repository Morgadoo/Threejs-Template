import KeyboardControls from './KeyboardControls.js'

export default class Controls{
    
    constructor(camera,canvas,labelRenderer){
        
        this.controls = new KeyboardControls()
        return this.controls
    }
}