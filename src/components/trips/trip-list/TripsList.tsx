import TripCard from "../trip-card/TripCard";
import styles from "./TripsList.module.css";

interface TripsListProps {
  trips: any[];
}

export default function TripsList({ trips }: TripsListProps) {
  if (trips.length === 0) {
    return <p className={styles.empty}>Şu anda aktif ilan bulunmamaktadır.</p>;
  }

  return (
    <div className={styles.grid}>
      {trips.map((trip) => (
        <TripCard key={trip._id} trip={trip} />
      ))}
    </div>
  );
}
