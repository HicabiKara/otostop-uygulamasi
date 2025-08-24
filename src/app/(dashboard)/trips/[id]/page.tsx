"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTripById, createTripRequest, checkTripRequest } from "@/lib/api";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import styles from "./tripDetail.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function TripDetailPage() {
    const router = useRouter()
    const { data: session, status } = useSession();
    const params = useParams();
    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // request states
    const [requestLoading, setRequestLoading] = useState(false);
    const [requestSuccess, setRequestSuccess] = useState<string | null>(null);
    const [requestError, setRequestError] = useState<string | null>(null);
    const [hasRequested, setHasRequested] = useState(false);
    const isOwner = session?.user?.id === trip?.driverId?._id;
    useEffect(() => {
        async function fetchTrip() {
            try {
                const data = await getTripById(params.id as string);
                setTrip(data);
                // kullanıcı login ise başvuru durumunu kontrol et
                if (session?.user?.id) {
                    const result = await checkTripRequest(params.id as string);
                    setHasRequested(result.hasRequested);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTrip();
    }, [params.id]);

    async function handleRequest() {
        if (status === "unauthenticated") {
            router.replace("/?loginRequired=true")
        }
        setRequestLoading(true);
        setRequestSuccess(null);
        setRequestError(null);

        try {
            await createTripRequest(trip._id);
            setRequestSuccess("Talebiniz başarıyla gönderildi.");
        } catch (err: any) {
            setRequestError(err.message);
        } finally {
            setRequestLoading(false);
        }
    }

    if (loading)
        return (
            <LoadingSpinner size="medium" message="İlan Detayları Yükleniyor..." />
        );
    if (error) return <div className={styles.error}>{error}</div>;
    if (!trip) return <div className={styles.error}>İlan bulunamadı.</div>;

    const user = trip.driverId;
    const profileImage =
        user?.image ||
        (user?.gender === "female"
            ? "/images/default-female.png"
            : "/images/default-male.png");

    return (
        <div className={styles.container}>
            {/* Kullanıcı Bilgisi */}
            <div className={styles.userSection}>
                <Image
                    src={profileImage}
                    alt="Profil"
                    width={100}
                    height={100}
                    className={styles.profileImage}
                />
                <div>
                    <h2>{user?.name}</h2>
                    <p className={styles.meta}>
                        İlan oluşturma tarihi:{" "}
                        {new Date(trip.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* İlan Detayları */}
            <div className={styles.details}>
                <p>
                    <strong>Kalkış Noktası:</strong> {trip.from}
                </p>
                <p>
                    <strong>Varış Noktası:</strong> {trip.to}
                </p>
                <p>
                    <strong>Tarih & Saat:</strong>{" "}
                    {new Date(trip.date).toLocaleString()}
                </p>
                <p>
                    <strong>Ücret:</strong> {trip.price} ₺
                </p>
                <p>
                    <strong>Boş Koltuk Sayısı:</strong> {trip.seatsAvailable}
                </p>


                {trip.notes && (
                    <p>
                        <strong>Açıklama:</strong> {trip.notes}
                    </p>
                )}
            </div>

            {/* İstek Gönderme */}
            <div className={styles.actions}>
                {isOwner ? <p className={styles.infoMessage}>
                    Bu ilan size ait. Talep gönderemezsiniz.
                </p> : <p>
                    {trip.seatsAvailable !== 0 ? <div>{!isOwner && !hasRequested && (
                        <button className={styles.requestButton} onClick={handleRequest}>
                            {requestLoading ? "istek Gönderiliyor..." : "İstek Gönder"}
                        </button>
                    )}</div> : <p>
                        <strong style={{ color: "red" }}>Bu yolculuk için boş koltuk kalmamıştır.</strong>
                    </p>}
                </p>
                }


                {requestSuccess && (
                    <p className={styles.successMessage}>{requestSuccess}</p>
                )}
                {!isOwner && hasRequested && (
                    <p className={styles.infoMessage}>Bu ilana zaten başvurdunuz.</p>
                )}
                {requestError && <p className={styles.error}>{requestError}</p>}
            </div>
        </div>
    );
}
