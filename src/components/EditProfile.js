import { useData } from "../providers/DataProvider";
import { useHistory } from "react-router";

export const EditProfile = () => {

    const { data, setData } = useData();
    const token = data.token;

    const history = useHistory();

    if(token === ""){
        history.push("/");
    };

    return (
        <h1>Edit Profile</h1>
    );
}