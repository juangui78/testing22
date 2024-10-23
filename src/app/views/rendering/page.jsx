'use client'
import { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stats, useProgress } from '@react-three/drei'
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image.js';
import {Switch} from "@nextui-org/react";
import {MoonIcon} from "../../components/Icons/MoonIcon";
import {SunIcon} from "../../components/Icons/SunIcon";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";




export default function Rendering () {

    const [light, setLight] = useState('lobby')

    const changeLight = () => {
        setLight(prevLight => prevLight === 'lobby' ? 'sunset' : 'lobby');
        
    }

    return (
        <div className=" flex flex-col justify-center items-center h-[100vh]">
            
            <Suspense fallback={<div>Loading...</div>}>
            <div className='flex w-[100%] justify-center h-[100vh] flex-col xl:flex-row'>
                
                    <div className=' w-[85%]'>
                        <Canvas shadows>
                            
                            <ambientLight intensity={1} />
                            <directionalLight color="white" position={[0, 2, 50]} castShadow/>
                            
                            
                            
                            <OrbitControls  enablePan={true}  autoRotate autoRotateSpeed={0.1}/>
                            <Environment preset={light} background blur/>
                            
                            
                        </Canvas>
                    </div>
                
                <div className=' h-full w-[15%] flex flex-col gap-2 items-center p-6'>
                    <Card isFooterBlurred
                    radius="lg"
                    className="border-none ">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">Modelo 3D</p>
                            <small className="text-default-500">1 Item</small>
                            <h4 className="font-bold text-large">Tosti Arepas</h4>
                        </CardHeader>
                        <CardBody className='overflow-visible py-4'>
                            <Image src='/images/tosti.jpg' width={500} height={400} />
                        </CardBody>
                        
                    </Card>
                    <div className='py-4 '>
                        
                        <h3 className='max-w-lg overflow-hidden whitespace-normal'>
                        Las Tosti Arepas son un snack venezolano crujiente y sabroso, de textura ligera y aireada por dentro y dorada por fuera. </h3><br /> 
                        <h3>Perfectas para cualquier ocasión, puedes disfrutarlas con mantequilla, mermelada, queso, jamón, o rellenarlas con tus ingredientes favoritos. </h3>
                        <br />
                        <h3 className='italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h3>      
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
                            <div className=' pl-3' >
                                <small>130 Gramos</small>
                                <br />
                                <small>Sabor a maíz</small>
                                <br />
                                <small>Alto: 10cm</small>
                                <br />
                                <small>Ancho: 5cm</small>
                                <br />
                                <Link href={'/'} className=' bg-slate-100 py-2 px-7 rounded hover:bg-slate-400'>Home</Link>
                            </div>
                        </div>
                        
                    </div>
                 
                </div>   
            </div>
            </Suspense>
        </div>
    )
}