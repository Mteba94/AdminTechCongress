export interface UserResponse {
  userId: number;
  pnombre: string;
  snombre: string;
  papellido: string;
  sapellido: string;
  nombreCompleto: string;
  tipoParticipanteId: number;
  tipoParticipanteNombre?: string;
  email: string;
  telefono: string;
  fechaNacimiento: Date;
  tipoIdentificacionId: number;
  tipoIdentificacionNombre?: string;
  numeroIdentificacion: string;
  nivelAcademico: number;
  semestre: number;
  estado: number;
  estadoDescripcion: any;
  icView: string;
  icEdit: string;
  icDelete: string;
}



