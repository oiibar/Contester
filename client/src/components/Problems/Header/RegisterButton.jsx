import React, { useState } from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import { registerToContest } from "api/api";
import { useFetching } from "hooks/useFetching";
import { useAuth } from "hooks/auth/AuthProvider";

const RegisterButton = ({ contestData, setContestData }) => {
    const { user, token } = useAuth();
    const [participantCount, setParticipantCount] = useState(
        Array.isArray(contestData.participants) ? contestData.participants.length : 0
    );

    const isRegistered = contestData.participants?.some(p => p.id === user?.id);

    const { fetching: register, isLoading, error } = useFetching(async () => {
        try {
            await registerToContest(contestData.id, token);
            setContestData(prev => ({
                ...prev,
                participants: [...(prev.participants || []), user],
            }));
            setParticipantCount(prev => prev + 1);
        } catch (e) {
            throw new Error("You are already registered for this contest.");
        }
    });

    if (isRegistered) {
        return <p>Participants: {participantCount}</p>;
    }

    return (
        <>
            <MyButton
                className="register-button"
                onClick={register}
                disabled={isLoading || isRegistered}
            >
                {isLoading ? "Registering..." : `Register (${participantCount})`}
            </MyButton>
            {error && <p className="error-text">{error}</p>}
        </>
    );
};

export default RegisterButton;
