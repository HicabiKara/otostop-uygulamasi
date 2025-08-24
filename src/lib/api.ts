export async function registerUser(formData: any) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Kayıt başarısız");
  return data;
}


export async function updateProfile(formData: {
  email: string
  name: string
  birthDate: string
}) {
  const res = await fetch("/api/user/update-profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Profil güncellenemedi")
  return data
}

export const changeUserPassword = async (data: {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}) => {
    const res = await fetch("/api/user/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const responseData = await res.json()
   if (!res.ok) {
    throw new Error(responseData.message || "Şifre güncellenemedi.")
  }
  return responseData
}


export async function uploadAndUpdateProfileImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/user/upload-profile-image", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Profil resmi yüklenemedi.");

  return data.imageUrl;
}


export async function createTrip(formData: any) {
  const res = await fetch("/api/trips/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "İlan oluşturma başarısız");
  return data;
}



export async function getTrips() {
  const res = await fetch("/api/trips/list", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // Next.js'te verinin her zaman güncel gelmesi için
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "İlanlar alınamadı");
  return data;
}

export async function getTripById(id: string) {
  const res = await fetch(`/api/trips/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "İlan alınamadı");
  return data;
}

export async function createTripRequest(tripId: string) {
   try {
    const res = await fetch("/api/trips/trip-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId }),
    });
      if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Talep gönderilemedi");
    }
     return await res.json();

   }
   catch(err:any){
      throw new Error(err.message || "Beklenmeyen bir hata oluştu");
   }

}

export async function checkTripRequest(tripId: string) {
  const res = await fetch(`/api/trips/trip-requests?tripId=${tripId}`);
  if (!res.ok) {
    throw new Error("Başvuru durumu kontrol edilirken hata oluştu");
  }
  return res.json(); 
}

export async function getSentTripRequests(page = 1, limit = 10) {
  const res = await fetch(
    `/api/trips/trip-requests?type=sent&page=${page}&limit=${limit}`,
    { credentials: "include" }
  );
  if (!res.ok) throw new Error("Gönderdiğiniz talepler alınamadı");
  return res.json(); 
}

export async function getIncomingTripRequests(page = 1, limit = 10) {
  const res = await fetch(
    `/api/trips/trip-requests?type=incoming&page=${page}&limit=${limit}`,
    { credentials: "include" }
  );
  if (!res.ok) throw new Error("İlanlarınıza gelen talepler alınamadı");
  return res.json(); 
}



export async function updateTripRequestStatus(requestId: string, status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED") {
  try{
    const res = await fetch(`/api/trips/trip-requests/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Talep güncellenemedi");
    }
      return await res.json();
  }
  catch(err:any){
    console.error("updateTripRequestStatus error:", err);
    throw err;
  }
}