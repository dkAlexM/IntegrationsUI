import React from "react";
import { useState, useEffect } from "react";

const Counter = ({incrementValue}) => {
    const [count, setCount] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count => count + incrementValue);
        }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, [incrementValue]);

    const increment = () => {
        setCount(0);
    };

    return (

        <div>

            <h4>Contador: {count}</h4>
            <button onClick={increment}>Incrementar</button>

        </div>

    );
};

export default Counter;