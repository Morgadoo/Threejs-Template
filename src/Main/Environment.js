import * as THREE from 'three'

export default class Environment {
    constructor(scene) {
        this.scene = scene
        
        // Create ground plane
        this.createGround()
        
        // Create sky
        this.createSky()
        
        // Create boundary walls
        this.createBoundaryWalls()
        
        // Create obstacles
        this.createObstacles()
    }
    
    createGround() {
        const groundSize = 200
        const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize, 50, 50)
        
        // Create a grid texture material
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2d5016,
            roughness: 0.8,
            metalness: 0.2
        })
        
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial)
        this.ground.rotation.x = -Math.PI / 2
        this.ground.position.y = 0
        this.ground.receiveShadow = true
        
        this.scene.add(this.ground)
        
        // Add grid lines for visual reference
        const gridHelper = new THREE.GridHelper(groundSize, 50, 0x444444, 0x333333)
        gridHelper.position.y = 0.01
        this.scene.add(gridHelper)
    }
    
    createSky() {
        // Create sky using a large sphere
        const skyGeometry = new THREE.SphereGeometry(500, 32, 32)
        const skyMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x87ceeb,
            side: THREE.BackSide
        })
        
        this.sky = new THREE.Mesh(skyGeometry, skyMaterial)
        this.scene.add(this.sky)
        
        // Add some ambient fog for depth
        this.scene.fog = new THREE.Fog(0x87ceeb, 100, 400)
    }
    
    createBoundaryWalls() {
        const wallHeight = 5
        const wallThickness = 2
        const boundarySize = 100
        
        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b4513,
            roughness: 0.9,
            metalness: 0.1
        })
        
        // North wall
        const northWallGeometry = new THREE.BoxGeometry(boundarySize * 2, wallHeight, wallThickness)
        const northWall = new THREE.Mesh(northWallGeometry, wallMaterial)
        northWall.position.set(0, wallHeight / 2, -boundarySize)
        northWall.castShadow = true
        this.scene.add(northWall)
        
        // South wall
        const southWall = new THREE.Mesh(northWallGeometry, wallMaterial)
        southWall.position.set(0, wallHeight / 2, boundarySize)
        southWall.castShadow = true
        this.scene.add(southWall)
        
        // East wall
        const eastWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, boundarySize * 2)
        const eastWall = new THREE.Mesh(eastWallGeometry, wallMaterial)
        eastWall.position.set(boundarySize, wallHeight / 2, 0)
        eastWall.castShadow = true
        this.scene.add(eastWall)
        
        // West wall
        const westWall = new THREE.Mesh(eastWallGeometry, wallMaterial)
        westWall.position.set(-boundarySize, wallHeight / 2, 0)
        westWall.castShadow = true
        this.scene.add(westWall)
    }
    
    createObstacles() {
        const obstacleMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xff6600,
            roughness: 0.7,
            metalness: 0.3
        })
        
        // Create traffic cones scattered around
        const conePositions = [
            [20, 0, 20],
            [-25, 0, 15],
            [30, 0, -20],
            [-15, 0, -30],
            [40, 0, 10],
            [-35, 0, -10],
            [15, 0, -40],
            [-20, 0, 35],
            [25, 0, -35],
            [-30, 0, 25]
        ]
        
        conePositions.forEach(pos => {
            const coneGeometry = new THREE.ConeGeometry(0.8, 2, 8)
            const cone = new THREE.Mesh(coneGeometry, obstacleMaterial)
            cone.position.set(pos[0], 1, pos[2])
            cone.castShadow = true
            this.scene.add(cone)
        })
        
        // Create some box obstacles
        const boxMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b8b8b,
            roughness: 0.8,
            metalness: 0.2
        })
        
        const boxPositions = [
            [45, 0, -15],
            [-40, 0, 20],
            [35, 0, 30],
            [-45, 0, -25]
        ]
        
        boxPositions.forEach(pos => {
            const boxGeometry = new THREE.BoxGeometry(3, 3, 3)
            const box = new THREE.Mesh(boxGeometry, boxMaterial)
            box.position.set(pos[0], 1.5, pos[2])
            box.castShadow = true
            this.scene.add(box)
        })
        
        // Add some cylindrical pillars
        const pillarMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xcccccc,
            roughness: 0.6,
            metalness: 0.4
        })
        
        const pillarPositions = [
            [50, 0, 0],
            [-50, 0, 0],
            [0, 0, 50],
            [0, 0, -50]
        ]
        
        pillarPositions.forEach(pos => {
            const pillarGeometry = new THREE.CylinderGeometry(1, 1, 6, 16)
            const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
            pillar.position.set(pos[0], 3, pos[2])
            pillar.castShadow = true
            this.scene.add(pillar)
        })
    }
}
