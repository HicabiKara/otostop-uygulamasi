"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/features/hook";
import { openModal } from "@/features/ui/uiSlice";
import { useSession } from "next-auth/react";

export default function LoginRequiredHandler() {
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
   const { data: session, status } = useSession();

  useEffect(() => {
    const loginRequired = params.get("loginRequired");
        // Session yüklenmeden modal açma
    if (status === "loading") return;

    if (loginRequired === "true" && !session?.user) {
      dispatch(openModal("login-required"));

         // Query param temizle
      const newParams = new URLSearchParams(params.toString());
      newParams.delete("loginRequired");
      router.replace(`/?${newParams.toString()}`, { scroll: false });
    }
  }, [params, dispatch, router,session, status]);

  return null;
}