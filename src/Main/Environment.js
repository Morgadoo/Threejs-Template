import * as THREE from 'three'

export default class Environment {
    constructor(scene) {
        this.scene = scene
        
        this.createRoad()
        this.createLaneMarkings()
        this.createGround()
        this.createObstacles()
    }
    
    createRoad() {
        const roadLength = 250
        const roadWidth = 12
        
        const roadGeometry = new THREE.PlaneGeometry(roadWidth, roadLength)
        const roadMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2a2a2a,
            roughness: 0.8,
            metalness: 0.2
        })
        
        this.road = new THREE.Mesh(roadGeometry, roadMaterial)
        this.road.rotation.x = -Math.PI / 2
        this.road.position.y = 0
        this.road.position.z = roadLength / 2 - 25
        this.road.receiveShadow = true
        
        this.scene.add(this.road)
    }
    
    createLaneMarkings() {
        const roadLength = 250
        const markingWidth = 0.3
        const markingLength = 3
        const markingGap = 6
        const numMarkings = Math.floor(roadLength / (markingLength + markingGap))
        
        const markingGeometry = new THREE.BoxGeometry(markingWidth, 0.05, markingLength)
        const markingMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.2
        })
        
        for (let i = 0; i < numMarkings; i++) {
            const marking = new THREE.Mesh(markingGeometry, markingMaterial)
            marking.position.set(
                0,
                0.03,
                i * (markingLength + markingGap) - 25
            )
            this.scene.add(marking)
        }
        
        const sideLaneGeometry = new THREE.BoxGeometry(markingWidth, 0.05, roadLength)
        const sideLaneMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffff00,
            emissive: 0xffff00,
            emissiveIntensity: 0.1
        })
        
        const leftLine = new THREE.Mesh(sideLaneGeometry, sideLaneMaterial)
        leftLine.position.set(-5.5, 0.03, roadLength / 2 - 25)
        this.scene.add(leftLine)
        
        const rightLine = new THREE.Mesh(sideLaneGeometry, sideLaneMaterial)
        rightLine.position.set(5.5, 0.03, roadLength / 2 - 25)
        this.scene.add(rightLine)
    }
    
    createGround() {
        const groundSize = 500
        const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize)
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3a5f3a,
            roughness: 0.9,
            metalness: 0.1
        })
        
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial)
        this.ground.rotation.x = -Math.PI / 2
        this.ground.position.y = -0.01
        this.ground.receiveShadow = true
        
        this.scene.add(this.ground)
    }
    
    createObstacles() {
        const buildingMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b7355,
            roughness: 0.7,
            metalness: 0.3
        })
        
        const roofMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x654321,
            roughness: 0.8,
            metalness: 0.2
        })
        
        const buildingPositions = [
            { x: -15, z: 20, width: 8, height: 12, depth: 8 },
            { x: 15, z: 30, width: 6, height: 15, depth: 6 },
            { x: -18, z: 60, width: 10, height: 10, depth: 10 },
            { x: 20, z: 80, width: 7, height: 18, depth: 7 },
            { x: -16, z: 110, width: 9, height: 14, depth: 9 },
            { x: 18, z: 130, width: 8, height: 11, depth: 8 },
            { x: -17, z: 160, width: 6, height: 16, depth: 6 },
            { x: 19, z: 180, width: 10, height: 13, depth: 10 }
        ]
        
        buildingPositions.forEach(pos => {
            const buildingGeometry = new THREE.BoxGeometry(pos.width, pos.height, pos.depth)
            const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
            building.position.set(pos.x, pos.height / 2, pos.z)
            building.castShadow = true
            building.receiveShadow = true
            this.scene.add(building)
            
            const roofGeometry = new THREE.BoxGeometry(pos.width + 1, 1, pos.depth + 1)
            const roof = new THREE.Mesh(roofGeometry, roofMaterial)
            roof.position.set(pos.x, pos.height + 0.5, pos.z)
            roof.castShadow = true
            this.scene.add(roof)
        })
        
        const treeTrunkMaterial = new THREE.MeshStandardMaterial({ color: 0x4a3728 })
        const treeFoliageMaterial = new THREE.MeshStandardMaterial({ color: 0x2d5016 })
        
        const treePositions = [
            { x: -12, z: 10 },
            { x: 12, z: 15 },
            { x: -13, z: 45 },
            { x: 13, z: 50 },
            { x: -12, z: 90 },
            { x: 14, z: 100 },
            { x: -13, z: 140 },
            { x: 12, z: 150 },
            { x: -14, z: 190 },
            { x: 13, z: 200 }
        ]
        
        treePositions.forEach(pos => {
            const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.6, 4, 8)
            const trunk = new THREE.Mesh(trunkGeometry, treeTrunkMaterial)
            trunk.position.set(pos.x, 2, pos.z)
            trunk.castShadow = true
            this.scene.add(trunk)
            
            const foliageGeometry = new THREE.SphereGeometry(2.5, 8, 8)
            const foliage = new THREE.Mesh(foliageGeometry, treeFoliageMaterial)
            foliage.position.set(pos.x, 5, pos.z)
            foliage.castShadow = true
            this.scene.add(foliage)
        })
    }
}
