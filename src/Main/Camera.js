import * as THREE from 'three'

export default class Camera{

    constructor(width, height, scene, car = null){
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
        this.camera.position.set(3, 3, 3)
        scene.add(this.camera)
        
        // Store car reference for follow camera
        this.car = car
        
        // Camera offset from car (behind and above)
        this.offset = new THREE.Vector3(0, 5, -10)
        
        // Smooth follow parameters
        this.lerpFactor = 5
        
        // Target position for smooth following
        this.targetPosition = new THREE.Vector3()
        
        return this.camera
    }
    
    followCar(car, deltaTime) {
        if (!car) return
        
        // Update car reference if provided
        this.car = car
        
        // Calculate target position based on car's position and rotation
        const carRotation = car.getRotation()
        const carPosition = car.getPosition()
        
        // Rotate offset based on car's rotation
        this.targetPosition.copy(this.offset)
        this.targetPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotation)
        this.targetPosition.add(carPosition)
        
        // Smoothly interpolate camera position
        this.camera.position.lerp(this.targetPosition, this.lerpFactor * deltaTime)
        
        // Make camera look at the car
        this.camera.lookAt(carPosition)
    }
}
