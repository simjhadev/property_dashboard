import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    propertyType: string,
    location: string,
    price: number | undefined,
}

export interface PropertyCardProps {
  id?: BaseKey | undefined,
  addressLine1: string,
  addressLine2?: string,
  city: string,
  state: string,
  zipcode:string,
  price: string,
  photo: string,
}
