import Breadcrumbs from "@/components/BreadCrumbs/BreadCrumbsHelper";

const BreadCrumbsGlobal = () => {
  return (
    <Breadcrumbs
      omitRootLabel={false}
      useDefaultStyle={true}
      rootLabel="Главная"
      activeItemClassName="text-mainAccent"
      inactiveItemClassName="text-gray-400 transition-opacity duration-300 hover:opacity-70"
      containerClassName="text-[1rem]"
      replaceCharacterList={[
        { from: "how-to-upload-track", to: "Как загрузить трек" },
        { from: "radio-rules", to: "Правила использования" },
        { from: "radio-general-info", to: "Общая информация" },
        { from: "artist-agreement", to: "Соглашение о передаче прав" },
        { from: "artist-promotion", to: "Продвижение и продюсирование" },
        { from: "news", to: "Новости" },
        { from: "account", to: "Аккаунт" },
        { from: "register", to: "Регистрация" },
        { from: "login", to: "Вход" },
        { from: "songs", to: "Все треки" },
        { from: "artists", to: "Исполнители" },
        { from: "chart", to: "Популярные треки" },
        { from: "radio", to: "Онлайн радио" },
        { from: "events", to: "Мероприятия" },
        { from: "clips", to: "Клипы" },
        { from: "about", to: "О проекте" },
        { from: "settings", to: "Настройки аккаунта" },
        { from: "favorites", to: "Избранные треки" },
        { from: "upload-track", to: "Загрузить трек" },
        { from: "download-tracks", to: "Скачанные треки" },
        { from: "artist-create", to: "Заполнить информацию" },
        { from: "uploaded-tracks", to: "Мои треки" },
        { from: "privacy-policy", to: "Политика конфиденциальности" },
        { from: "agreement", to: "Договор оферты" },
        { from: "suggest-song", to: "Отправить песню на радио" },
        { from: "digital-distribution", to: "Цифровая дистрибуция" },
        { from: "platform-contacts", to: "Контакты" },
        { from: "collaboration-advertising", to: "Рекламодателям" },

        {
          from: "promotion-and-production",
          to: "Продвижение и продюсирование",
        },
        { from: "platform-analytics", to: "Аналитика" },
      ]}
    />
  );
};
export default BreadCrumbsGlobal;
