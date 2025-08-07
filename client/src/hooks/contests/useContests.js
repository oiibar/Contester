import { useState, useEffect } from "react";
import { useFetching } from "../useFetching";
import { fetchContests } from "api/api";

export const useContests = (token) => {
    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);
    const [ongoing, setOngoing] = useState([]);

    const { fetching, isLoading, error } = useFetching(async () => {
        if (token) {
            const data = await fetchContests(token);

            const currentDate = new Date();

            setUpcoming(data.filter(c => new Date(c.startDate) > currentDate));
            setOngoing(data.filter(c => new Date(c.startDate) <= currentDate && new Date(c.endDate) >= currentDate));
            setPast(data.filter(c => new Date(c.endDate) < currentDate));
        } else {
            setUpcoming([]);
            setOngoing([]);
            setPast([]);
        }
    });

    // const { fetchingContest } = useFetching(async () => {
    //     if (token) {
    //         const data = await fetchContest(token);
    //     }
    // })

    useEffect(() => {
        fetching();
    }, [token]);

    return { upcoming, ongoing, past, isLoading, error };
};
