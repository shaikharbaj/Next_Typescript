import { useEffect, useState } from "react";

const useDebounce = (value: string, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Update debouncedValue after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clear timeout if value changes before the delay expires
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
