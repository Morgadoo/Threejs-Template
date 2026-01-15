import * as THREE from 'three'

export default class Car {
    constructor(scene) {
        this.scene = scene
        
        // Physics properties
        this.velocity = new THREE.Vector3(0, 0, 0)
        this.acceleration = 0
        this.steeringAngle = 0
        
        // Physics constants
        this.maxSpeed = 20
        this.accelerationForce = 15
        this.brakeForce = 25
        this.friction = 5
        this.turnSpeed = 2.5
        this.maxSteeringAngle = 0.5
        
        // Create car group
        this.carGroup = new THREE.Group()
        
        // Create car body (main chassis)
        const bodyGeometry = new THREE.BoxGeometry(2, 0.8, 4)
        const bodyMaterial = new THREE.MeshPhysicalMaterial({ 
            color: 0xff0000,
            metalness: 0.6,
            roughness: 0.4
        })
        this.body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        this.body.position.y = 0.6
        this.carGroup.add(this.body)
        
        // Create car roof/cabin
        const roofGeometry = new THREE.BoxGeometry(1.6, 0.6, 2)
        const roofMaterial = new THREE.MeshPhysicalMaterial({ 
            color: 0xff0000,
            metalness: 0.6,
            roughness: 0.4
        })
        this.roof = new THREE.Mesh(roofGeometry, roofMaterial)
        this.roof.position.set(0, 1.3, -0.3)
        this.carGroup.add(this.roof)
        
        // Create windows
        const windowMaterial = new THREE.MeshPhysicalMaterial({ 
            color: 0x87ceeb,
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: 0.6
        })
        
        // Front window
        const frontWindowGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.1)
        this.frontWindow = new THREE.Mesh(frontWindowGeometry, windowMaterial)
        this.frontWindow.position.set(0, 1.3, 0.65)
        this.carGroup.add(this.frontWindow)
        
        // Back window
        this.backWindow = new THREE.Mesh(frontWindowGeometry, windowMaterial)
        this.backWindow.position.set(0, 1.3, -1.35)
        this.carGroup.add(this.backWindow)
        
        // Create wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16)
        const wheelMaterial = new THREE.MeshPhysicalMaterial({ 
            color: 0x333333,
            metalness: 0.3,
            roughness: 0.8
        })
        
        // Wheel positions: [x, y, z]
        const wheelPositions = [
            [-1, 0.4, 1.2],   // Front left
            [1, 0.4, 1.2],    // Front right
            [-1, 0.4, -1.2],  // Back left
            [1, 0.4, -1.2]    // Back right
        ]
        
        this.wheels = []
        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
            wheel.position.set(pos[0], pos[1], pos[2])
            wheel.rotation.z = Math.PI / 2
            this.wheels.push(wheel)
            this.carGroup.add(wheel)
        })
        
        // Position car above ground
        this.carGroup.position.y = 0
        
        // Add car to scene
        scene.add(this.carGroup)
    }
    
    update(deltaTime, controls) {
        if (!controls || deltaTime > 0.1) return
        
        // Get input states
        const isAccelerating = controls.isAccelerating()
        const isBraking = controls.isBraking()
        const turnDirection = controls.getTurnDirection()
        const isHandbrake = controls.isHandbrake()
        
        // Calculate acceleration
        if (isAccelerating) {
            this.acceleration = this.accelerationForce
        } else if (isBraking) {
            this.acceleration = -this.brakeForce
        } else {
            this.acceleration = 0
        }
        
        // Apply handbrake (extra friction)
        const currentFriction = isHandbrake ? this.friction * 3 : this.friction
        
        // Update velocity based on acceleration and friction
        const forward = new THREE.Vector3(0, 0, 1)
        forward.applyQuaternion(this.carGroup.quaternion)
        
        // Apply acceleration in forward direction
        if (this.acceleration !== 0) {
            this.velocity.add(forward.multiplyScalar(this.acceleration * deltaTime))
        }
        
        // Apply friction
        const speed = this.velocity.length()
        if (speed > 0) {
            const frictionForce = Math.min(currentFriction * deltaTime, speed)
            const frictionVector = this.velocity.clone().normalize().multiplyScalar(-frictionForce)
            this.velocity.add(frictionVector)
        }
        
        // Clamp to max speed
        if (speed > this.maxSpeed) {
            this.velocity.normalize().multiplyScalar(this.maxSpeed)
        }
        
        // Update steering angle
        if (turnDirection !== 0 && speed > 0.5) {
            this.steeringAngle = turnDirection * this.maxSteeringAngle
            const turnAmount = this.turnSpeed * turnDirection * deltaTime * (speed / this.maxSpeed)
            this.carGroup.rotation.y -= turnAmount
        } else {
            this.steeringAngle = 0
        }
        
        // Update position
        this.carGroup.position.add(this.velocity.clone().multiplyScalar(deltaTime))
        
        // Rotate wheels based on movement
        const wheelRotation = speed * deltaTime * 2
        this.wheels.forEach(wheel => {
            wheel.rotation.x += wheelRotation
        })
        
        // Update speed display
        this.updateSpeedDisplay()
    }
    
    updateSpeedDisplay() {
        const speedElement = document.getElementById('speed')
        if (speedElement) {
            const speed = this.velocity.length()
            const speedKmh = Math.round(speed * 10)
            speedElement.textContent = speedKmh
        }
    }
    
    getPosition() {
        return this.carGroup.position.clone()
    }
    
    getRotation() {
        return this.carGroup.rotation.y
    }
}
