import { useHistory } from "react-router";
export const UniDiv = ({ title}) => {

    const history = useHistory();
    console.log(title);
    console.log("mamahuevo");
    const handleUniversity = () => {
        history.push("/university/eci");
    }
    
    var aux = [];
    aux.push(<li className="border rounded p-3 mb-2 li-uni">
        <div>
        <h5>{title}</h5>      
        <button className="btn btn-primary" onClick={handleUniversity}>Entrar</button>
        </div>
    </li>);

    return (
        <div>
            {aux}
        </div>
        
    );
}