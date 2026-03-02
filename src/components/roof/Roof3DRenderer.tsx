import React, { useRef, useEffect } from 'react';
import { RoofConfig } from '../../types/roof';
import { 
  Scene, 
  Color, 
  Fog, 
  PerspectiveCamera, 
  WebGLRenderer, 
  PCFSoftShadowMap,
  AmbientLight,
  DirectionalLight,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  GridHelper,
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  BufferGeometry,
  BufferAttribute
} from '../../utils/three';

interface Roof3DRendererProps {
  config: RoofConfig;
}

// Helper: convert dormer horizontalPosition to a percentage along building length
function dormerPositionToPercent(pos: string): number {
  switch (pos) {
    case 'left': return 25;
    case 'right': return 75;
    case 'center':
    default: return 50;
  }
}

export function Roof3DRenderer({ config }: Roof3DRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create scene
    const scene = new Scene();
    scene.background = new Color(0xe8f1f8);
    scene.fog = new Fog(0xe8f1f8, 10, 60);

    // Create camera
    const camera = new PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(12, 10, 12);
    camera.lookAt(0, 0, 0);

    // Create renderer
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.85);
    directionalLight.position.set(20, 25, 15);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 60;
    directionalLight.shadow.camera.left = -25;
    directionalLight.shadow.camera.right = 25;
    directionalLight.shadow.camera.top = 25;
    directionalLight.shadow.camera.bottom = -25;
    scene.add(directionalLight);

    const fillLight = new DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-15, 15, -15);
    scene.add(fillLight);

    // Convert feet to meters
    const scale = 0.3048;
    const buildingWidth = config.width * scale;
    const buildingLength = config.length * scale;
    const wallHeight = 2.5; // Typical wall height for visualization
    
    // Parse pitch (e.g., "6/12")
    const pitchParts = config.pitch.split('/');
    const pitchRise = parseInt(pitchParts[0]);
    const pitchRun = parseInt(pitchParts[1]);
    const roofPitch = pitchRise / pitchRun;
    const roofRise = (buildingWidth / 2) * roofPitch;

    const eaveOverhang = config.eaveOverhang * scale;
    const rakeOverhang = config.rakeOverhang * scale;

    // Create ground
    const groundGeometry = new PlaneGeometry(60, 60);
    const groundMaterial = new MeshStandardMaterial({ 
      color: 0x6a8a5a,
      roughness: 0.9,
      metalness: 0.0
    });
    const ground = new Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Ground grid
    const gridHelper = new GridHelper(40, 40, 0x7b9a6b, 0x9aad8a);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Building walls (simplified)
    const wallMaterial = new MeshStandardMaterial({ 
      color: 0xf0ead6,
      roughness: 0.8,
      side: DoubleSide
    });

    // Front wall
    const frontWallGeometry = new BoxGeometry(buildingWidth, wallHeight, 0.2);
    const frontWall = new Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.set(0, wallHeight / 2, buildingLength / 2);
    frontWall.castShadow = true;
    frontWall.receiveShadow = true;
    scene.add(frontWall);

    // Back wall
    const backWall = new Mesh(frontWallGeometry, wallMaterial);
    backWall.position.set(0, wallHeight / 2, -buildingLength / 2);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Side walls
    const sideWallGeometry = new BoxGeometry(0.2, wallHeight, buildingLength);
    const leftWall = new Mesh(sideWallGeometry, wallMaterial);
    leftWall.position.set(-buildingWidth / 2, wallHeight / 2, 0);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    const rightWall = new Mesh(sideWallGeometry, wallMaterial);
    rightWall.position.set(buildingWidth / 2, wallHeight / 2, 0);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Roof material
    const roofColor = 
      config.shingleType === 'metal' ? 0x7f8c8d :
      config.shingleType === 'cedar-shake' ? 0x8b6f47 :
      config.shingleType === 'designer' ? 0x3a3a3a : 0x4a3f35;

    const roofMaterial = new MeshStandardMaterial({ 
      color: roofColor,
      roughness: config.shingleType === 'metal' ? 0.2 : 0.95,
      metalness: config.shingleType === 'metal' ? 0.7 : 0.0
    });

    // Create roof based on style
    if (config.style === 'gable') {
      const roofLength = Math.sqrt(Math.pow(buildingWidth / 2, 2) + Math.pow(roofRise, 2));
      const roofAngle = Math.atan2(roofRise, buildingWidth / 2);
      
      // Left roof slope
      const leftRoofGeometry = new BoxGeometry(
        roofLength + rakeOverhang, 
        0.1, 
        buildingLength + eaveOverhang * 2
      );
      const leftRoof = new Mesh(leftRoofGeometry, roofMaterial);
      leftRoof.position.set(
        -buildingWidth / 4,
        wallHeight + roofRise / 2,
        0
      );
      leftRoof.rotation.z = roofAngle;
      leftRoof.castShadow = true;
      leftRoof.receiveShadow = true;
      scene.add(leftRoof);

      // Right roof slope
      const rightRoof = new Mesh(leftRoofGeometry, roofMaterial);
      rightRoof.position.set(
        buildingWidth / 4,
        wallHeight + roofRise / 2,
        0
      );
      rightRoof.rotation.z = -roofAngle;
      rightRoof.castShadow = true;
      rightRoof.receiveShadow = true;
      scene.add(rightRoof);

      // Ridge cap
      const ridgeGeometry = new BoxGeometry(
        0.15,
        0.12,
        buildingLength + eaveOverhang * 2
      );
      const ridgeMaterial = new MeshStandardMaterial({ 
        color: roofColor,
        roughness: config.shingleType === 'metal' ? 0.2 : 0.9
      });
      const ridge = new Mesh(ridgeGeometry, ridgeMaterial);
      ridge.position.set(0, wallHeight + roofRise + 0.06, 0);
      ridge.castShadow = true;
      scene.add(ridge);

    } else if (config.style === 'hip') {
      // Main roof slopes
      const roofLength = Math.sqrt(Math.pow(buildingWidth / 2, 2) + Math.pow(roofRise, 2));
      const roofAngle = Math.atan2(roofRise, buildingWidth / 2);
      
      // Adjusted length for hip
      const hipRoofLength = buildingLength * 0.7;
      
      // Left slope
      const leftRoofGeometry = new BoxGeometry(roofLength + rakeOverhang, 0.1, hipRoofLength);
      const leftRoof = new Mesh(leftRoofGeometry, roofMaterial);
      leftRoof.position.set(-buildingWidth / 4, wallHeight + roofRise / 2, 0);
      leftRoof.rotation.z = roofAngle;
      leftRoof.castShadow = true;
      scene.add(leftRoof);

      // Right slope
      const rightRoof = new Mesh(leftRoofGeometry, roofMaterial);
      rightRoof.position.set(buildingWidth / 4, wallHeight + roofRise / 2, 0);
      rightRoof.rotation.z = -roofAngle;
      rightRoof.castShadow = true;
      scene.add(rightRoof);

      // Hip ends (simplified)
      const hipEndGeometry = new BoxGeometry(buildingWidth + rakeOverhang * 2, 0.1, roofLength * 0.6);
      const frontHip = new Mesh(hipEndGeometry, roofMaterial);
      frontHip.position.set(0, wallHeight + roofRise / 2, buildingLength * 0.4);
      frontHip.rotation.x = roofAngle;
      frontHip.castShadow = true;
      scene.add(frontHip);

      const backHip = new Mesh(hipEndGeometry, roofMaterial);
      backHip.position.set(0, wallHeight + roofRise / 2, -buildingLength * 0.4);
      backHip.rotation.x = -roofAngle;
      backHip.castShadow = true;
      scene.add(backHip);

    } else if (config.style === 'flat') {
      const flatRoofGeometry = new BoxGeometry(
        buildingWidth + rakeOverhang * 2,
        0.15,
        buildingLength + eaveOverhang * 2
      );
      const flatRoof = new Mesh(flatRoofGeometry, roofMaterial);
      flatRoof.position.set(0, wallHeight + 0.075, 0);
      flatRoof.castShadow = true;
      flatRoof.receiveShadow = true;
      scene.add(flatRoof);

    } else if (config.style === 'shed') {
      const shedRise = buildingWidth * roofPitch;
      const shedRoofLength = Math.sqrt(Math.pow(buildingWidth, 2) + Math.pow(shedRise, 2));
      const shedAngle = Math.atan2(shedRise, buildingWidth);
      
      const shedRoofGeometry = new BoxGeometry(
        shedRoofLength + rakeOverhang,
        0.1,
        buildingLength + eaveOverhang * 2
      );
      const shedRoof = new Mesh(shedRoofGeometry, roofMaterial);
      shedRoof.position.set(0, wallHeight + shedRise / 2, 0);
      shedRoof.rotation.z = shedAngle;
      shedRoof.castShadow = true;
      shedRoof.receiveShadow = true;
      scene.add(shedRoof);

    } else if (config.style === 'gambrel') {
      // Gambrel (barn) roof — steeper lower slopes, gentler upper slopes
      const lowerRise = roofRise * 0.55;
      const upperRise = roofRise * 0.45;
      const lowerWidth = buildingWidth / 4;
      const upperWidth = buildingWidth / 4;

      // Lower left roof panel
      const lowerSlopeLen = Math.sqrt(lowerWidth * lowerWidth + lowerRise * lowerRise);
      const lowerAngle = Math.atan2(lowerRise, lowerWidth);
      const lowerLeftRoof = new Mesh(
        new BoxGeometry(lowerSlopeLen + rakeOverhang * 0.5, 0.1, buildingLength + eaveOverhang * 2),
        roofMaterial
      );
      lowerLeftRoof.position.set(
        -(buildingWidth / 2 - lowerWidth / 2),
        wallHeight + lowerRise / 2,
        0
      );
      lowerLeftRoof.rotation.z = lowerAngle;
      lowerLeftRoof.castShadow = true;
      lowerLeftRoof.receiveShadow = true;
      scene.add(lowerLeftRoof);

      // Lower right roof panel
      const lowerRightRoof = new Mesh(
        new BoxGeometry(lowerSlopeLen + rakeOverhang * 0.5, 0.1, buildingLength + eaveOverhang * 2),
        roofMaterial
      );
      lowerRightRoof.position.set(
        (buildingWidth / 2 - lowerWidth / 2),
        wallHeight + lowerRise / 2,
        0
      );
      lowerRightRoof.rotation.z = -lowerAngle;
      lowerRightRoof.castShadow = true;
      lowerRightRoof.receiveShadow = true;
      scene.add(lowerRightRoof);

      // Upper left roof panel
      const upperSlopeLen = Math.sqrt(upperWidth * upperWidth + upperRise * upperRise);
      const upperAngle = Math.atan2(upperRise, upperWidth);
      const upperLeftRoof = new Mesh(
        new BoxGeometry(upperSlopeLen + rakeOverhang * 0.5, 0.1, buildingLength + eaveOverhang * 2),
        roofMaterial
      );
      upperLeftRoof.position.set(
        -upperWidth / 2,
        wallHeight + lowerRise + upperRise / 2,
        0
      );
      upperLeftRoof.rotation.z = upperAngle;
      upperLeftRoof.castShadow = true;
      upperLeftRoof.receiveShadow = true;
      scene.add(upperLeftRoof);

      // Upper right roof panel
      const upperRightRoof = new Mesh(
        new BoxGeometry(upperSlopeLen + rakeOverhang * 0.5, 0.1, buildingLength + eaveOverhang * 2),
        roofMaterial
      );
      upperRightRoof.position.set(
        upperWidth / 2,
        wallHeight + lowerRise + upperRise / 2,
        0
      );
      upperRightRoof.rotation.z = -upperAngle;
      upperRightRoof.castShadow = true;
      upperRightRoof.receiveShadow = true;
      scene.add(upperRightRoof);

      // Ridge cap
      const ridgeGeom = new BoxGeometry(0.15, 0.12, buildingLength + eaveOverhang * 2);
      const ridgeMat = new MeshStandardMaterial({ color: roofColor, roughness: 0.5 });
      const ridge = new Mesh(ridgeGeom, ridgeMat);
      ridge.position.set(0, wallHeight + lowerRise + upperRise + 0.06, 0);
      ridge.castShadow = true;
      scene.add(ridge);

      // Gambrel gable end fills
      const gTop = wallHeight;
      const gMid = wallHeight + lowerRise;
      const gPeak = wallHeight + lowerRise + upperRise;
      const gInner = buildingWidth / 4;

      for (const zPos of [buildingLength / 2, -buildingLength / 2]) {
        // Lower left triangle
        const llGeom = new BufferGeometry();
        llGeom.setAttribute('position', new BufferAttribute(new Float32Array([
          -buildingWidth / 2, gTop, zPos,
          -gInner, gMid, zPos,
          -gInner, gTop, zPos,
        ]), 3));
        llGeom.computeVertexNormals();
        scene.add(new Mesh(llGeom, wallMaterial));

        // Lower right triangle
        const lrGeom = new BufferGeometry();
        lrGeom.setAttribute('position', new BufferAttribute(new Float32Array([
          buildingWidth / 2, gTop, zPos,
          gInner, gTop, zPos,
          gInner, gMid, zPos,
        ]), 3));
        lrGeom.computeVertexNormals();
        scene.add(new Mesh(lrGeom, wallMaterial));

        // Center rectangle between lower triangles
        const rectGeom = new BufferGeometry();
        rectGeom.setAttribute('position', new BufferAttribute(new Float32Array([
          -gInner, gTop, zPos,
          gInner, gTop, zPos,
          gInner, gMid, zPos,
          -gInner, gTop, zPos,
          gInner, gMid, zPos,
          -gInner, gMid, zPos,
        ]), 3));
        rectGeom.computeVertexNormals();
        scene.add(new Mesh(rectGeom, wallMaterial));

        // Upper triangle to peak
        const upGeom = new BufferGeometry();
        upGeom.setAttribute('position', new BufferAttribute(new Float32Array([
          -gInner, gMid, zPos,
          gInner, gMid, zPos,
          0, gPeak, zPos,
        ]), 3));
        upGeom.computeVertexNormals();
        scene.add(new Mesh(upGeom, wallMaterial));
      }

    } else if (config.style === 'mansard') {
      // Mansard roof — steep slopes on all four sides with flat or near-flat top
      const mansardHeight = roofRise * 0.75; // Steep side portion
      const topInset = buildingWidth * 0.2; // How much the top is inset from each side
      const topInsetZ = buildingLength * 0.15;

      // Steep lower slope angle
      const sideLen = Math.sqrt(topInset * topInset + mansardHeight * mansardHeight);
      const sideAngle = Math.atan2(mansardHeight, topInset);

      // Left steep slope
      const leftSlopeGeom = new BoxGeometry(sideLen + 0.1, 0.1, buildingLength + eaveOverhang * 2);
      const leftSlope = new Mesh(leftSlopeGeom, roofMaterial);
      leftSlope.position.set(
        -buildingWidth / 2 + topInset / 2,
        wallHeight + mansardHeight / 2,
        0
      );
      leftSlope.rotation.z = sideAngle;
      leftSlope.castShadow = true;
      leftSlope.receiveShadow = true;
      scene.add(leftSlope);

      // Right steep slope
      const rightSlope = new Mesh(leftSlopeGeom, roofMaterial);
      rightSlope.position.set(
        buildingWidth / 2 - topInset / 2,
        wallHeight + mansardHeight / 2,
        0
      );
      rightSlope.rotation.z = -sideAngle;
      rightSlope.castShadow = true;
      rightSlope.receiveShadow = true;
      scene.add(rightSlope);

      // Front steep slope
      const frontSideLen = Math.sqrt(topInsetZ * topInsetZ + mansardHeight * mansardHeight);
      const frontSideAngle = Math.atan2(mansardHeight, topInsetZ);
      const frontSlopeGeom = new BoxGeometry(buildingWidth - topInset * 2, 0.1, frontSideLen + 0.1);
      const frontSlope = new Mesh(frontSlopeGeom, roofMaterial);
      frontSlope.position.set(
        0,
        wallHeight + mansardHeight / 2,
        buildingLength / 2 - topInsetZ / 2
      );
      frontSlope.rotation.x = -frontSideAngle;
      frontSlope.castShadow = true;
      frontSlope.receiveShadow = true;
      scene.add(frontSlope);

      // Back steep slope
      const backSlope = new Mesh(frontSlopeGeom, roofMaterial);
      backSlope.position.set(
        0,
        wallHeight + mansardHeight / 2,
        -buildingLength / 2 + topInsetZ / 2
      );
      backSlope.rotation.x = frontSideAngle;
      backSlope.castShadow = true;
      backSlope.receiveShadow = true;
      scene.add(backSlope);

      // Flat top
      const flatTopGeom = new BoxGeometry(
        buildingWidth - topInset * 2 + 0.1,
        0.12,
        buildingLength - topInsetZ * 2 + 0.1
      );
      const flatTop = new Mesh(flatTopGeom, roofMaterial);
      flatTop.position.set(0, wallHeight + mansardHeight + 0.06, 0);
      flatTop.castShadow = true;
      flatTop.receiveShadow = true;
      scene.add(flatTop);
    }

    // Gable end fills for gable style
    if (config.style === 'gable') {
      for (const zPos of [buildingLength / 2, -buildingLength / 2]) {
        const gableGeom = new BufferGeometry();
        gableGeom.setAttribute('position', new BufferAttribute(new Float32Array([
          -buildingWidth / 2, wallHeight, zPos,
          buildingWidth / 2, wallHeight, zPos,
          0, wallHeight + roofRise, zPos,
        ]), 3));
        gableGeom.computeVertexNormals();
        const gableMesh = new Mesh(gableGeom, wallMaterial);
        gableMesh.castShadow = true;
        scene.add(gableMesh);
      }
    }

    // Chimney (if configured)
    if (config.hasChimney && config.chimneyCount && config.chimneyCount > 0) {
      const chimneyGeometry = new BoxGeometry(0.6, 2.5, 0.6);
      const chimneyMaterial = new MeshStandardMaterial({ 
        color: 0x8b4513,
        roughness: 0.9
      });
      const chimney = new Mesh(chimneyGeometry, chimneyMaterial);
      chimney.position.set(buildingWidth * 0.2, wallHeight + roofRise / 2 + 1.25, buildingLength * 0.2);
      chimney.castShadow = true;
      scene.add(chimney);
    }

    // Skylights (if configured)
    if (config.hasSkylight && config.skylightCount && config.skylightCount > 0) {
      for (let i = 0; i < config.skylightCount; i++) {
        const skylightGeometry = new BoxGeometry(0.8, 0.08, 1.2);
        const skylightMaterial = new MeshStandardMaterial({ 
          color: 0x87ceeb,
          transparent: true,
          opacity: 0.6,
          metalness: 0.9,
          roughness: 0.1
        });
        const skylight = new Mesh(skylightGeometry, skylightMaterial);
        
        const xPos = -buildingWidth * 0.3 + i * 1.5;
        const roofAngle = Math.atan2(roofRise, buildingWidth / 2);
        
        skylight.position.set(xPos, wallHeight + roofRise * 0.6, -buildingLength * 0.2);
        skylight.rotation.z = roofAngle;
        scene.add(skylight);
      }
    }

    // Ridge vent (if applicable)
    if (config.style === 'gable' && config.ridgeVentLength) {
      const ventGeometry = new CylinderGeometry(0.08, 0.08, buildingLength * 0.8, 16);
      const ventMaterial = new MeshStandardMaterial({ 
        color: 0x2c3e50,
        roughness: 0.6
      });
      const vent = new Mesh(ventGeometry, ventMaterial);
      vent.rotation.x = Math.PI / 2;
      vent.position.set(0, wallHeight + roofRise + 0.12, 0);
      scene.add(vent);
    }

    // Dormers (if configured)
    if (config.hasDormers && config.dormers && config.dormers.length > 0) {
      const dormerWallMat = new MeshStandardMaterial({ 
        color: 0xf0ead6,
        roughness: 0.8,
        side: DoubleSide
      });
      const dormerRoofMat = new MeshStandardMaterial({ 
        color: roofColor,
        roughness: config.shingleType === 'metal' ? 0.2 : 0.95,
        metalness: config.shingleType === 'metal' ? 0.7 : 0.0
      });
      const windowMat = new MeshStandardMaterial({ 
        color: 0x87ceeb,
        transparent: true,
        opacity: 0.6,
        metalness: 0.8,
        roughness: 0.1
      });

      for (const dormer of config.dormers) {
        const dW = dormer.width * scale;
        const dH = dormer.height * scale;
        const dD = dormer.depth * scale;

        // Calculate position on roof
        const posAlongLength = -buildingLength / 2 + (buildingLength * dormerPositionToPercent(dormer.horizontalPosition) / 100);
        const roofAngle = Math.atan2(roofRise, buildingWidth / 2);
        
        // Position partway up the roof slope
        const slopeProgress = 0.4;
        const baseYPos = wallHeight + roofRise * slopeProgress;
        const xOffset = dormer.side === 'front' 
          ? -(buildingWidth / 2) * (1 - slopeProgress) 
          : (buildingWidth / 2) * (1 - slopeProgress);

        // Front wall of dormer
        const frontWallGeom = new BoxGeometry(dW, dH, 0.08);
        const frontWall = new Mesh(frontWallGeom, dormerWallMat);
        const frontZ = dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2;
        frontWall.position.set(posAlongLength, baseYPos + dH / 2, dormer.side === 'front' ? xOffset - dD : xOffset + dD);
        frontWall.castShadow = true;
        frontWall.receiveShadow = true;
        scene.add(frontWall);

        // Side walls
        const sideWallGeom = new BoxGeometry(0.08, dH, dD);
        const leftSideWall = new Mesh(sideWallGeom, dormerWallMat);
        leftSideWall.position.set(posAlongLength - dW / 2, baseYPos + dH / 2, dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2);
        leftSideWall.castShadow = true;
        scene.add(leftSideWall);

        const rightSideWall = new Mesh(sideWallGeom, dormerWallMat);
        rightSideWall.position.set(posAlongLength + dW / 2, baseYPos + dH / 2, dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2);
        rightSideWall.castShadow = true;
        scene.add(rightSideWall);

        // Dormer roof based on style
        if (dormer.style === 'gable') {
          const dormerRoofRise = dH * 0.4;
          const dormerRoofLen = Math.sqrt(Math.pow(dW / 2, 2) + Math.pow(dormerRoofRise, 2));
          const dormerRoofAngle = Math.atan2(dormerRoofRise, dW / 2);

          const leftRoofGeom = new BoxGeometry(dormerRoofLen, 0.06, dD + 0.1);
          const leftDRoof = new Mesh(leftRoofGeom, dormerRoofMat);
          leftDRoof.position.set(posAlongLength - dW / 4, baseYPos + dH + dormerRoofRise / 2, dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2);
          leftDRoof.rotation.z = dormerRoofAngle;
          leftDRoof.castShadow = true;
          scene.add(leftDRoof);

          const rightDRoof = new Mesh(leftRoofGeom, dormerRoofMat);
          rightDRoof.position.set(posAlongLength + dW / 4, baseYPos + dH + dormerRoofRise / 2, dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2);
          rightDRoof.rotation.z = -dormerRoofAngle;
          rightDRoof.castShadow = true;
          scene.add(rightDRoof);

        } else if (dormer.style === 'shed') {
          const shedRise = dH * 0.3;
          const shedLen = Math.sqrt(dD * dD + shedRise * shedRise);
          const shedAngle = Math.atan2(shedRise, dD);

          const shedRoofGeom = new BoxGeometry(dW + 0.1, 0.06, shedLen);
          const shedRoof = new Mesh(shedRoofGeom, dormerRoofMat);
          shedRoof.position.set(posAlongLength, baseYPos + dH + shedRise / 2, dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2);
          shedRoof.rotation.x = dormer.side === 'front' ? shedAngle : -shedAngle;
          shedRoof.castShadow = true;
          scene.add(shedRoof);

        } else if (dormer.style === 'hip') {
          // Simplified hip — use a box approximation
          const hipH = dH * 0.35;
          const hipRoofGeom = new BoxGeometry(dW * 0.6, 0.06, dD + 0.1);
          const hipRoof = new Mesh(hipRoofGeom, dormerRoofMat);
          hipRoof.position.set(posAlongLength, baseYPos + dH + hipH / 2, dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2);
          hipRoof.castShadow = true;
          scene.add(hipRoof);

          // Hip side panels
          const hipSideGeom = new BoxGeometry(dW * 0.3, 0.06, dD * 0.6);
          const hipLeft = new Mesh(hipSideGeom, dormerRoofMat);
          hipLeft.position.set(posAlongLength - dW * 0.35, baseYPos + dH + hipH * 0.3, dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2);
          hipLeft.rotation.z = Math.atan2(hipH, dW * 0.3);
          hipLeft.castShadow = true;
          scene.add(hipLeft);

          const hipRight = new Mesh(hipSideGeom, dormerRoofMat);
          hipRight.position.set(posAlongLength + dW * 0.35, baseYPos + dH + hipH * 0.3, dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2);
          hipRight.rotation.z = -Math.atan2(hipH, dW * 0.3);
          hipRight.castShadow = true;
          scene.add(hipRight);

        } else if (dormer.style === 'flat') {
          const flatRoofGeom = new BoxGeometry(dW + 0.1, 0.08, dD + 0.1);
          const flatRoof = new Mesh(flatRoofGeom, dormerRoofMat);
          flatRoof.position.set(posAlongLength, baseYPos + dH + 0.04, dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2);
          flatRoof.castShadow = true;
          scene.add(flatRoof);

        } else if (dormer.style === 'eyebrow') {
          // Approximate with a curved box
          const eyebrowH = dH * 0.3;
          const segments = 8;
          for (let i = 0; i < segments; i++) {
            const t = i / (segments - 1);
            const angle = t * Math.PI;
            const h = Math.sin(angle) * eyebrowH;
            const segW = dW / segments;
            const segGeom = new BoxGeometry(segW + 0.02, 0.06, dD + 0.1);
            const seg = new Mesh(segGeom, dormerRoofMat);
            seg.position.set(
              posAlongLength - dW / 2 + segW * i + segW / 2,
              baseYPos + dH + h,
              dormer.side === 'front' ? xOffset - dD / 2 : xOffset + dD / 2
            );
            seg.castShadow = true;
            scene.add(seg);
          }
        }

        // Window
        if (dormer.hasWindow) {
          const winW = dW * 0.55;
          const winH = dH * 0.6;
          const winGeom = new BoxGeometry(winW, winH, 0.05);
          const win = new Mesh(winGeom, windowMat);
          win.position.set(posAlongLength, baseYPos + dH * 0.45, dormer.side === 'front' ? xOffset - dD - 0.05 : xOffset + dD + 0.05);
          scene.add(win);

          // Window frame
          const frameMat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
          const frameTop = new Mesh(new BoxGeometry(winW + 0.06, 0.04, 0.06), frameMat);
          frameTop.position.set(posAlongLength, baseYPos + dH * 0.45 + winH / 2, dormer.side === 'front' ? xOffset - dD - 0.05 : xOffset + dD + 0.05);
          scene.add(frameTop);
          const frameBottom = new Mesh(new BoxGeometry(winW + 0.06, 0.04, 0.06), frameMat);
          frameBottom.position.set(posAlongLength, baseYPos + dH * 0.45 - winH / 2, dormer.side === 'front' ? xOffset - dD - 0.05 : xOffset + dD + 0.05);
          scene.add(frameBottom);
        }
      }
    }

    // Mouse controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraRotation = { theta: Math.PI / 4, phi: Math.PI / 5 };
    let cameraDistance = 15;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      cameraRotation.theta -= deltaX * 0.01;
      cameraRotation.phi -= deltaY * 0.01;
      cameraRotation.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, cameraRotation.phi));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraDistance += e.deltaY * 0.01;
      cameraDistance = Math.max(6, Math.min(35, cameraDistance));
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      camera.position.x = cameraDistance * Math.sin(cameraRotation.phi) * Math.cos(cameraRotation.theta);
      camera.position.y = cameraDistance * Math.cos(cameraRotation.phi);
      camera.position.z = cameraDistance * Math.sin(cameraRotation.phi) * Math.sin(cameraRotation.theta);
      camera.lookAt(0, wallHeight / 2, 0);

      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { scene, camera, renderer };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      if (containerRef.current && renderer.domElement.parentElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [config]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-sky-100 to-cyan-200 rounded-lg overflow-hidden relative">
      {/* Instructions overlay */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-sm">
        <div className="font-semibold text-slate-900 mb-1">🎮 3D Controls:</div>
        <div className="space-y-0.5 text-slate-700">
          <div>🖱️ <strong>Rotate:</strong> Click + drag</div>
          <div>🔍 <strong>Zoom:</strong> Scroll wheel</div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-xs text-slate-600">Building</div>
            <div className="font-bold text-slate-900">{config.width}' × {config.length}'</div>
          </div>
          <div>
            <div className="text-xs text-slate-600">Pitch</div>
            <div className="font-bold text-slate-900">{config.pitch}</div>
          </div>
          <div>
            <div className="text-xs text-slate-600">Style</div>
            <div className="font-bold text-slate-900">{config.style}</div>
          </div>
          <div>
            <div className="text-xs text-slate-600">Material</div>
            <div className="font-bold text-slate-900">{config.shingleType}</div>
          </div>
          {config.hasDormers && (config.dormers || []).length > 0 && (
            <div>
              <div className="text-xs text-slate-600">Dormers</div>
              <div className="font-bold text-slate-900">{(config.dormers || []).length}</div>
            </div>
          )}
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}