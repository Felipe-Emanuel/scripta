import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface BookCoverProps {
  base64Image: string
}

export function BookCover({ base64Image }: BookCoverProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const width = canvasRef.current.clientWidth
      const height = canvasRef.current.clientHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true
      })
      renderer.setSize(width, height)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(10, 10, 10)
      directionalLight.castShadow = true
      directionalLight.shadow.camera.near = 0.5
      directionalLight.shadow.camera.far = 50
      scene.add(directionalLight)

      const textureLoader = new THREE.TextureLoader()
      const coverTexture = textureLoader.load(base64Image)

      const bookWidth = 1.5
      const bookHeight = 1.8
      const bookDepth = 0.2

      const geometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth)

      const materials = [
        new THREE.MeshStandardMaterial({ color: 0xdddddd }),
        new THREE.MeshStandardMaterial({ color: 0xdddddd }),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee }),
        new THREE.MeshStandardMaterial({ color: 0xeeeeee }),
        new THREE.MeshStandardMaterial({ map: coverTexture }),
        new THREE.MeshStandardMaterial({ color: 0xcccccc })
      ]

      const book = new THREE.Mesh(geometry, materials)
      book.castShadow = true
      scene.add(book)

      book.rotation.y = THREE.MathUtils.degToRad(30)
      book.rotation.x = THREE.MathUtils.degToRad(-15)
      book.position.y = 0

      const planeGeometry = new THREE.PlaneGeometry(10, 10)
      const planeMaterial = new THREE.ShadowMaterial({ opacity: 1 })
      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -Math.PI / 2
      plane.position.y = -bookHeight / 2
      plane.receiveShadow = true
      scene.add(plane)

      camera.position.set(0, 1.5, 3)
      camera.lookAt(book.position)

      const animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        if (canvasRef.current) {
          const newWidth = canvasRef.current.clientWidth
          const newHeight = canvasRef.current.clientHeight
          renderer.setSize(newWidth, newHeight)
          camera.aspect = newWidth / newHeight
          camera.updateProjectionMatrix()
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [base64Image])

  return <canvas ref={canvasRef} className="h-full" />
}
