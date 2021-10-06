import { DoctorDTO } from "./doctor.dto";

export class PatientDTO {
    cpf: string | undefined;
    name: string | undefined;
    phone: string | undefined;
    address: string | undefined;
    number: string | undefined;
    neighborhood: string | undefined;
    complement: string | undefined;
    city: string | undefined;
    cep: string | undefined;
    state: string | undefined;
    obs: string | undefined;
    doctor: DoctorDTO | undefined;
    status: string | undefined;
    createdAt: Date | undefined;
}