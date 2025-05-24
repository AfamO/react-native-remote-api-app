import UserFetched from "../app/(tabs)/type-def";
import {View, Text} from "react-native";
type ShowUserProps = {
    userFetched: UserFetched;
}
export default function ShowUser({ userFetched }: ShowUserProps) {
    if (userFetched.error) { 
        <Text style={{ color: 'red', padding: 10 }}>
        Error fetching user data: {userFetched.error}</Text>
    }
    else if (userFetched.user) {
        const user = userFetched.user ;
        return (
            <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            User data fetched from remote source:</Text>
            <Text>Id: {user.id}</Text>
            <Text>Name: {user.name}</Text>
            <Text>Username: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Street address: {user.address.street}</Text>
            <Text>Phone: {user.phone}</Text>
            <Text>Website: {user.website}</Text>
            <Text>Company name: {user.company.name}</Text>
            </View>);
        }
    }