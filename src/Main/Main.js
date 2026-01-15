import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Animate from './Animate'
import Camera from './Camera'
import Controls from './Controls'
import Light from './Light'
import Renderer from './Renderer'
import Helpers from './Utils/Helpers'
import Sizes from "./Utils/Sizes"
import Stats from './Utils/Stats'
import Car from './Car'
import Environment from './Environment'
import InputController from './InputController'
import CameraController from './CameraController'
import GameUI from './GameUI'


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
        sizes.updateSize(camera, renderer.renderer , renderer.labelRenderer)
    })

    //Camera
    const camera = new Camera(sizes.width, sizes.height, scene)

    //Helpers
    const helpers = new Helpers(scene)
    
    //Light
    const light = new Light(scene)

    //Environment
    const environment = new Environment(scene)

    //Car
    const car = new Car(scene)

    //Renderer
    const renderer = new Renderer(canvas, sizes.width, sizes.height)
    
    // Controls
    const controls = new Controls(camera, canvas , renderer.labelRenderer)

    //Input Controller
    const inputController = new InputController()

    //Camera Controller
    const cameraController = new CameraController(camera, car, controls)
    
    //Game UI
    const gameUI = new GameUI(car)

    //Animate
    const animate = new Animate(scene, camera, renderer.renderer, renderer.labelRenderer, controls, car, inputController, cameraController, gameUI)

    //Stats
    const stats = new Stats()

    }
}

