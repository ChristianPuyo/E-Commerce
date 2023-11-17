import { useGetUserByIdQuery } from "../../libs/redux/services/usersApi";
import { Spin, Alert } from "antd";

const UserImage = ({ id }) => {

    const { data: user, isLoading, isError } = useGetUserByIdQuery(id);

    if (isLoading) {
        return <Spin><div className="content"/></Spin>;
    }

    if (isError || !user) {
        return <Alert message="Error" description="" type="error" showIcon/>;
    }

    return <img src={user.image} alt={user.name} />;

}

export default UserImage;