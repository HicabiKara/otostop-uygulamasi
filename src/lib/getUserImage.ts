export function getUserImage(user: { image?: string; gender?: string }) {
  if (user?.image) {
    return user.image; // Cloudinary URL
  }
  if (user?.gender === "male") {
    return "/male-avatar.png"; // public klasöründen
  }
  if (user?.gender === "female") {
    return "/female-avatar.png";
  }
  return "/default-avatar.png"; // gender yoksa generic fallback
}