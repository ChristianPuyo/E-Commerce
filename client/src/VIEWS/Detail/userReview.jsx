import { useGetUserByIdQuery } from '../../libs/redux/services/usersApi'

const UserReview = ({ id }) => {
    const { data: user } = useGetUserByIdQuery(id);
  
    if (user) {
      return <h4>{`${user.name} ${user.lastName}`}</h4>;
    } else {
      return <h4>Usuario</h4>;
    }
  }
  
  export default UserReview;