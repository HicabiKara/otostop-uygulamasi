"use client";

import { useEffect, useState } from "react";
import {getSentTripRequests} from "@/lib/api"
import styles from "./myTripRequestsList.module.css";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { statusLabels } from "@/lib/statusLabels";

interface TripRequest {
  _id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  driverId: {
    name: string;
    image?: string;
  };
  tripId: {
    from: string;
    to: string;
    date: string;
    price: number;
  };
}

export default function MyTripRequestsList() {
  const [requests, setRequests] = useState<TripRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await getSentTripRequests();
        setRequests(data.items);
      } catch (err: any) {
        setError(err.message || "Talepler alınırken hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  if (loading) return <LoadingSpinner message="Talepler yükleniyor..." />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (requests.length === 0)
    return <div className={styles.empty}>Henüz herhangi bir ilana talepte bulunmadınız.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gönderdiğim Talepler</h2>
      <ul className={styles.list}>
        {requests.map((req) => (
          <li key={req._id} className={styles.item}>
            <div className={styles.driver}>
              <img
                src={req.driverId.image}
                alt={req.driverId.name}
                className={styles.avatar}
              />
              <span className={styles.name}>{req.driverId.name}</span>
            </div>
            <div className={styles.tripInfo}>
              <span>
                {req.tripId.from} → {req.tripId.to}
              </span>
              <span>{new Date(req.tripId.date).toLocaleDateString()}</span>
              <span>{req.tripId.price}₺</span>
            </div>
            <span
              className={`${styles.status} ${styles[req.status.toLowerCase()]}`}
            >
              {statusLabels[req.status]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
