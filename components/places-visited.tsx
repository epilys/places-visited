"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { Globe, Sun } from "@/components/globe";
import { ScrollArea } from "@/components/ui/scroll-area";

type LocationType = {
  lat: number;
  lng: number;
  label: string;
  country: string;
};

interface PlacesVisitedProps {
  locations: LocationType[];
}

interface ClusterData {
  lat: number;
  lng: number;
  label: string;
  country: string;
  cities: Array<{ label: string }>;
}

export function PlacesVisited({ locations }: PlacesVisitedProps) {
  const [selectedCluster, setSelectedCluster] = useState<ClusterData | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectCluster = (cluster: ClusterData | null) => {
    setSelectedCluster(cluster);
    setIsDrawerOpen(!!cluster);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute top-20 left-0 right-0 z-20 bg-black bg-opacity-50 p-4">
        <h1 className="text-white text-xl sm:text-2xl font-bold text-center">
          places I&apos;ve sauntered about
        </h1>
      </div>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Suspense
          fallback={<div className="text-white text-center">Loading...</div>}
        >
          <Canvas camera={{ position: [0, 0, 6], fov: 60 }} shadows>
            <ambientLight intensity={0.5} />
            <Sun />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Globe
              locations={locations}
              onSelectCluster={handleSelectCluster}
            />
            <OrbitControls enablePan={false} />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={3}
              maxDistance={10}
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.5}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="border-b border-gray-200 flex country-name items-center justify-center">
            <DrawerTitle>{selectedCluster?.country}</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <ScrollArea className="h-[30vh] p-4">
            <div className="space-y-2">
              {selectedCluster?.cities.map((city, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {city.label}
                </p>
              ))}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function FallbackComponent({ error }: { error: Error }) {
  return (
    <div className="text-center text-red-500">
      <h1>An error occurred:</h1>
      <p>{error.message}</p>
    </div>
  );
}
