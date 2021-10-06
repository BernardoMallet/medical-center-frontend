import { ResultSet } from "../pageble/result-set";
import { PatientDTO } from "../patient.dto";

export class PatientResult extends ResultSet {
    content: PatientDTO[]=[];
}