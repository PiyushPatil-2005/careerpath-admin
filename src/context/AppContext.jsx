import { createContext } from "react";

export const AppContext = createContext();


const AppContextProvider = (props) => {

    const currency = '₹'

    const calculateAge = (dob) => {
        if (!dob) return "-";

        // Try to parse the date
        let birthDate = new Date(dob);

        // If invalid (e.g. DD-MM-YYYY), manually split
        if (isNaN(birthDate.getTime())) {
            const parts = dob.split("-");
            if (parts.length === 3) {
                // If format is DD-MM-YYYY → reorder to YYYY-MM-DD
                birthDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            }
        }

        if (isNaN(birthDate.getTime())) {
            return "-"; // still invalid
        }

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    }

    const months = [" ", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const value = {
        calculateAge,
        slotDateFormat,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
