'use client';

import { cn, getDuration } from '@/lib/utils/utils';
import { HelpCircle, Image as ImageIcon, MoveRight, Music, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '@/components/ui/Inputs/input';
import { Button } from '@/components/Buttons/Button';
import { z } from 'zod';
import { toast } from '@/components/ui/Toaster/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/HoverCard/hover-card';
import { useUser } from '@/lib/hooks/useUser';
import SuggestSongSuccessDialog from '@/components/Popups/SuggestSongSuccessDialog';
import Image from 'next/image';

//Form schema
const formSchema = z.object({
  artistName: z
    .string()
    .min(2, {
      message: 'Введите имя артиста',
    })
    .max(30, {
      message: 'Превышена максимальная длинна',
    }),
  trackName: z
    .string()
    .min(2, {
      message: 'Введите название трека',
    })
    .max(30, {
      message: 'Превышена максимальная длинна',
    }),
  whoSuggestedName: z
    .string()
    .max(30, {
      message: 'Превышена максимальная длинна',
    })
    .optional(),
  whoSuggestedEmail: z
    .string()
    .min(0, {
      message: 'Введите ваш email адрес',
    })
    .max(40, {
      message: 'Превышена максимальная длинна',
    })
    .optional(),

  fullName: z
    .string()
    .min(0, {
      message: 'Введите полный ФИО исполнителя',
    })
    .max(60, {
      message: 'Превышена максимальная длинна',
    }),
  birthDate: z
    .string()
    .min(0, {
      message: 'Введите дата рождения исполнителя',
    })
    .optional(),
  phoneNumber: z
    .string()
    .min(10, {
      message: 'Введите мобильный телефон',
    }),
  // authors: z
  //   .string()
  //   .min(0, {
  //     message: 'Введите авторы слов и музыки',
  //   })
  //   .optional(),
  socialLinks: z.array(z.string().url()).max(3),

  authorsOfWords: z.string().min(0, { message: 'Введите авторов слов'}).optional(),
  musicAuthors: z.string().min(0, { message: 'Введите авторов музыки'}).optional(),
});







const SuggestSongForm = () => {
  const { loading, uploadSuggestedTrack } = useUser();

  //Success dialog actions
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  //Artist Name
  const [artistName, setArtistName] = React.useState('');
  //Track Name
  const [trackName, setTrackName] = React.useState('');
  //
  //Track File
  const [trackSongFile, setTrackSongFile] = React.useState<File>();
  const [trackFileError, setTrackFileError] = React.useState(false);
  const trackFileInput = React.useRef(null);
  //Track duration
  const [trackDuration, setTrackDuration] = React.useState('');
  //
  // Track cover
  const [trackCoverError, setTrackCoverError] = React.useState(false);
  const [trackSongCover, setTrackSongCover] = React.useState<File>();
  const trackCoverInput = React.useRef(null);

  //On Upload Track Song click
  const handleTrackSongUploadClick = () => {
    if (trackFileInput.current) {
      trackFileInput.current.click();
    }
  };

  //On Upload Track Cover click

  const handleTrackCoverUploadClick = () => {
    if (trackCoverInput.current) {
      trackCoverInput.current.click();
    }
  };

  //On Track file selected
  const handleTrackSongFileChange = async (e) => {
    const songFile = e.target.files[0];
    if (!songFile) return;
    if (songFile.size > 20000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 20 мегабайт`,
        variant: 'destructive2',
      });
      setTrackFileError(true);
    } else {
      setTrackFileError(false);
      //Set track file
      setTrackSongFile(songFile);
      //Get audio duration from file
      await getDuration(songFile).then((res) => {
        //@ts-ignore
        setTrackDuration(res);
      });
    }
  };




  const handleTrackSongCoverChange = async (e) => {
    const songCover = e.target.files[0];
    if (!songCover) return;
  
    // Проверка типа файла
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(songCover.type)) {
      toast({
        title: `Неподдерживаемый формат`,
        description: `Пожалуйста, используйте JPEG, PNG или WebP`,
        variant: 'destructive2',
      });
      setTrackCoverError(true);
      return;
    }
  
    if (songCover.size > 20000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 20 мегабайт`,
        variant: 'destructive2',
      });
      setTrackCoverError(true);
    } else {
      setTrackCoverError(false);
      setTrackSongCover(songCover);
    }
  };



  // //On Track Cover selected
  // const handleTrackSongCoverChange = async (e) => {
  //   const songCover = e.target.files[0];
  //   if (!songCover) return;
  //   if (songCover.size > 20000000) {
  //     toast({
  //       title: `Ошибка`,
  //       description: `Максимальный размер файла 20 мегабайт`,
  //       variant: 'destructive2',
  //     });
  //     setTrackCoverError(true);
  //   } else {
  //     setTrackCoverError(false);
  //     //Set track file
  //     setTrackSongCover(songCover);
  //   }
  // };

  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: '',
      trackName: '',
      whoSuggestedName: '',
      whoSuggestedEmail: '',
      // authors: '',
      socialLinks: ['', '', ''],
      phoneNumber: '',
      birthDate: '',
      fullName: '',

      authorsOfWords: '',
      musicAuthors: '',
    },
  });




  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Проверка файлов
    if (!trackSongFile) {
      setTrackFileError(true);
      toast({
        title: `Файл трека не выбран`,
        description: `Необходимо выбрать файл трека`,
        variant: 'destructive2',
      });
      return;
    }
  
    if (!trackSongCover) {
      setTrackCoverError(true);
      toast({
        title: `Обложка трека не выбрана`,
        description: `Необходимо выбрать обложку трека`,
        variant: 'destructive2',
      });
      return;
    }
  
    try {
      await uploadSuggestedTrack(
        values.trackName,
        values.artistName,
        values.whoSuggestedName,
        values.whoSuggestedEmail,
        // values.authors,
        values.authorsOfWords,
        values.musicAuthors,
        values.fullName,
        values.birthDate,
        values.phoneNumber,
        values.socialLinks,
        trackSongFile,
        trackDuration,
        trackSongCover
      );
      
      setOpenSuccessDialog(true);
      form.reset();
      setTrackSongFile(undefined);
      setTrackSongCover(undefined);
    } catch (error) {
      toast({
        title: `Ошибка загрузки`,
        description: error.message || 'Не удалось загрузить трек',
        variant: 'destructive2',
      });
    }
  }




  // //Submit suggested track handler
  // async function onSubmit(values: z.infer<typeof formSchema>, e) {
  //   //Check is file added
  //   if (!trackSongFile) {
  //     setTrackFileError(true);
  //     toast({
  //       title: `Файл трека не выбран`,
  //       description: `Необходимо выбрать файл трека`,
  //       variant: 'destructive2',
  //     });
  //     return;
  //   } else {
  //     setTrackFileError(false);
  //   }
  //   // Check is file 2 added
  //   if (!trackSongCover) {
  //     setTrackCoverError(true);
  //     toast({
  //       title: `Обложка трека не выбран`,
  //       description: `Необходимо выбрать обложка трека`,
  //       variant: 'destructive2',
  //     });
  //     return;
  //   } else {
  //     setTrackCoverError(false);
  //   }

  //   //Upload suggested song
  //   await uploadSuggestedTrack(
  //     values.trackName,
  //     values.artistName,
  //     values.whoSuggestedName,
  //     values.whoSuggestedEmail,
  //     values.authors,
  //     values.authorsOfWords, // Новое поле
  //     values.musicAuthors,   // Новое поле
  //     values.fullName,
  //     values.birthDate,
  //     values.phoneNumber,
  //     values.socialLinks,
  //     trackSongFile,
  //     trackDuration,
  //     trackSongCover,
  //   ).then(() => {
  //     setOpenSuccessDialog(true);
  //   });
  // }

  return (
    <>
      <Form {...form}>
        <form
          className="grid gap-4 max-md:flex max-md:flex-col"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          {/*Who suggest optional fields*/}
          <div className="flex flex-row gap-[1.5rem] max-md:flex-col max-md:gap-[1rem]">
            <div className="w-full">
              {/*Who suggest song Name*/}
              <FormField
                control={form.control}
                name="whoSuggestedName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                      <p>
                        Ваше имя{' '}
                        <span className="text-[0.8rem] text-slate-400">(необязательно)</span>
                      </p>
                      <HelperWhoSuggestNameHoverCard />
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Иван"
                        autoComplete="true"
                        className="w-full placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              {/*Who suggest song Email*/}
              <FormField
                control={form.control}
                name="whoSuggestedEmail"
                render={({ field }) => (
                  <FormItem className="mr-[1.5rem] w-full">
                    <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                      <p>
                        Email адрес{' '}
                        <span className="text-[0.8rem] text-slate-400">(необязательно)</span>
                      </p>
                      <HelperWhoSuggestEmailHoverCard />
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="samplemail@gmail.com"
                        autoComplete="true"
                        className="w-full placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/*Song info fields*/}
          <div className="flex flex-row gap-[1.5rem] max-md:flex-col max-md:gap-[1rem]">
            <div className="w-full">
              {/*Artist Name*/}
              <FormField
                control={form.control}
                name="artistName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                      Имя исполнителя (группы) <HelperArtistNameHoverCard />
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Клава Кока"
                        className="w-full placeholder:text-slate-400"
                        {...field}
                        onChange={(event) => {
                          setArtistName(event.target.value);
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              {/*Track Name*/}
              <FormField
                control={form.control}
                name="trackName"
                render={({ field }) => (
                  <FormItem className="mr-[1.5rem] w-full">
                    <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                      Название песни <HelperTrackNameHoverCard />
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Крутой трек"
                        className="w-full placeholder:text-slate-400"
                        {...field}
                        onChange={(event) => {
                          setTrackName(event.target.value);
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-row gap-[1.5rem] max-md:flex-col max-md:gap-[1rem]">
            <div className="w-full">
              {/*Who suggest song Name*/}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                      <p>
                        ФИО исполнителя{' '}
                        {/* <span className="text-slate-400 text-[0.8rem]">
                          (необязательно)
                        </span> */}
                      </p>
                      {/* <HelperWhoSuggestNameHoverCard /> */}
                      <HelperWhoSuggestHoverCard title={"Введите ФИО исполнителя (полностью)"}/>
                      {/* !!!!!!!!! */}
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Иванов Иван Иванович"
                        autoComplete="true"
                        className="w-full placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              {/*Who suggest song Email*/}
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="mr-[1.5rem] w-full">
                    <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                      <p>
                        Дата рождения исполнителя
                        {/* <span className="text-slate-400 text-[0.8rem]">
                          (необязательно)
                        </span> */}
                      </p>
                      {/* <HelperWhoSuggestEmailHoverCard /> */}
                      <HelperWhoSuggestHoverCard title={"Введите дату рождения исполнителя"}/>
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        type="date"
                        placeholder="01.02.2002"
                        autoComplete="true"
                        className="w-full placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-row gap-[1.5rem] max-md:flex-col max-md:gap-[1rem]">
            <div className="w-full">
              {/*Who suggest song Name*/}
              <FormField
                control={form.control}
                name="authorsOfWords"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                      <p>
                        Авторы слов{' '}
                        {/* <span className="text-slate-400 text-[0.8rem]">
                          (необязательно)
                        </span> */}
                      </p>
                      {/* <HelperWhoSuggestNameHoverCard /> */}
                      <HelperWhoSuggestHoverCard title={"Укажите имена авторов текста, которые создали трек"}/>
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Авторы слов"
                        autoComplete="true"
                        className="w-full placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <div className="w-full">
              {/*Who suggest song Email*/}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="mr-[1.5rem] w-full">
                    <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                      <p>
                        Мобильный телефон
                        {/* <span className="text-slate-400 text-[0.8rem]">
                          (необязательно)
                        </span> */}
                      </p>
                      {/* <HelperWhoSuggestEmailHoverCard /> */}
                      <HelperWhoSuggestHoverCard title={"Введите свой мобильный телефон"}/>
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        type="tel"
                        // placeholder="+7 (ABC) xxx-xx-xx"
                        placeholder="+375-(33)-679-24-64"
                        autoComplete="true"
                        className="w-full placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>




          <div className="w-full">
              {/*Who suggest song Name*/}
              <FormField
                control={form.control}
                name="musicAuthors"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                      <p>
                        Авторы музыки{' '}
                        {/* <span className="text-slate-400 text-[0.8rem]">
                          (необязательно)
                        </span> */}
                      </p>
                      {/* <HelperWhoSuggestNameHoverCard /> */}
                      <HelperWhoSuggestHoverCard title={"Укажите имена авторов музыки, которые создали трек"}/>
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Авторы музыки"
                        autoComplete="true"
                        className="w-full placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



          {form.getValues().socialLinks.map((_, i) => (
            <FormField
              key={i}
              control={form.control}
              name={`socialLinks.${i}`}
              render={({ field }) => (
                <FormItem className="mr-[1.5rem] w-full">
                  <FormLabel className="flex flex-row items-center gap-[1rem] text-[0.9rem] text-slate-700">
                    <p>Социальные сети {i + 1}</p>
                    {/* <HelperWhoSuggestEmailHoverCard /> */}
                    <HelperWhoSuggestHoverCard title={`Укажите ссылку на социальную сеть`}/>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      type="url"
                      placeholder="https://"
                      autoComplete="true"
                      className="w-full placeholder:text-slate-400"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          {/*Track File*/}
          <div className="flex w-full flex-row gap-[1.5rem]">
            <div className="flex w-full select-none flex-col max-md:w-full">
              <div className="flex w-full flex-col">
                <div
                  className={cn(
                    'relative mr-[1.5rem] flex h-[6rem] w-full cursor-pointer flex-row items-center justify-center overflow-hidden rounded-2xl border-[2px] border-solid border-gray-200 bg-gray-50 bg-cover align-middle transition-all hover:scale-[0.96] hover:opacity-80 max-md:h-[6rem]',
                    trackFileError && 'border-red-300 bg-red-50',
                    !trackSongFile && 'border-dashed',
                    trackSongFile && 'border-fuchsia-300 bg-fuchsia-50',
                  )}
                  onClick={handleTrackSongUploadClick}
                >
                  {/*Show if track not selected*/}
                  {!trackSongFile && (
                    <>
                      <Upload
                        className={cn('mr-[1rem] text-gray-500', trackFileError && 'text-red-500')}
                      />
                      <div className="flex flex-col">
                        <p className={cn('text-gray-500', trackFileError && 'text-red-500')}>
                          Загрузите файл песни
                        </p>
                        <p
                          className={cn(
                            'text-[0.8rem] text-gray-400',
                            trackFileError && 'text-red-500',
                          )}
                        >
                          Максимальный размер файла 20 мб
                        </p>
                      </div>
                    </>
                  )}

                  {/*Show if track was selected*/}
                  {trackSongFile && (
                    <>
                      <Music className="mr-[1rem] text-gray-500" />
                      <div className="flex flex-row items-center gap-[0.6rem]">
                        <p className="text-gray-500 max-md:text-[0.8rem]">
                          {artistName !== '' ? artistName : 'Имя исполнителя'}
                        </p>
                        <p className="text-gray-500">-</p>
                        <p className="text-gray-500 max-md:text-[0.8rem]">
                          {trackName !== '' ? trackName : 'Название песни'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*Track Cover 2*/}
          <div className="flex w-full flex-row gap-[1.5rem]">
            <div className="flex w-full select-none flex-col max-md:w-full">
              <div className="flex w-full flex-col">
                <div
                  className={cn(
                    'relative mr-[1.5rem] flex h-[6rem] w-full cursor-pointer flex-row items-center justify-center overflow-hidden rounded-2xl border-[2px] border-solid border-gray-200 bg-gray-50 bg-cover align-middle transition-all hover:scale-[0.96] hover:opacity-80 max-md:h-[6rem]',
                    trackCoverError && 'border-red-300 bg-red-50',
                    !trackSongCover && 'border-dashed',
                    trackSongCover && 'border-fuchsia-300 bg-fuchsia-50',
                  )}
                  onClick={handleTrackCoverUploadClick}
                >
                  {/*Show if track not selected*/}
                  {!trackSongCover && (
                    <>
                      <Upload
                        className={cn('mr-[1rem] text-gray-500', trackCoverError && 'text-red-500')}
                      />
                      <div className="flex flex-col">
                        <p className={cn('text-gray-500', trackCoverError && 'text-red-500')}>
                          Загрузите файл обложка
                        </p>
                        <p
                          className={cn(
                            'text-[0.8rem] text-gray-400',
                            trackCoverError && 'text-red-500',
                          )}
                        >
                          Максимальный размер файла 20 мб
                        </p>
                      </div>
                    </>
                  )}

                  {/*Show if track was selected*/}
                  {trackSongCover && (
                    <>
                      <ImageIcon className="mr-[1rem] text-gray-500" />
                      <div className="flex flex-row items-center gap-[0.6rem]">
                        <p className="text-gray-500 max-md:text-[0.8rem]">
                          {trackSongCover.name !== '' ? trackSongCover.name : 'Обложка'}
                        </p>
                        <p className="text-gray-500">-</p>

                        <Image
                          src={URL.createObjectURL(trackSongCover)}
                          alt="Обложка трека"
                          width={16}
                          height={16}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*Hidden Song File Input*/}
          <input
            type="file"
            accept=".mp3"
            className="hidden"
            onChange={(e) => handleTrackSongFileChange(e)}
            ref={trackFileInput}
          />

          {/* Hidden cover image input */}

          <input
            type="file"
            accept=".png,.jpg"
            className="hidden"
            onChange={(e) => handleTrackSongCoverChange(e)}
            ref={trackCoverInput}
          />

          <Button
            type="submit"
            className="flex w-full flex-row items-center gap-[0.5rem] bg-mainAccent text-white transition-colors duration-300 hover:bg-fuchsia-500"
            disabled={loading}
            isLoading={loading}
          >
            {!loading && 'Отправить трек на радио'}
            {loading && 'Загрузка трека...'}
            <MoveRight strokeWidth={1} className="max-md:h-auto max-md:w-[1rem]" />
          </Button>
        </form>
      </Form>

      {/*Success Upload Dialog*/}
      <SuggestSongSuccessDialog
        dialogOpen={openSuccessDialog}
        setDialogOpen={setOpenSuccessDialog}
      />
    </>
  );
};

export default SuggestSongForm;

const HelperArtistNameHoverCard = () => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="cursor-pointer max-md:hidden">
        <HelpCircle strokeWidth={2} size={15} className="text-mainAccent" />
      </HoverCardTrigger>
      <HoverCardContent className="text-[0.8rem] text-gray-500">
        <p>Введите имя исполнителя (группы), которому принадлежит трек</p>
      </HoverCardContent>
    </HoverCard>
  );
};

const HelperTrackNameHoverCard = () => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="cursor-pointer max-md:hidden">
        <HelpCircle strokeWidth={2} size={15} className="text-mainAccent" />
      </HoverCardTrigger>
      <HoverCardContent className="text-[0.8rem] text-gray-500">
        <p>
          Введите название загруженной песни (название песни должно совпадать с названием в альбоме
          испонителя)
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

const HelperWhoSuggestNameHoverCard = () => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="cursor-pointer max-md:hidden">
        <HelpCircle strokeWidth={2} size={15} className="text-mainAccent" />
      </HoverCardTrigger>
      <HoverCardContent className="text-[0.8rem] text-gray-500">
        <p>Укажите ваше имя</p>
      </HoverCardContent>
    </HoverCard>
  );
};

const HelperWhoSuggestEmailHoverCard = () => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className="cursor-pointer max-md:hidden">
        <HelpCircle strokeWidth={2} size={15} className="text-mainAccent" />
      </HoverCardTrigger>
      <HoverCardContent className="text-[0.8rem] text-gray-500">
        <p>Укажите ваш Email адрес для обратной связи</p>
      </HoverCardContent>
    </HoverCard>
  );
};


const HelperWhoSuggestHoverCard = ({title}: {title: string}) => (
  <HoverCard openDelay={100}>
      <HoverCardTrigger className="cursor-pointer max-md:hidden">
        <HelpCircle strokeWidth={2} size={15} className="text-mainAccent" />
      </HoverCardTrigger>
      <HoverCardContent className="text-[0.8rem] text-gray-500">
        <p>{title}</p>
      </HoverCardContent>
    </HoverCard>
)