import * as THREE from 'three'
import Car from './Car.js'
import Environment from './Environment.js'

export default class Geometry{
    
    constructor(scene){
        
        // Create environment
        this.environment = new Environment(scene)
        
        // Create car
        this.car = new Car(scene)
        
    }
}
