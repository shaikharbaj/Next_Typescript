import { useEffect, useState } from "react";
const useDebounce = (value:string, delay = 500) => {
    const [debauncedValue, setDebaouncedValue] = useState(value)
    useEffect(() => {
        const id = setTimeout(() => {
            setDebaouncedValue(value)
        }, delay);

        return () => {
            clearTimeout(id);
        }

    }, [value, delay])
    return debauncedValue;
}

export default useDebounce