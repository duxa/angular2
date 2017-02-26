export class Association {
  constructor(
    public RegNum: number,
    public DateReg: date,
    public Name: string,
    public VudName: string,
    public Edrpou: number,
    public Adress: string,
    public Phone: string,
    public Zasnovn: string[],
    public Government: string[],
    public Kved: string,
    public License: number
  ) { }
}