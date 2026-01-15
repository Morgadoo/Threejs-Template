import * as THREE from 'three'

export default class CameraController {
    constructor(camera, car, controls) {
        this.camera = camera
        this.car = car
        this.controls = controls
        
        // Camera offset relative to car (behind and above)
        this.offset = new THREE.Vector3(0, 3, -8)
        
        // Smoothing factor for camera movement (0-1, higher = smoother but more lag)
        this.smoothFactor = 0.1
        
        // Camera mode: 'follow' or 'free'
        this.mode = 'follow'
        
        // Target position and lookAt point
        this.targetPosition = new THREE.Vector3()
        this.targetLookAt = new THREE.Vector3()
        this.currentLookAt = new THREE.Vector3()
    }
    
    update() {
        if (this.mode === 'follow') {
            this.updateFollowCamera()
        }
    }
    
    updateFollowCamera() {
        const carPosition = this.car.getPosition()
        const carRotation = this.car.getRotation()
        
        // Calculate the target camera position based on car position and rotation
        // Apply the offset in the car's local space
        const rotatedOffset = this.offset.clone()
        rotatedOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotation.y)
        
        this.targetPosition.copy(carPosition).add(rotatedOffset)
        
        // Smoothly interpolate camera position
        this.camera.position.lerp(this.targetPosition, this.smoothFactor)
        
        // Calculate lookAt target (slightly ahead of the car)
        const lookAtOffset = new THREE.Vector3(0, 1, 5)
        lookAtOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotation.y)
        this.targetLookAt.copy(carPosition).add(lookAtOffset)
        
        // Smoothly interpolate lookAt position
        this.currentLookAt.lerp(this.targetLookAt, this.smoothFactor)
        this.camera.lookAt(this.currentLookAt)
        
        // Disable OrbitControls when in follow mode
        if (this.controls && this.controls.enabled) {
            this.controls.enabled = false
        }
    }
    
    setMode(mode) {
        if (mode === 'follow' || mode === 'free') {
            this.mode = mode
            
            if (mode === 'free') {
                // Enable OrbitControls for free camera
                if (this.controls) {
                    this.controls.enabled = true
                }
            } else {
                // Disable OrbitControls for follow camera
                if (this.controls) {
                    this.controls.enabled = false
                }
            }
        }
    }
    
    getMode() {
        return this.mode
    }
    
    toggleMode() {
        if (this.mode === 'follow') {
            this.setMode('free')
        } else {
            this.setMode('follow')
        }
    }
    
    setSmoothFactor(factor) {
        this.smoothFactor = Math.max(0, Math.min(1, factor))
    }
    
    setOffset(x, y, z) {
        this.offset.set(x, y, z)
    }
}
