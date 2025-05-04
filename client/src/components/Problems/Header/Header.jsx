import React, { useState } from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import './Header.scss'
import { formatDate } from "utils/dateUtils";
import { useFetching } from "hooks/useFetching";
import { useAuth } from "hooks/auth/AuthProvider";

const Header = ({ contestData, updateContest }) => {
    const { token } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);

    const { fetching, isLoading, error } = useFetching(async () => {
        if (token) {
            const updatedContest = {
                ...contestData,
                participants: contestData.participants + 1,
            };
            await updateContest(contestData.id, updatedContest, token);
        }
    });

    const handleRegister = async () => {
        setIsRegistering(true);
        await fetching();
        setIsRegistering(false);
    };

    return (
        <div className="contest-header">
            <div>
                <h1 className="contest-title">{contestData.title || "Contest Title"}</h1>
                <p className="contest-time">{formatDate(contestData.endDate) ? `Ends: ${formatDate(contestData.endDate)}` : "No end date"}</p>
            </div>
            {error && <p className="error-message">{error}</p>}
            <MyButton
                className="register-button"
                onClick={handleRegister}
                disabled={isRegistering || isLoading}
            >
                {isRegistering || isLoading ? "Registering..." : `Register ${contestData.participants}`}
            </MyButton>
        </div>
    );
};

export default Header;
