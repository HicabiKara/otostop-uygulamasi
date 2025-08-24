"use client";

import { useEffect, useState } from "react";
import { getTrips } from "@/lib/api";
import styles from "./trips.module.css";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import TripsList from "@/components/trips/trip-list/TripsList";

export default function TripsPage() {
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchTrips() {
            try {
                setLoading(true);
                const data = await getTrips();
                setTrips(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTrips();
    }, []);

    if (loading) return <LoadingSpinner size="medium" message="İlanlar Yükleniyor..."/>
    if (error) return <div className={styles.message}>{error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Aktif İlanlar</h1>
            <TripsList trips={trips} />
        </div>
    );
}
