import { useOne, HttpError } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { Profile } from "components";

interface IProfile {
  name: string,
  avatar: string,
  address?: string,
  contactNo?: string,
  email: string,
  allProperties: Array<any> | undefined
}

const AgentProfile = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne<IProfile, HttpError>({
        resource: "users",
        id: id as string,
    });

    const myProfile = data?.data;

    if (isLoading) return <div>Agent Profile loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Profile
            _id={id ?? ''}
            type="My"
            name={myProfile?.name ?? ''}
            address={myProfile?.address ?? ''}
            contactNo={myProfile?.contactNo ?? ''}
            email={myProfile?.email ?? ''}
            avatar={myProfile?.avatar ?? ''}
            properties={myProfile?.allProperties ?? []}
        />
    );
};

export default AgentProfile;