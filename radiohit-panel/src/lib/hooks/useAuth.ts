"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser
} from "@/lib/appwrite/auth_services/auth.service";
import { deleteCookie, setCookie } from "cookies-next";
import { COOKIES } from "@/lib/utils/constants";
import { toast } from "@/components/ui/Toaster/use-toast";
import { useAccountStore } from "@/lib/stores/account_store";
import useStore from "@/lib/hooks/useStore";
import { shallow } from "zustand/shallow";

export function useAuth() {
  const router = useRouter();

  const userAccount = useStore(
    useAccountStore,
    (state: any) => state.account,
    shallow
  );

  const userDocument = useStore(
    useAccountStore,
    (state: any) => state.dbAccount,
    shallow
  );

  const hasHydrated = useStore(
    useAccountStore,
    (state: any) => state._hasAccountStoreHydrated,
    shallow
  );

  const [loading, setLoading] = useState(false);

  const isAuthenticated = userAccount != null;

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await loginUser(email, password).then(async (currenUser) => {
        if (currenUser) {
          const user = await getCurrentUser();
          if (user) {
            if (user.userDocument.role == "radiohitadmin") {
              setCookie(COOKIES.SESSION_ID, currenUser.$id);
              setCookie(COOKIES.USER_ID, user.userAccount.$id);

              useAccountStore.setState?.({
                account: user.userAccount,
                dbAccount: user.userDocument
              });
              currenUser.setState?.({ user });

              router.replace("/dashboard");
            } else {
              await logout();
              return;
            }
          }
        }
      });
    } catch (error) {
      const errorMessage = error.message.toString();

      let showMessage;

      if (errorMessage.includes("Invalid")) {
        showMessage = "Проверьте вводимые данные";
      } else if (errorMessage.includes("Rate limit")) {
        showMessage =
          "Много неудачных попыток входа. Пожалуйста, попробуйте позже";
      } else {
        showMessage = "Неверные данные пользователя";
      }

      toast({
        title: `Ошибка авторизации`,
        description: `${showMessage}`,
        variant: "destructive2"
      });
    } finally {
      setLoading(false);
    }
  };

  //Logout user
  const logout = async () => {
    try {
      await logoutUser().then(() => {
        deleteCookie(COOKIES.SESSION_ID);
        deleteCookie(COOKIES.USER_ID);

        useAccountStore.setState?.({
          account: null,
          dbAccount: null
        });
      });
      router.replace("/");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Вы уже вышли из системы",
        variant: "destructive2"
      });
    }
  };

  //Update user data in Local Store
  const updateUserDataStore = async () => {
    try {
      const user = await getCurrentUser();
      useAccountStore.setState?.({
        account: user.userAccount,
        dbAccount: user.userDocument
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loading,
    isAuthenticated,
    userAccount,
    userDocument,
    hasHydrated,
    login,
    logout,
    updateUserDataStore
  };
}
