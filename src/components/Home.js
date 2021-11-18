import { HeaderContent } from "./HeaderContent";
import { useHistory } from "react-router";

export const Home = () => {

    const history = useHistory();

    const handleUniversity = () => {
        history.push("/university/eci");
    }

    return(
        <>
        <HeaderContent/>
        <section className="homepage py-3">
            <div className="subHomepage mx-auto p-2 rounded">
                <h2>Universidades</h2>
                <ul className="p-0">
                    <li className="border rounded p-3 mb-2 li-uni">
                        <div>
                            <h5>Escuela Colombiana de Ingenieria</h5>
                            <p>eci</p>
                            <button className="btn btn-primary" onClick={handleUniversity}>Entrar</button>
                        </div>
                    </li>
                    <li className="border rounded p-3 li-uni">
                        <div>
                            <h5>Escuela Colombiana de Ingenieria</h5>
                            <p>eci</p>
                            <button className="btn btn-primary">Entrar</button>
                        </div>
                    </li>
                </ul>

            </div>
        </section>
        </>
    );
}