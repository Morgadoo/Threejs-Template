import * as THREE from 'three'

export default class Car {
    constructor(scene, keyboardControls) {
        this.scene = scene
        this.keyboardControls = keyboardControls
        
        // Physics properties
        this.position = new THREE.Vector3(0, 0.5, 0)
        this.velocity = new THREE.Vector3(0, 0, 0)
        this.acceleration = 0
        this.steeringAngle = 0
        this.rotation = 0
        this.maxSpeed = 20
        this.accelerationForce = 8
        this.brakeForce = 12
        this.friction = 3
        this.steeringSpeed = 2
        this.maxSteeringAngle = Math.PI / 6
        
        // Create car group
        this.carGroup = new THREE.Group()
        this.createCarModel()
        this.carGroup.position.copy(this.position)
        this.scene.add(this.carGroup)
    }
    
    createCarModel() {
        // Car body
        const bodyGeometry = new THREE.BoxGeometry(2, 0.8, 4)
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
        this.body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        this.body.position.y = 0.4
        this.carGroup.add(this.body)
        
        // Car roof/cabin
        const cabinGeometry = new THREE.BoxGeometry(1.6, 0.6, 2)
        const cabinMaterial = new THREE.MeshPhongMaterial({ color: 0xcc0000 })
        const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
        cabin.position.set(0, 1, -0.3)
        this.carGroup.add(cabin)
        
        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16)
        const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
        
        // Wheel positions: [x, y, z]
        const wheelPositions = [
            [-1, 0, 1.2],   // Front left
            [1, 0, 1.2],    // Front right
            [-1, 0, -1.2],  // Rear left
            [1, 0, -1.2]    // Rear right
        ]
        
        this.wheels = []
        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
            wheel.rotation.z = Math.PI / 2
            wheel.position.set(pos[0], pos[1], pos[2])
            this.wheels.push(wheel)
            this.carGroup.add(wheel)
        })
    }
    
    update(deltaTime) {
        if (!this.keyboardControls) return
        
        const keys = this.keyboardControls.keys
        
        // Handle acceleration
        if (keys.forward) {
            this.acceleration = this.accelerationForce
        } else if (keys.backward) {
            this.acceleration = -this.accelerationForce * 0.5
        } else {
            this.acceleration = 0
        }
        
        // Handle braking/handbrake
        if (keys.brake) {
            const currentSpeed = this.velocity.length()
            if (currentSpeed > 0.1) {
                const brakeDirection = this.velocity.clone().normalize().multiplyScalar(-1)
                this.velocity.add(brakeDirection.multiplyScalar(this.brakeForce * deltaTime))
            } else {
                this.velocity.set(0, 0, 0)
            }
        }
        
        // Handle steering
        if (keys.left) {
            this.steeringAngle = Math.min(this.steeringAngle + this.steeringSpeed * deltaTime, this.maxSteeringAngle)
        } else if (keys.right) {
            this.steeringAngle = Math.max(this.steeringAngle - this.steeringSpeed * deltaTime, -this.maxSteeringAngle)
        } else {
            // Return steering to center
            if (Math.abs(this.steeringAngle) > 0.01) {
                this.steeringAngle *= 0.9
            } else {
                this.steeringAngle = 0
            }
        }
        
        // Apply physics
        const currentSpeed = this.velocity.length()
        
        // Apply acceleration in the direction the car is facing
        if (this.acceleration !== 0) {
            const accelerationVector = new THREE.Vector3(
                Math.sin(this.rotation) * this.acceleration * deltaTime,
                0,
                Math.cos(this.rotation) * this.acceleration * deltaTime
            )
            this.velocity.add(accelerationVector)
        }
        
        // Apply friction
        if (currentSpeed > 0.1) {
            const frictionForce = this.velocity.clone().normalize().multiplyScalar(-this.friction * deltaTime)
            this.velocity.add(frictionForce)
        } else if (this.acceleration === 0) {
            this.velocity.set(0, 0, 0)
        }
        
        // Limit max speed
        if (this.velocity.length() > this.maxSpeed) {
            this.velocity.normalize().multiplyScalar(this.maxSpeed)
        }
        
        // Apply steering (only when moving)
        if (currentSpeed > 0.5) {
            this.rotation -= this.steeringAngle * (currentSpeed / this.maxSpeed) * deltaTime * 2
        }
        
        // Update position
        this.position.add(this.velocity.clone().multiplyScalar(deltaTime))
        
        // Update car group transform
        this.carGroup.position.copy(this.position)
        this.carGroup.rotation.y = this.rotation
        
        // Rotate wheels based on speed
        const wheelRotationSpeed = currentSpeed * deltaTime * 2
        this.wheels.forEach((wheel, index) => {
            wheel.rotation.x += wheelRotationSpeed
            // Rotate front wheels for steering
            if (index < 2) {
                wheel.rotation.y = this.steeringAngle
            }
        })
    }
    
    accelerate() {
        this.acceleration = this.accelerationForce
    }
    
    brake() {
        const currentSpeed = this.velocity.length()
        if (currentSpeed > 0.1) {
            const brakeDirection = this.velocity.clone().normalize().multiplyScalar(-1)
            this.velocity.add(brakeDirection.multiplyScalar(this.brakeForce * 0.016))
        } else {
            this.velocity.set(0, 0, 0)
        }
    }
    
    steer(direction) {
        if (direction === 'left') {
            this.steeringAngle = Math.min(this.steeringAngle + 0.05, this.maxSteeringAngle)
        } else if (direction === 'right') {
            this.steeringAngle = Math.max(this.steeringAngle - 0.05, -this.maxSteeringAngle)
        }
    }
    
    reset() {
        this.position.set(0, 0.5, 0)
        this.velocity.set(0, 0, 0)
        this.acceleration = 0
        this.steeringAngle = 0
        this.rotation = 0
        this.carGroup.position.copy(this.position)
        this.carGroup.rotation.y = this.rotation
    }
    
    getSpeed() {
        return this.velocity.length()
    }
    
    getPosition() {
        return this.position.clone()
    }
    
    getRotation() {
        return this.rotation
    }
}
