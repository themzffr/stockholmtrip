
import { createContext, useContext } from "react";

export const ClickedContext = createContext();

export const useClicked = () => {

    return useContext(ClickedContext);






}

