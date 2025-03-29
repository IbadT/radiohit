"use client";

import {
  getCurrentUser,
  getUserAccount,
  loginUser,
  logoutUser,
  registerUser,
} from "@/lib/appwrite/auth_services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/Toaster/use-toast";
import { useAccountStore } from "@/lib/stores/account_store";
import { useUserStore } from "@/lib/stores/user_store";
import { useState } from "react";
import { deleteCookie, setCookie } from "cookies-next";
import { COOKIES } from "@/lib/utils/constants";
import useStore from "@/lib/hooks/useStore";
import { shallow } from "zustand/shallow";
import appwriteSDKProvider from "@/lib/appwrite/common/appwrite.client";
import { uploadFileToBucket } from "@/lib/appwrite/upload_services/fileUpload.service";
import { ServerConfig } from "@/lib/utils/server_config";
import { getUserImageURL } from "@/lib/appwrite/common/appwrite.helper";
import {
  createNewUserDocument,
  createNewRadioUserDocument,
} from "@/lib/appwrite/db_services/users.db.service";

const { account } = appwriteSDKProvider;

export function useAuth() {
  const router = useRouter();

  const userAccount = useStore(
    useAccountStore,
    (state:any) => state.account,
      //@ts-ignore
      shallow
  );

  const userDocument = useStore(
    useAccountStore,
    (state:any) => state.dbAccount,
      //@ts-ignore
      shallow
  );

  const hasHydrated = useStore(
    useAccountStore,
    (state:any) => state._hasAccountStoreHydrated,
      //@ts-ignore
      shallow
  );

  const showArtistPromo = useStore(
    useAccountStore,
    (state:any) => state.showArtistPromo,
      //@ts-ignore
      shallow
  );

  const [loading, setLoading] = useState(false);

  const isAuthenticated = userAccount == null ? false : true;

  //Login user
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await loginUser(email, password).then(async (newUser) => {
        if (newUser) {
          const user = await getCurrentUser();
          if (user) {
            setCookie(COOKIES.SESSION_ID, newUser.$id);
            setCookie(COOKIES.USER_ID, user.userAccount.$id);

            useAccountStore.setState?.({
              account: user.userAccount,
              dbAccount: user.userDocument,
            });
            useUserStore.setState?.({ user });
          }
        }
      });
      router.replace("/account");
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
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Get user Account
  const getUserAccountInfo = async () => {
    try {
      await getUserAccount().then(async (userAccount) => {
        if (!userAccount) {
          await logout();
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  //Logout user
  const logout = async () => {
    router.replace("/");
    try {
      await logoutUser();
      deleteCookie(COOKIES.SESSION_ID);
      deleteCookie(COOKIES.USER_ID);

      useAccountStore.setState?.({
        account: null,
        dbAccount: null,
      });
      useUserStore.setState?.({ user: null });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Вы уже вышли из системы",
        variant: "destructive2",
      });
    } finally {
      deleteCookie(COOKIES.SESSION_ID);
      deleteCookie(COOKIES.USER_ID);

      useAccountStore.setState?.({
        account: null,
        dbAccount: null,
      });
      useUserStore.setState?.({ user: null });
    }
  };

  //Register user, login and create users document collection
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      //Create new account
      await registerUser(email, password, name).then(async (account) => {
        await loginUser(email, password).then(async (newUser) => {
          //Create new doc in users collection with userID
          await createNewUserDocument(newUser.userId, email, name).then(
            async (docUser) => {
              const user = await getCurrentUser();

              setCookie(COOKIES.SESSION_ID, docUser.$id);
              setCookie(COOKIES.USER_ID, user.userAccount.$id);

              useAccountStore.setState?.({
                account: user.userAccount,
                dbAccount: user.userDocument,
              });
              useUserStore.setState?.({ user });
              router.replace("/account");
            }
          );
        });
      });
    } catch (error) {
      toast({
        title: "Ошибка регистрации",
        description: "Пожалуйста, попробуйте снова",
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Radio registration and logo upload
  const radioRegister = async (
    radioEmail: string,
    radioPassword: string,
    radioName: string,
    radioAgentName: string,
    radioCity: string,
    radioDescription: string,
    radioLogoFile: File
  ) => {
    setLoading(true);
    try {
      //Create new account
      await registerUser(radioEmail, radioPassword, radioName).then(
        async (account) => {
          await loginUser(radioEmail, radioPassword).then(async (newUser) => {
            await uploadFileToBucket(
              ServerConfig.userImagesBucketID,
              newUser.userId,
              radioLogoFile
            ).then(async (uploadResponse:any) => {
              //@ts-ignore
              const imageUrl = getUserImageURL(uploadResponse.$id);

              //Create new RADIO doc in users collection with userID
              await createNewRadioUserDocument(
                newUser.userId,
                radioEmail,
                radioName,
                radioAgentName,
                radioCity,
                radioDescription,
                uploadResponse.$id,
                imageUrl
              ).then(async (docUser) => {
                const user = await getCurrentUser();

                setCookie(COOKIES.SESSION_ID, docUser.$id);
                setCookie(COOKIES.USER_ID, user.userAccount.$id);

                useAccountStore.setState?.({
                  account: user.userAccount,
                  dbAccount: user.userDocument,
                });
                useUserStore.setState?.({ user });
                router.replace("/account");
              });
            });
          });
        }
      );
    } catch (error) {
      toast({
        title: "Ошибка регистрации",
        description: "Пожалуйста, попробуйте снова",
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Recover password => send verification link
  const recoverPassword = async (email: string) => {
    setLoading(true);
    try {
      account
        .createRecovery(email, "https://radiohit.by/recover/reset-password")
        .then(() => {
          toast({
            title: `Ссылка отправлена`,
            description: `Письмо с восстановлением пароля отправлено на ваш Email адрес`,
            variant: "default",
          });
        });
    } catch (error) {
      toast({
        title: `Ошибка отправки email`,
        description: `Такого пользователя не существует`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Reset password => create new password
  const resetPassword = async (
    userID: string,
    secret: string,
    password: string,
    passwordAgain: string
  ) => {
    setLoading(true);
    try {
      await account
        .updateRecovery(userID, secret, password)
        .then(() => {
          toast({
            title: `Пароль был успешно изменен`,
            description: `Войдите в свой аккаунт с новым паролем`,
            variant: "default",
          });
          router.replace("/login");
        });
    } catch (error) {
      toast({
        title: `Ошибка изменения пароля`,
        description: `Пожалуйста, запросите повторное восстановление пароля`,
        variant: "destructive2",
      });
    } finally {
      setLoading(false);
    }
  };

  //Update user data in Local Store
  const updateUserDataStore = async () => {
    try {
      const user = await getCurrentUser();
      useAccountStore.setState?.({
        account: user.userAccount,
        dbAccount: user.userDocument,
      });
      useUserStore.setState?.({ user });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  //Hide artist promo banner
  const hideArtistPromoBanner = () => {
    useAccountStore.setState?.({
      showArtistPromo: false,
    });
    router.refresh();
  };

  return {
    hasHydrated,
    isAuthenticated,
    loading,
    userAccount,
    userDocument,
    showArtistPromo,
    getUserAccountInfo,
    hideArtistPromoBanner,
    updateUserDataStore,
    radioRegister,
    recoverPassword,
    resetPassword,
    login,
    register,
    logout,
  };
}
