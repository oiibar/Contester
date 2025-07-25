import React, { useState } from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import {fetchContest, registerToContest} from "api/api";
import { useFetching } from "hooks/useFetching";
import { useAuth } from "hooks/auth/AuthProvider";

const RegisterButton = ({ contestData, setContestData }) => {
    const { user, token } = useAuth();
    const [participantCount, setParticipantCount] = useState(
        Array.isArray(contestData.participants) ? contestData.participants.length : 0
    );

    const isRegistered = user && Array.isArray(contestData?.participants)
        ? contestData.participants.some(p => p.id === user.id)
        : false;


    const { fetching: register, isLoading, error } = useFetching(async () => {
        try {
            await registerToContest(contestData.id, token);
            const updatedContest = await fetchContest(contestData.id, token);
            setContestData(updatedContest);
            setParticipantCount(updatedContest.participants?.length || 0);
        } catch (e) {
            throw new Error("You are already registered for this contest.");
        }
    });

    return (
        <>
            {
                !isRegistered ? (
                <MyButton
                    className="register-button"
                    onClick={register}
                    disabled={isLoading || isRegistered}
                    >
                    Register ({participantCount})
                </MyButton>)
                    : (<p>Participants: {participantCount}</p>)
            }
            {error && <p className="error-text">{error}</p>}
        </>
    );
};

export default RegisterButton;
