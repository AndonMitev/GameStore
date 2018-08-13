export class RegisterInputModel {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public age: number,
    public countryData: {
      country: string;
      city: string;
      state: string;
      zipcode: string;
    },
    public streetAddress: [
      {
        street: string;
        apartment: string;
        phoneNumber: string;
      }
    ]
  ) { }
}
