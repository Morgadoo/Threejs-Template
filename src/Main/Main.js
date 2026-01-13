import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Animate from './Animate'
import Camera from './Camera'
import Controls from './Controls'
import Geometry from './Geometry'
import Light from './Light'
import Renderer from './Renderer'
import Helpers from './Utils/Helpers'
import Label from './Utils/Label'
import Sizes from "./Utils/Sizes"
import Stats from './Utils/Stats'


export default class Main{
    constructor(){
        console.log("Start Main")

    /**
     * Main
     */

    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()

    //Sizes
    const sizes = new Sizes()
    window.addEventListener('resize', () =>{
        sizes.updateSize(cameraInstance.camera, renderer.renderer , renderer.labelRenderer)
    })

    //Camera
    const cameraInstance = new Camera(sizes.width, sizes.height, scene)

    //Geometry
    const geometry = new Geometry(scene)
    
    //Label
    const label = new Label(geometry.cube)

    //Helpers
    const helpers = new Helpers(scene)
    
    //Light
    const light = new Light(scene)
    
    //Renderer
    const renderer = new Renderer(canvas, sizes.width, sizes.height)
    
    // Controls
    const controlsInstance = new Controls(cameraInstance.camera, canvas , renderer.labelRenderer)

    //Stats
    const stats = new Stats()

    //Animate
    const animate = new Animate(scene, cameraInstance.camera, renderer.renderer, renderer.labelRenderer, controlsInstance.controls, stats)

    }
}
