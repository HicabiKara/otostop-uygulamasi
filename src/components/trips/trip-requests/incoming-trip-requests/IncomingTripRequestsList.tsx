"use client";

import { useEffect, useState } from "react";
import { getIncomingTripRequests } from "@/lib/api";
import styles from "./incomingTripRequestsList.module.css";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { statusLabels } from "@/lib/statusLabels";
import { getUserImage } from "@/lib/getUserImage";
import { updateTripRequestStatus } from "@/lib/api";
interface TripRequest {
  _id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  passengerId: {
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

export default function IncomingTripRequestsList() {
  const [requests, setRequests] = useState<TripRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await getIncomingTripRequests();
        setRequests(data.items);
      } catch (err: any) {
        setError(err.message || "Talepler alınırken hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  const handleUpdateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      setUpdatingId(id);
      await updateTripRequestStatus(id, status);
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (err: any) {
      alert(err.message || "Durum güncellenemedi");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <LoadingSpinner message="Talepler yükleniyor..." />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (requests.length === 0)
    return <div className={styles.empty}>İlanlarınıza gelen herhangi bir talep yok.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>İlanlarınıza Gelen Talepler</h2>
      <ul className={styles.list}>
        {requests.map((req) => (
          <li key={req._id} className={styles.item}>
            <div className={styles.passenger}>
              <img
                src={getUserImage(req.passengerId)}
                alt={req.passengerId.name}
                className={styles.avatar}
              />
              <span className={styles.name}>{req.passengerId.name}</span>
            </div>
            <div className={styles.tripInfo}>
              <span>
                {req.tripId.from} → {req.tripId.to}
              </span>
              <span>{new Date(req.tripId.date).toLocaleDateString()}</span>
              <span>{req.tripId.price}₺</span>
            </div>
            {req.status === "PENDING" ? (
              <div className={styles.actions}>
                <button
                  className={styles.approveBtn}
                  disabled={updatingId === req._id}
                  onClick={() => handleUpdateStatus(req._id, "APPROVED")}
                >
                  {updatingId === req._id ? "Onaylanıyor..." : "Onayla"}
                </button>
                <button
                  className={styles.rejectBtn}
                  disabled={updatingId === req._id}
                  onClick={() => handleUpdateStatus(req._id, "REJECTED")}
                >
                  {updatingId === req._id ? "Reddediliyor..." : "Reddet"}
                </button>
              </div>
            ) : (
              <span
                className={`${styles.status} ${styles[req.status.toLowerCase()]}`}
              >
                {statusLabels[req.status]}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
