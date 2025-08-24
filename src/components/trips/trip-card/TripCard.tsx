import Link from "next/link";
import styles from "./TripCard.module.css";

interface TripCardProps {
  trip: any;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Link href={`/trips/${trip._id}`} className={styles.card}>
      <div className={styles.info}>
        <h3>{`${trip.from} → ${trip.to}`}</h3>
        <p>
          <strong>Tarih:</strong> {new Date(trip.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Ücret:</strong> {trip.price} ₺
        </p>
        {trip.seatsAvailable !== 0 ? <p>
          <strong>Boş Koltuk:</strong> {trip.seatsAvailable}
        </p> : <p>
          <strong style={{color:"red"}}>Bu yolculuk için boş koltuk kalmamıştır.</strong> 
        </p>}

      </div>
    </Link>
  );
}
