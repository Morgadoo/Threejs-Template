import * as THREE from 'three'
import Animate from './Animate'
import Camera from './Camera'
import Controls from './Controls'
import Geometry from './Geometry'
import Light from './Light'
import Renderer from './Renderer'
import Helpers from './Utils/Helpers'
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
        sizes.updateSize(camera.camera, renderer.renderer , renderer.labelRenderer)
    })

    //Camera
    const camera = new Camera(sizes.width, sizes.height, scene)

    //Geometry
    const geometry = new Geometry(scene)
    const car = geometry.car

    //Helpers
    const helpers = new Helpers(scene)
    
    //Light
    const light = new Light(scene)
    
    //Renderer
    const renderer = new Renderer(canvas, sizes.width, sizes.height)
    
    // Controls
    const controls = new Controls(camera, canvas , renderer.labelRenderer)

    //Animate
    const animate = new Animate(scene, camera, renderer.renderer, renderer.labelRenderer, controls, car)

    //Stats
    const stats = new Stats()

    }
}
