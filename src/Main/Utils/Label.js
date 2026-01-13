import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export default class Label{
    
    constructor(cube){

        // Red Cube
        
        const cubeDiv = document.createElement( 'div' );
        cubeDiv.className = 'label';
        cubeDiv.textContent = 'Red Cube';
        cubeDiv.style.marginTop = '-1em';
        const cubeLabel = new CSS2DObject( cubeDiv );
        cubeLabel.position.set( 0, 1, 0 );
        
        cube.add( cubeLabel );
        
    }
}
