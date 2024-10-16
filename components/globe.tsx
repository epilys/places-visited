"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

function latLongToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

interface MarkerData {
  lat: number;
  lng: number;
  label: string;
  country: string;
}

interface ClusterData {
  lat: number;
  lng: number;
  label: string;
  country: string;
  cities: MarkerData[];
}

interface MarkerProps {
  markerData: ClusterData;
  globeRadius: number;
  isSelected: boolean;
  onClick: (cluster: ClusterData) => void;
}

function Marker({ markerData, globeRadius, isSelected, onClick }: MarkerProps) {
  const { lat, lng, label } = markerData;
  const position = useMemo(
    () => latLongToVector3(lat, lng, globeRadius),
    [lat, lng, globeRadius]
  );
  const markerRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Sprite>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (markerRef.current) {
      markerRef.current.quaternion.copy(camera.quaternion);
    }
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const labelPosition = useMemo(
    () => position.clone().multiplyScalar(1.05),
    [position]
  );

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      onClick(markerData);
    },
    [onClick, markerData]
  );

  const textTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 256;
    canvas.height = 256;
    if (context) {
      context.font = "Bold 24px Arial";
      context.fillStyle = isSelected ? "red" : "white";
      context.textAlign = "center";
      context.fillText(label, 128, 128);
    }
    return new THREE.CanvasTexture(canvas);
  }, [label, isSelected]);

  return (
    <group onClick={handleClick}>
      <group ref={markerRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={isSelected ? "red" : "orange"} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
      <sprite ref={textRef} position={labelPosition} scale={[0.5, 0.5, 1]}>
        <spriteMaterial map={textTexture} />
      </sprite>
    </group>
  );
}

interface GlobeProps {
  locations: MarkerData[];
}

export function Globe({
  locations,
  onSelectCluster,
}: GlobeProps & { onSelectCluster: (cluster: ClusterData | null) => void }) {
  const globeRef = useRef<THREE.Mesh>(null);
  const markersRef = useRef<THREE.Group>(null);
  const globeRadius = 2;
  const [selectedCluster, setSelectedCluster] = useState<ClusterData | null>(
    null
  );
  const [isRotating, setIsRotating] = useState(true);

  const earthTexture = useLoader(THREE.TextureLoader, "/globe-texture.jpg");

  const clusteredLocations = useMemo(() => {
    const clusters: { [key: string]: ClusterData } = {};

    for (const location of locations) {
      if (!clusters[location.country]) {
        clusters[location.country] = {
          lat: location.lat,
          lng: location.lng,
          label: location.country,
          country: location.country,
          cities: [],
        };
      }
      clusters[location.country].cities.push(location);
    }

    return Object.values(clusters).map((cluster) => ({
      ...cluster,
      label: `${cluster.country} (${cluster.cities.length})`,
      lat:
        cluster.cities.reduce((sum, city) => sum + city.lat, 0) /
        cluster.cities.length,
      lng:
        cluster.cities.reduce((sum, city) => sum + city.lng, 0) /
        cluster.cities.length,
    }));
  }, [locations]);

  useFrame(() => {
    if (globeRef.current && markersRef.current && isRotating) {
      globeRef.current.rotation.y += 0.001;
      markersRef.current.rotation.copy(globeRef.current.rotation);
    }
  });

  const handleMarkerClick = useCallback(
    (clickedCluster: ClusterData) => {
      setSelectedCluster((prevSelected) => {
        const newSelected =
          prevSelected === clickedCluster ? null : clickedCluster;
        setIsRotating(!newSelected);
        onSelectCluster(newSelected);
        return newSelected;
      });
    },
    [onSelectCluster]
  );

  const handleGlobeClick = useCallback(() => {
    setSelectedCluster(null);
    setIsRotating(true);
    onSelectCluster(null);
  }, [onSelectCluster]);

  return (
    <group onClick={handleGlobeClick}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[globeRadius, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      <group ref={markersRef}>
        {clusteredLocations.map((cluster, index) => (
          <Marker
            key={index}
            markerData={cluster}
            globeRadius={globeRadius}
            isSelected={selectedCluster === cluster}
            onClick={handleMarkerClick}
          />
        ))}
      </group>
    </group>
  );
}

export function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    const sunPosition = calculateSunPosition();
    if (sunRef.current) {
      sunRef.current.position.copy(sunPosition);
    }
    if (lightRef.current) {
      lightRef.current.position.copy(sunPosition);
    }
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      <directionalLight
        ref={lightRef}
        color="#FFF5B6"
        intensity={1.5}
        castShadow
      />
    </group>
  );
}

function calculateSunPosition() {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const timeOfDay = now.getHours() / 24 + now.getMinutes() / 1440;

  const declination =
    -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * (Math.PI / 180));

  const declinationRad = declination * (Math.PI / 180);
  const timeRad = timeOfDay * 2 * Math.PI;

  const x = Math.cos(declinationRad) * Math.cos(timeRad);
  const y = Math.sin(declinationRad);
  const z = Math.cos(declinationRad) * Math.sin(timeRad);

  return new THREE.Vector3(x, y, z).normalize().multiplyScalar(10);
}
