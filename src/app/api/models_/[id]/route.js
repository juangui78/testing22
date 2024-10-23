import { dbConnected } from "@/utils/mongoose";
import Model from "@/models/models";
import Proyect from "@/models/proyect";
import { decrypt } from "@/lib/crypto";
import { NextResponse } from "next/server";

dbConnected();

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const findProyect = await Proyect.findById(decrypt(id), {_id : 1});

    if (findProyect){
      const idProyect = findProyect?._id;
      const filterData = {name: 1, description: 1, _id : 1, creation_date: 1}
      const findModels = await Model.find({idProyect : idProyect}, filterData).sort({ creation_date : -1 });

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

      const itemsTimeLine = findModels.map(item => {
        return {
          title:  formatDate(item.creation_date),
          cardTitle: item.name,
          cardSubtitle : item.description
        }
      });

      return NextResponse.json(itemsTimeLine);
    }
  
    return NextResponse.json({
      message : 'Error finded proyect'
    });
  
  } catch (error) {
    return NextResponse.json({message: 'Invalid Id'}).status(500);
  }
}