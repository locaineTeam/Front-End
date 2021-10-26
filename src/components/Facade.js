import { useData } from "../providers/DataProvider";
import { useHistory } from "react-router";

export const Facade = () => {

    const { data, setData } = useData();
    const token = data.token;

    const history = useHistory();

    if(token === ""){
        history.push("/");
    };

    return (
        <h1>Facade</h1>
    );
}