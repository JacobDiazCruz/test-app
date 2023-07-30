export type ClientForm = FormStep[];

export interface FormStep {
  step: string;
  fields: Field[]; 
}
export interface Field {
  label: string;
  field: string;
  type: string;
  value: string;
  validator?: (v: string) => boolean;
  error?: boolean;
  helperText?: string;
}