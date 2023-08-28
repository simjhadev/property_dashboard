import { useGetIdentity } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { FieldValues } from 'react-hook-form';
import AgentProfileForm from 'components/common/AgentProfileForm';
import { useNavigate } from "react-router-dom";
//import { ProfileProps } from 'interfaces/common';
//import { useParams } from "react-router-dom";
import { useParsed } from "@refinedev/core";

const EditMyProfile = () => {
    const { data: user } = useGetIdentity<{[key: string]: any} | null>();
    const { id } = useParsed();
    const navigate = useNavigate();
    //const { id } = useParams();
    const { refineCore: { onFinish, formLoading, redirect }, handleSubmit, register, formState: { errors }  } = useForm({
        refineCoreProps: {
            redirect: false,
            resource: "users",
            id,
        },
    });

    
    const onFinishHandler = async (data: FieldValues) => {
       await onFinish({ ...data, email: user?.email });
       navigate(`/my-profile`);
    };

    return(
        <AgentProfileForm
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            errors={errors}
        />
    );
}

export default EditMyProfile;