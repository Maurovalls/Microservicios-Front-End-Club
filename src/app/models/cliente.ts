import { Actividad } from "./actividad";
import { Cuota } from "./cuota";

export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    descripcion: string;
    createAt: string;
    fotoHashCode: number;
    cuotas: Cuota[]=[];
    actividades: Actividad[]=[];
}
