import * as THREE from 'three'
export default class Camera{

    constructor(width, height, scene){
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        
        // Initial camera position (behind and above the car)
        this.camera.position.set(0, 5, -10)
        
        // Camera offset relative to car
        this.offset = new THREE.Vector3(0, 5, -10)
        
        // Look-at offset (point slightly ahead of car)
        this.lookAtOffset = new THREE.Vector3(0, 0, 5)
        
        // Lerp factor for smooth following
        this.lerpFactor = 0.1
        
        scene.add(this.camera)
    }
    
    update(carPosition, carRotation) {
        if (!carPosition || carRotation === undefined) return
        
        // Calculate desired camera position based on car rotation
        const desiredPosition = new THREE.Vector3()
        desiredPosition.copy(this.offset)
        
        // Rotate offset based on car rotation
        desiredPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotation)
        desiredPosition.add(carPosition)
        
        // Smoothly interpolate camera position
        this.camera.position.lerp(desiredPosition, this.lerpFactor)
        
        // Calculate look-at point (slightly ahead of car)
        const lookAtPoint = new THREE.Vector3()
        lookAtPoint.copy(this.lookAtOffset)
        lookAtPoint.applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotation)
        lookAtPoint.add(carPosition)
        
        // Make camera look at the point ahead of the car
        this.camera.lookAt(lookAtPoint)
    }
}
