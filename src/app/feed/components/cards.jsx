import { Image } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/api/auth/[...nextauth]/route";
import { dbConnected } from "@/utils/mongoose";

import Proyect from "@/models/proyect";

import style from "../styles/feed.module.css";
import { ZoomIcon } from "@/components/Icons/zoomIcon";
import { EditIconV2 } from "@/components/Icons/EditIconV2";
import { Tooltip } from "@nextui-org/react";

import { TimelineIco } from "@/components/Icons/timeline";
import { encrypt } from "@/lib/crypto";
import Link from 'next/link';

dbConnected();

export default async function Feed({search, options}){
  const session = await getServerSession(AuthOptions);
  const { user } = session;
  const data = await Proyect.find({idCompany : user.id_company });
  console.log('proyectos encontrados: ' + data);
  
  return ( 
    <>
    
    {data.length > 0 ? data.map((item) => {
      return (
        <div className={`mx-4 p-4  .. ${style.cards}`} key={item._id}> 
          <div className=" rounded-2xl">
            <img src="/images/imagen___.png" />
          </div>
          <div className={style.footerCards} >
            <div>
              <h1 className=""> {item.name}</h1>
            </div>
            <div className=" text-sm">
              {/* { 'item?.description '} */} Descripcion medianamente largaAAAAA bueno quew hamrbe para hacer la preyabaaa
            </div>
            <div className={style.buttonsCards}>
              <div  className={style.divToolstip}>
                <Link href={{ pathname : `/views/timeline`, query : { ind : encrypt(item.id) }}}  passHref legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer">
                    <Tooltip
                      delay={500}
                      content={
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">Resumen</div>
                          <div className="text-tiny">Resumen del proyecto</div>
                        </div>
                      }
                      >
                      <TimelineIco />
                    </Tooltip>
                  </a>
                </Link>
               </div>
               <div className={style.divToolstip}>
               <Link href={{ pathname : `/views/model`, query : { id : encrypt(item.id) }}}  >
                
                <Tooltip delay={200} content={
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">Visualizar</div>
                      <div className="text-tiny">Visualzar el modelo 3d</div>
                    </div>
                  }>
                    <ZoomIcon />
                </Tooltip>
                
                </Link>
               </div>
               <div className={style.divToolstip}>
                <Tooltip delay={100} content={
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">Editar</div>
                      <div className="text-tiny">Editar la informacion del proyecto</div>
                    </div>
                  }>
                    <EditIconV2  />
                  </Tooltip>
               </div>
            </div>
          </div>
        </div>
      );
    }) : <div className=" flex flex-col w-full justify-center items-center m-[39px]">
      <h2 className=" font-light italic ">Aun no tienes modelos escaneados.</h2>
      <Image src="/images/oops.png" alt="oops" width={200} height={200} />
    </div> }
    
    </>
  )

}