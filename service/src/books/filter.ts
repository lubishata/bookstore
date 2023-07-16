export class Filter {
  property: string;
  value?: string;

  constructor(property: string, value: string | undefined) {
    this.property = property;
    this.value = value;
  }
}
