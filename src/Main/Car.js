import * as THREE from 'three'

export default class Car {
    constructor(scene) {
        this.scene = scene
        
        // Physics properties
        this.velocity = new THREE.Vector3(0, 0, 0)
        this.acceleration = 0
        this.maxSpeed = 50
        this.accelerationForce = 20
        this.brakeForce = 30
        this.friction = 5
        this.steeringAngle = 0
        this.maxSteeringAngle = Math.PI / 6
        this.steeringSensitivity = 2
        
        // Car group to hold all parts
        this.carGroup = new THREE.Group()
        
        // Create car body
        this.createCarBody()
        
        // Create wheels
        this.createWheels()
        
        // Set initial position
        this.carGroup.position.set(0, 0.5, 0)
        this.scene.add(this.carGroup)
        
        // Store initial position for reset
        this.initialPosition = this.carGroup.position.clone()
        this.initialRotation = this.carGroup.rotation.clone()
    }
    
    createCarBody() {
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(2, 0.8, 4)
        const bodyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3498db,
            metalness: 0.6,
            roughness: 0.4
        })
        this.body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        this.body.position.y = 0.4
        this.carGroup.add(this.body)
        
        // Cabin/roof
        const cabinGeometry = new THREE.BoxGeometry(1.6, 0.6, 2)
        const cabinMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2980b9,
            metalness: 0.5,
            roughness: 0.5
        })
        this.cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
        this.cabin.position.set(0, 1.1, -0.3)
        this.carGroup.add(this.cabin)
        
        // Windshield (front window)
        const windshieldGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.1)
        const windshieldMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x87ceeb,
            transparent: true,
            opacity: 0.6,
            metalness: 0.9,
            roughness: 0.1
        })
        this.windshield = new THREE.Mesh(windshieldGeometry, windshieldMaterial)
        this.windshield.position.set(0, 1.1, 0.7)
        this.carGroup.add(this.windshield)
    }
    
    createWheels() {
        const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16)
        const wheelMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a1a,
            metalness: 0.3,
            roughness: 0.8
        })
        
        // Wheel positions: [x, y, z]
        const wheelPositions = [
            [-1.1, 0, 1.3],   // Front left
            [1.1, 0, 1.3],    // Front right
            [-1.1, 0, -1.3],  // Rear left
            [1.1, 0, -1.3]    // Rear right
        ]
        
        this.wheels = []
        
        wheelPositions.forEach((pos, index) => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
            wheel.rotation.z = Math.PI / 2
            wheel.position.set(pos[0], pos[1], pos[2])
            this.wheels.push(wheel)
            this.carGroup.add(wheel)
        })
    }
    
    accelerate() {
        this.acceleration = this.accelerationForce
    }
    
    brake() {
        this.acceleration = -this.brakeForce
    }
    
    steer(direction) {
        // direction: -1 for left, 1 for right, 0 for center
        this.steeringAngle = direction * this.maxSteeringAngle
    }
    
    update(deltaTime) {
        if (deltaTime > 0.1) deltaTime = 0.1 // Cap deltaTime to prevent large jumps
        
        // Apply acceleration
        const speed = this.velocity.length()
        
        // Update velocity based on acceleration
        if (this.acceleration !== 0) {
            const accelerationVector = new THREE.Vector3(0, 0, this.acceleration * deltaTime)
            accelerationVector.applyQuaternion(this.carGroup.quaternion)
            this.velocity.add(accelerationVector)
        }
        
        // Apply friction
        if (this.acceleration === 0 && speed > 0) {
            const frictionVector = this.velocity.clone().normalize().multiplyScalar(-this.friction * deltaTime)
            this.velocity.add(frictionVector)
            
            // Stop completely if speed is very low
            if (this.velocity.length() < 0.1) {
                this.velocity.set(0, 0, 0)
            }
        }
        
        // Clamp to max speed
        if (speed > this.maxSpeed) {
            this.velocity.normalize().multiplyScalar(this.maxSpeed)
        }
        
        // Apply steering (only when moving)
        if (speed > 0.5 && this.steeringAngle !== 0) {
            const rotationSpeed = this.steeringAngle * (speed / this.maxSpeed) * deltaTime
            this.carGroup.rotation.y += rotationSpeed
        }
        
        // Update position
        this.carGroup.position.add(this.velocity.clone().multiplyScalar(deltaTime))
        
        // Rotate front wheels for visual effect
        if (this.wheels.length >= 2) {
            this.wheels[0].rotation.x = this.steeringAngle * 0.5
            this.wheels[1].rotation.x = this.steeringAngle * 0.5
        }
        
        // Rotate all wheels based on movement
        const wheelRotation = speed * deltaTime * 2
        this.wheels.forEach(wheel => {
            wheel.rotation.y += wheelRotation
        })
        
        // Reset acceleration for next frame
        this.acceleration = 0
    }
    
    reset() {
        this.carGroup.position.copy(this.initialPosition)
        this.carGroup.rotation.copy(this.initialRotation)
        this.velocity.set(0, 0, 0)
        this.acceleration = 0
        this.steeringAngle = 0
    }
    
    getPosition() {
        return this.carGroup.position
    }
    
    getRotation() {
        return this.carGroup.rotation
    }
    
    getSpeed() {
        return this.velocity.length()
    }
    
    getSpeedKmh() {
        // Convert to km/h (arbitrary scale for game feel)
        return Math.round(this.velocity.length() * 3.6)
    }
}
