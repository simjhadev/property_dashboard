export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    handleClick?: () => void
}

export interface ProfileProps {
    _id: string,
    type?: string,
    name: string,
    address?: string,
    contactNo?: string,
    avatar: string,
    email: string,
    properties: Array | undefined
}

export interface PropertyProps {
    _id: string,
    addressLine1: string,
    addressLine2?: string,
    city: string,
    state: string,
    zipcode:string,
    price: string,
    photo: string,
    creator: string
}

export interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    propertyImage: { name: string, url: string },
    errors?: any,
}

export interface AgentFormProps {
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    errors?: any,
}