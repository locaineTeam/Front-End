import { useData } from "../providers/DataProvider";

export const Messages = () => {

    const { data, setData } = useData();
    const user = data.user;

    const handleClick = () => {
        console.log(user);
    };

    return (
        <>
        <h1>Messages</h1>
        <button onClick={handleClick}>submit</button>
        </>
    );
}