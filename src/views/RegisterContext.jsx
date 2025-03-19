import { createContext, useState, useContext } from "react";

// Create the context
const RegisterContext = createContext();

// Provider component
export const RegisterProvider = ({ children }) => {
    const [registerDetails, setRegisterDetails] = useState({
        username: "",
        fullname: "",
        email: "",
        mobile: "",
        password: "",
        confirmpassword: "",
    });

    const [emailVerify, setEmailVerify] = useState(false); 

    return (
        <RegisterContext.Provider value={{ registerDetails, setRegisterDetails, emailVerify, setEmailVerify }}>
            {children}
        </RegisterContext.Provider>
    );
};

// Custom hook to use the context
export const useRegister = () => {
    return useContext(RegisterContext);
};
