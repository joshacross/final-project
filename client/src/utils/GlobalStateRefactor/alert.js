import { useState, createContext } from "react";

export const AlertContext = createContext;

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState({
        text: '',
        type: 'success',
        active: false,
    });

    const resetAlert = () =>
        setAlert({
            text: '',
            type: 'success',
            active: false,
        });

    const sendAlert = text =>
        setAlert({
            text,
            type: 'success',
            active: false,
        });
    
    const sendError = text =>
        setAlert({
            text,
            type: 'success',
            active: false,
        });

    return (
        <AlertContext.AlertProvider
            value={{ alert, setAlert, sendAlert, sendError, resetAlert }}
        >
            {children}
        </AlertContext.AlertProvider>
    );
}