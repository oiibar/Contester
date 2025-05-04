import {useEffect, useState} from "react";
import {calculateDuration} from "utils/dateUtils";

const useContestDurations = (contests) => {
    const [durations, setDurations] = useState({});

    useEffect(() => {
        const updateDurations = () => {
            const newDurations = {};
            contests.forEach((contest) => {
                newDurations[contest.id] = calculateDuration(
                    new Date(contest.startDate),
                    new Date(contest.endDate)
                );
            });
            setDurations(newDurations);
        };

        updateDurations();
        const intervalId = setInterval(updateDurations, 60000);
        return () => clearInterval(intervalId);
    }, [contests]);

    return durations;
};

export default useContestDurations;