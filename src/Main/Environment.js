import * as THREE from 'three'

export default class Environment {
    constructor(scene) {
        this.scene = scene
        this.createGround()
        this.createRoad()
        this.createRoadMarkings()
        this.createBarriers()
        this.createTrees()
    }
    
    createGround() {
        const groundGeometry = new THREE.PlaneGeometry(200, 200)
        const groundMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x228B22,
            side: THREE.DoubleSide
        })
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial)
        this.ground.rotation.x = -Math.PI / 2
        this.ground.position.y = 0
        this.ground.receiveShadow = true
        this.scene.add(this.ground)
    }
    
    createRoad() {
        const roadLength = 150
        const roadWidth = 12
        const roadGeometry = new THREE.BoxGeometry(roadWidth, 0.1, roadLength)
        const roadMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
        this.road = new THREE.Mesh(roadGeometry, roadMaterial)
        this.road.position.set(0, 0.05, 0)
        this.road.receiveShadow = true
        this.scene.add(this.road)
    }
    
    createRoadMarkings() {
        const markingMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
        const roadLength = 150
        const markingWidth = 0.3
        const markingHeight = 0.05
        const dashLength = 3
        const dashGap = 2
        
        // Center line dashes
        const numDashes = Math.floor(roadLength / (dashLength + dashGap))
        for (let i = 0; i < numDashes; i++) {
            const markingGeometry = new THREE.BoxGeometry(markingWidth, markingHeight, dashLength)
            const marking = new THREE.Mesh(markingGeometry, markingMaterial)
            const zPos = -roadLength / 2 + i * (dashLength + dashGap) + dashLength / 2
            marking.position.set(0, 0.11, zPos)
            this.scene.add(marking)
        }
        
        // Side lines (continuous)
        const sideLineGeometry = new THREE.BoxGeometry(markingWidth, markingHeight, roadLength)
        
        // Left side line
        const leftLine = new THREE.Mesh(sideLineGeometry, markingMaterial)
        leftLine.position.set(-5.5, 0.11, 0)
        this.scene.add(leftLine)
        
        // Right side line
        const rightLine = new THREE.Mesh(sideLineGeometry, markingMaterial)
        rightLine.position.set(5.5, 0.11, 0)
        this.scene.add(rightLine)
    }
    
    createBarriers() {
        const barrierMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
        const barrierHeight = 1
        const barrierWidth = 0.5
        const roadLength = 150
        const barrierSegmentLength = 5
        const numSegments = Math.floor(roadLength / barrierSegmentLength)
        
        // Left barriers
        for (let i = 0; i < numSegments; i++) {
            const barrierGeometry = new THREE.BoxGeometry(barrierWidth, barrierHeight, barrierSegmentLength - 0.5)
            const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial)
            const zPos = -roadLength / 2 + i * barrierSegmentLength + barrierSegmentLength / 2
            barrier.position.set(-7, barrierHeight / 2, zPos)
            barrier.castShadow = true
            this.scene.add(barrier)
        }
        
        // Right barriers
        for (let i = 0; i < numSegments; i++) {
            const barrierGeometry = new THREE.BoxGeometry(barrierWidth, barrierHeight, barrierSegmentLength - 0.5)
            const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial)
            const zPos = -roadLength / 2 + i * barrierSegmentLength + barrierSegmentLength / 2
            barrier.position.set(7, barrierHeight / 2, zPos)
            barrier.castShadow = true
            this.scene.add(barrier)
        }
    }
    
    createTrees() {
        const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 })
        const foliageMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 })
        
        // Tree positions around the track
        const treePositions = [
            // Left side trees
            [-15, 0, -60],
            [-12, 0, -40],
            [-18, 0, -20],
            [-14, 0, 0],
            [-16, 0, 20],
            [-13, 0, 40],
            [-17, 0, 60],
            // Right side trees
            [15, 0, -60],
            [12, 0, -40],
            [18, 0, -20],
            [14, 0, 0],
            [16, 0, 20],
            [13, 0, 40],
            [17, 0, 60],
            // Behind start position
            [-10, 0, 80],
            [10, 0, 80],
            [0, 0, 85],
            // Far ahead
            [-12, 0, -80],
            [12, 0, -80],
        ]
        
        treePositions.forEach(pos => {
            this.createTree(pos[0], pos[1], pos[2], trunkMaterial, foliageMaterial)
        })
    }
    
    createTree(x, y, z, trunkMaterial, foliageMaterial) {
        const treeGroup = new THREE.Group()
        
        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 3, 8)
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
        trunk.position.y = 1.5
        trunk.castShadow = true
        treeGroup.add(trunk)
        
        // Foliage (3 spheres stacked)
        const foliageGeometry1 = new THREE.SphereGeometry(1.5, 8, 8)
        const foliage1 = new THREE.Mesh(foliageGeometry1, foliageMaterial)
        foliage1.position.y = 3.5
        foliage1.castShadow = true
        treeGroup.add(foliage1)
        
        const foliageGeometry2 = new THREE.SphereGeometry(1.2, 8, 8)
        const foliage2 = new THREE.Mesh(foliageGeometry2, foliageMaterial)
        foliage2.position.y = 4.5
        foliage2.castShadow = true
        treeGroup.add(foliage2)
        
        const foliageGeometry3 = new THREE.SphereGeometry(0.9, 8, 8)
        const foliage3 = new THREE.Mesh(foliageGeometry3, foliageMaterial)
        foliage3.position.y = 5.3
        foliage3.castShadow = true
        treeGroup.add(foliage3)
        
        treeGroup.position.set(x, y, z)
        this.scene.add(treeGroup)
    }
}
