import { useGetIdentity, useOne, HttpError } from "@refinedev/core";

import { Profile } from "components";

interface IProfile {
  name: string,
  avatar: string,
  address?: string,
  contactNo?: string,
  email: string,
  allProperties: Array<any> | undefined
}

const MyProfile = () => {
    const { data: user } = useGetIdentity<{[key: string]: any} | null>();
    
    const { data, isLoading, isError } = useOne<IProfile, HttpError>({
        resource: "users",
        id: user?.userid,
    });
    //console.log(user);
    const myProfile = data?.data;

    if (isLoading) return <div>Profile loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Profile
            type="My"
            _id={user?.userid ?? ''}
            name={myProfile?.name ?? ''}
            address={myProfile?.address ?? ''}
            contactNo={myProfile?.contactNo ?? ''}
            email={myProfile?.email ?? ''}
            avatar={myProfile?.avatar ?? ''}
            properties={myProfile?.allProperties ?? []}
        />
    );
};

export default MyProfile;