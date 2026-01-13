import * as THREE from 'three'
export default class Camera{

    constructor(width, height, scene){
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
        this.camera.position.set(3, 3, 3)
        scene.add(this.camera)
    }
}
