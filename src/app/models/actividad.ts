import { Horario } from "./horario";

export class Actividad {
    id: number;
    nombre: string;
    createAt: string;
    horarios: Horario[]=[];
}
