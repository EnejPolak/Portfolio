'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        console.log('Three.js component mounting...')
        
        const container = containerRef.current
        const scene = new THREE.Scene()
        const { offsetWidth: width, offsetHeight: height } = container

        console.log('Container dimensions:', width, height)

        const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100)
        camera.position.z = 4

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false
        })

        renderer.setSize(width, height)
        renderer.setClearColor(0x000000, 0)
        
        console.log('Adding canvas to container...')
        container.appendChild(renderer.domElement)

        // Original shader geometry and material
        const geometry = new THREE.PlaneGeometry(4, 4, 100, 100)
        const material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            uniforms: {
                time: { value: 0.2 },
                speed: { value: 0.0017 },
                waveDefinition: { value: 1.5 },
                waveAmplitude: { value: 0.17 },
                topoDefinition: { value: 30 },
                topoColor: { value: new THREE.Color(0.4, 0.2, 0.6) }
            },
            vertexShader: `
                vec3 mod289(vec3 x) {
                    return x - floor(x * (1.0 / 289.0)) * 289.0;
                }

                vec2 mod289(vec2 x) {
                    return x - floor(x * (1.0 / 289.0)) * 289.0;
                }

                vec3 permute(vec3 x) {
                    return mod289(((x*34.0)+1.0)*x);
                }

                float snoise(vec2 v) {
                    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
                    // First corner
                    vec2 i  = floor(v + dot(v, C.yy) );
                    vec2 x0 = v -   i + dot(i, C.xx);

                    // Other corners
                    vec2 i1;
                    //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
                    //i1.y = 1.0 - i1.x;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    // x0 = x0 - 0.0 + 0.0 * C.xx ;
                    // x1 = x0 - i1 + 1.0 * C.xx ;
                    // x2 = x0 - 1.0 + 2.0 * C.xx ;
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;

                    // Permutations
                    i = mod289(i); // Avoid truncation effects in permutation
                    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                        + i.x + vec3(0.0, i1.x, 1.0 ));

                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                    m = m*m ;
                    m = m*m ;

                    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
                    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

                    vec3 x = 2.0 * fract(p * C.www) - 1.0;
                    vec3 h = abs(x) - 0.5;
                    vec3 ox = floor(x + 0.5);
                    vec3 a0 = x - ox;

                    // Normalise gradients implicitly by scaling m
                    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
                    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

                    // Compute final noise value at P
                    vec3 g;
                    g.x  = a0.x  * x0.x  + h.x  * x0.y;
                    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                    return 130.0 * dot(m, g);
                }

                uniform float time;
                uniform float waveDefinition;
                uniform float waveAmplitude;

                varying vec3 vPosition;

                void main(void) {
                    float newZ = snoise(uv) + snoise((uv * waveDefinition) + time);
                    newZ *= waveAmplitude;

                    vec3 newPosition = vec3(position.xy, position.z + newZ);
                    vPosition = newPosition;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                #ifdef GL_OES_standard_derivatives
                #extension GL_OES_standard_derivatives : enable
                #endif

                float map(float value, float inMin, float inMax, float outMin, float outMax) {
                    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
                }

                uniform float waveAmplitude;
                uniform float topoDefinition;
                uniform vec3 topoColor;

                varying vec3 vPosition;

                void main(void) {
                    float coord = vPosition.z * topoDefinition;
                    
                    #ifdef GL_OES_standard_derivatives
                    float line = abs(fract(coord - 0.1) - 0.5) / fwidth(coord);
                    #else
                    // Fallback for browsers without derivatives extension
                    float line = abs(fract(coord - 0.1) - 0.5) / 0.02;
                    #endif
                    
                    line /= 1.1;
                    line = clamp(line, 0.0, 1.0);

                    gl_FragColor = vec4(topoColor, 1.0 - line);
                }
            `
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.y += 0.3
        mesh.rotation.x = -Math.PI / 4
        scene.add(mesh)

        console.log('Mesh added to scene')
        console.log('Shader uniforms:', material.uniforms)

        let animationId: number
        let rotationValue = 0
        const rotationSpeed = (2 * Math.PI) / (10 * 60) // 10 seconds for full rotation

        const animate = () => {
            // Update time uniform for wave animation
            material.uniforms.time.value += material.uniforms.speed.value
            
            // Update rotation (replacing TweenMax)
            rotationValue += rotationSpeed
            mesh.rotation.z = rotationValue

            renderer.render(scene, camera)
            animationId = requestAnimationFrame(animate)
        }

        animate()
        console.log('Animation started')

        // Handle resize
        const handleResize = () => {
            if (!container || !camera || !renderer) return
            
            const { offsetWidth: newWidth, offsetHeight: newHeight } = container
            camera.aspect = newWidth / newHeight
            camera.updateProjectionMatrix()
            renderer.setSize(newWidth, newHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            console.log('Cleaning up Three.js component...')
            window.removeEventListener('resize', handleResize)
            
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
            
            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }
            
            renderer.dispose()
            material.dispose()
            geometry.dispose()
        }
    }, [])

    return (
        <div 
            ref={containerRef}
            className="viewport absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}

export default ThreeBackground 