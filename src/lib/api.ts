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
