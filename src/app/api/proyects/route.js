import { dbConnected } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/users";
import Proyect from "@/models/proyect";

import { z } from "zod";

dbConnected();

const proyectSchema = z
  .object({
    name : z.string().max(60),
    m2 : z.number(),
    description : z.string().max(300),
    dateInit : z.string().date(),
    dateFinish : z.string().date(),
    department : z.string().max(60),
    city : z.string().max(60) ,
    address : z.string().max(300) ,
    clientNames : z.string().max(100),
    clientLastNames : z.string().max(100),
    clientEmail : z.string().email(),
    clientTel : z.string().max(10).min(10),
    id_user : z.string()
  });


export async function POST(request) {
  try {
    const getData = await request.json();
    const result = proyectSchema.safeParse(getData);

    if (!result) return NextResponse.json({
      message : 'type of data not expected'
    });

    const { id_Company } = await User.findById(getData?.id_user, {id_Company: 1}); // get id company

    delete getData.id_user; //delete key id_user is not in the model
    getData.idCompany = id_Company;

    const newProyect = new Proyect(getData);
    const saveNewProyect = await newProyect.save();

    if (!saveNewProyect) return NextResponse.json({
      message : 'data can not be saved'
    })

    return NextResponse.json({
      message : 'ok'
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: 'error code'
    })
  }
}