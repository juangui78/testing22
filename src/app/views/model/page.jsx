'use client'
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useEffect } from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SunIcon } from "../../components/Icons/SunIcon";
import { MoonIcon } from "../../components/Icons/MoonIcon";
import {Slider} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import axios from "axios";




const ModelComponent = ({ gltf }) => {
    return (
      <Suspense fallback={null}>
        <primitive object={gltf.scene} scale={0.4} />
      </Suspense>
    );
  };



export default function App() {

    const [light, setLight] = useState('lobby')
    const [quality, setQuality] = useState(0.6)
    const searchParams = useSearchParams();
    const idProyect = searchParams.get("id");
    const [currentProject, setCurrentProject] = useState(null);
    const [gltf, setGltf] = useState(null);

    const changeQuality = () => {
        setQuality()
    }

    const changeLight = () => {
        setLight(prevLight => prevLight === 'lobby' ? 'sunset' : 'lobby');
        
    }

    console.log(currentProject);

    const getModel = async () => {
        try {
            const response = await axios.get(`../api/visualizer/${idProyect}`)
            if (response.data != undefined) {
                setCurrentProject(response.data)
                
                
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (date) => {
        const opciones = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Para formato de 24 horas
        };
        return new Date(date).toLocaleString("es-ES", opciones);
      };

    
    
    useEffect(() => {
        getModel();
    }, [])

    useEffect(() => {
        if (currentProject) {
          const modelLocation = currentProject?.model?.folder;
          if (modelLocation) {
            const loader = new GLTFLoader();
            loader.load(`/modelers${modelLocation}/scene.gltf`, (gltfLoaded) => {
              setGltf(gltfLoaded);
            });
          }
        }
      }, [currentProject]);
    

  return (
    <div className=" flex flex-col justify-center items-center h-[100vh] overflow-hidden ">

        <div className=" pointer-events-none absolute z-50 flex items-start w-full h-full p-4">
                <Link href='/feed'>
                    <button type="button" class=" pointer-events-auto flex justify-start w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-transparent border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                        <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Feed</span>
                    </button>
                </Link>
            
        </div>
        

        <div className='flex md:w-[100%] justify-center md:h-[100vh] flex-col sm:flex-row'>
            <div className='flex md:w-[85%] md:h-[100%] sm:w-[616px] sm:h-[700px]'> {/* Aquí se ajusta el tamaño del canvas */}
                <Canvas dpr={quality}>
                    <Suspense fallback={null}>
                        <gridHelper args={[500, 500, 'gray']}/>
                        <axesHelper args={[100, 10, 10]} />
                        <ambientLight intensity={1} />
                        <directionalLight color="white" position={[0, 2, 50]} />
                        {gltf && <ModelComponent gltf={gltf} />}
                        <OrbitControls />
                        <Environment preset={light} background blur backgroundBlurriness />
                    </Suspense>
                </Canvas>
            </div>

            <div className=' md:h-full md:w-[18%] flex flex-col md:gap-2 items-center md:p-4 sm:p-0 sm:gap-0 sm:w-[100px]'>
                    
                    <div className='py-4 md:m-w-[295px] sm:min-w-[10px]'>
                        
                        <h3>
                            {currentProject?.description}
                        </h3>
                        <br />
                        <h3 className='italic text-sm'>{formatDate(currentProject?.creation_date)} </h3>
                        <h3 className='italic text-sm'>Fecha de Subida: </h3>        
                            <Switch
                                defaultSelected
                                size="lg"
                                color="warning"
                                thumbIcon={({ isSelected, className }) =>
                                isSelected ? (
                                    <SunIcon className={className} />
                                ) : (
                                    <MoonIcon className={className} />
                                )
                                }
                                

                                className=' py-4'
                                onChange={changeLight}
                            >
                                Iluminación
                            
                            </Switch>
                    
                        <div>
                            <p className="text-tiny uppercase font-bold">Detalles</p>
                            

                            <div className=" md:gap-8 md:p-9 sm:gap-3 sm:p-3">
                                <Slider size="lg"  showSteps maxValue={1} minValue={0} step={0.2} color="warning"
                                label="Calidad"  marks={[
                                    {
                                    value: 0,
                                    label: "Peor Calidad",
                                    },
                                    {
                                    value: 50,
                                    label: "50%",
                                    },
                                    {
                                    value: 1,
                                    label: "Maxima Calidad",
                                    },
                                ]}
                                
                                value={quality}
                                onChange={setQuality}

                                >

                                </Slider>
                            </div>
                        </div>
                        
                    </div>
                 
                </div> 
        </div>
    </div>
  );
}