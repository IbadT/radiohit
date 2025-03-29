import * as React from "react";
import { useUser } from "@/lib/hooks/useUser";
import { toast } from "@/components/ui/Toaster/use-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/Separator/separator";
import { ImagePlus, Music } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/dialog";
import { Button } from "@/components/Buttons/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form/form";
import { Input } from "@/components/ui/Inputs/input";
import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { getDuration } from "@/lib/utils/utils";

const formSchema = z.object({
  trackName: z
    .string()
    .min(3, { message: "Введите название трека" })
    .max(60, { message: "Превышена максимально допустимая длинна" }),
});

const ArtistUploadTrack = ({}) => {
  //Use user data
  const { loading, artistUploadNewTrack, userDocument, hasHydrated } =
    useUser();

  //Refs
  const imageFileInput = React.useRef(null);
  const trackFileInput = React.useRef(null);
  const imageRef = React.useRef(null);

  //Track Name
  const [trackName, setTrackName] = React.useState("");

  //Track Cover Image
  const [trackImage, setTrackImage] = React.useState<File>();
  //Track Song File
  const [trackSongFile, setTrackSongFile] = React.useState<File>();
  //Show agreement dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  //Checked agreement
  const [checkedAgreement, setCheckedAgreement] = React.useState(false);
  //Track duration
  const [trackDuration, setTrackDuration] = React.useState("");

  //On Upload Image Click
  const handleImageUploadClick = () => {
    if (imageFileInput.current) {
      imageFileInput.current.click();
    }
  };

  //On Upload Track Song click
  const handleTrackSongUploadClick = () => {
    if (trackFileInput.current) {
      trackFileInput.current.click();
    }
  };

  //On image file selected
  const handleTrackImageFileChange = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;
    if (imageFile.size > 5000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 5 мегабайт`,
        variant: "destructive2",
      });
      return;
    } else {
      setTrackImage(imageFile);
      uploader(e);
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
        variant: "destructive2",
      });
    } else {
      //Set track file
      setTrackSongFile(songFile);
      //Get audio duration from file
      await getDuration(songFile).then((res) => {
        //@ts-ignore
        setTrackDuration(res);
      });
    }
  };

  //Show uploaded image in UI
  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        //@ts-ignore
        setResult(e.target.result);
      });
      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  //Get image result from uploader
  const { result, uploader } = useDisplayImage();

  // react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //Check is image added
    if (!trackImage) {
      toast({
        title: `Обложка трека не выбрана`,
        description: `Необходимо добавить изображение трека`,
        variant: "destructive2",
      });
      return;
    }

    //Check is file added
    if (!trackSongFile) {
      toast({
        title: `Файл трека не выбран`,
        description: `Необходимо выбрать файл трека`,
        variant: "destructive2",
      });
      return;
    }

    //Check if image file lower than 5mb
    if (trackImage.size > 5000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 5 мегабайт`,
        variant: "destructive2",
      });
      return;
    }

    //Check if song file lower than 10mb
    //@ts-ignore
    if (trackSongFile > 20000000) {
      toast({
        title: `Ошибка`,
        description: `Максимальный размер файла 20 мегабайт`,
        variant: "destructive2",
      });
    }
    setTrackName(values.trackName);
    //Open agreement dialog
    setOpenDialog(true);
  };

  //Start upload after agreement
  const finallyUploadTrack = async () => {
    setOpenDialog(false);
    //@ts-ignore
    await artistUploadNewTrack(
      trackName,
      trackImage,
      trackSongFile,
      trackDuration
    );
  };

  return (
    <>
      <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.8rem] px-[1.8rem] mt-[1rem] max-lg:mt-0 max-md:px-[1.2rem] mb-[1rem] max-md:py-[1.4rem]">
        <Form {...form}>
          <form
            className="grid gap-4 max-md:flex max-md:flex-col"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            {/*Track Name*/}
            <div className="flex flex-row h-full max-md:flex-col">
              <div className="flex flex-col">
                <p className="text-[#39383A] font-[500] text-[1.4rem] max-md:text-[1.2rem] max-md:text-slate-500 w-[20rem] mb-[0.6rem] max-md:mb-0">
                  Название трека
                </p>
                <p className="text-slate-400 font-[500] mb-[0.5rem] text-[0.8rem] max-lg:text-[0.6rem] max-md:hidden">
                  Укажите название вашего трека
                  <br className="max-md:hidden" />В названии допускаются буквы и
                  цифры
                </p>
              </div>
              <Separator
                className="h-auto bg-gray-300 mr-[3rem] max-md:hidden"
                orientation="vertical"
              />

              <div className="w-[50%] max-md:w-full">
                <div className="flex flex-row items-center max-md:justify-center w-full">
                  <FormField
                    control={form.control}
                    name="trackName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-slate-700 text-[1rem] max-md:hidden">
                          Введите название трека
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Мой крутой трек..."
                            className="placeholder:text-slate-400 w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <p className="text-slate-400 font-[500] mb-[0.5rem] text-[0.8rem] max-lg:text-[0.6rem] md:hidden max-md:text-[0.9rem] max-md:mt-[1rem] max-md:mb-0">
                Укажите название вашего трека
                <br />В названии допускаются буквы и цифры
              </p>
            </div>

            <Separator
              className="w-auto bg-gray-200 my-[1rem] max-md:px-1rem max-md:my-[0.6rem]"
              orientation="horizontal"
            />

            {/*Track Cover Image*/}
            <div className="flex flex-row h-full max-md:flex-col">
              <div className="flex flex-col">
                <p className="text-[#39383A] font-[500] text-[1.4rem] max-md:text-[1.2rem] max-md:text-slate-500 w-[20rem] mb-[0.6rem] ">
                  Обложка трека
                </p>
                <p className="text-slate-400 font-[500] mb-[0.5rem] text-[0.8rem] max-lg:text-[0.6rem] max-md:hidden">
                  Изображение должно быть в формате 1:1 (квадрат)
                  <br className="max-md:hidden" /> Максимальный размер файла 5
                  мегабайт
                  <br className="max-md:hidden" /> Например: 500x500px.
                </p>
              </div>

              <Separator
                className="h-auto bg-gray-300 mr-[3rem]"
                orientation="vertical"
              />

              <div className="w-[50%] max-md:w-full flex flex-col">
                <div className="flex flex-row items-center max-md:justify-center">
                  <div className="">
                    {trackImage && (
                      <div className="w-[6rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover">
                        <img
                          src={result}
                          alt="avatar"
                          ref={imageRef}
                          className="w-full h-full bg-cover object-cover"
                          onClick={handleImageUploadClick}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <div
                      className="w-full h-[6rem] border-[2px] border-dashed border-gray-200 items-center flex flex-row justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:h-[4rem] bg-cover"
                      onClick={handleImageUploadClick}
                    >
                      <ImagePlus className="text-gray-400 mr-[1rem]" />
                      <p className="text-gray-400">
                        {" "}
                        {trackImage
                          ? "Изменить обложку"
                          : "Добавить обложку трека"}
                      </p>
                    </div>
                  </div>
                </div>
                {trackImage && (
                  <p className="text-[0.8rem] text-slate-600 py-[5px] px-[10px] bg-fuchsia-50 rounded-2xl mt-[0.6rem]">
                    {trackImage.name}
                  </p>
                )}
              </div>
              <p className="text-slate-400 font-[500] mb-[0.5rem] text-[0.8rem] max-lg:text-[0.6rem] md:hidden max-md:text-[0.9rem] max-md:mt-[1rem] max-md:mb-0">
                Изображение должно быть в формате 1:1 (квадрат)
                <br className="max-md:hidden" /> Максимальный размер файла 5
                мегабайт
                <br className="max-md:hidden" /> Например: 500x500px.
              </p>
            </div>

            <Separator
              className="w-auto bg-gray-200 my-[1rem] max-md:my-[0.6rem]"
              orientation="horizontal"
            />

            {/*Track File*/}
            <div className="flex flex-row h-full max-md:flex-col">
              <div className="flex flex-col">
                <p className="text-[#39383A] font-[500] text-[1.4rem] max-md:text-[1.2rem] max-md:text-slate-500 w-[20rem] mb-[0.6rem]">
                  Файл трека
                </p>
                <p className="text-slate-400 font-[500] mb-[0.5rem] text-[0.8rem] max-lg:text-[0.6rem] max-md:hidden">
                  Файл трека должен быть в формате{" "}
                  <span className="font-[700]">.mp3</span>
                  <br className="max-md:hidden" />
                  Максимальный размер файла 20 мегабайт
                </p>
              </div>
              <Separator
                className="h-auto bg-gray-300 mr-[3rem] max-md:hidden"
                orientation="vertical"
              />

              <div className="w-[50%] max-md:w-full flex flex-col">
                <div className="flex flex-row items-center max-md:justify-center">
                  {trackSongFile && (
                    <div
                      className="w-[8rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:h-[4rem] bg-cover"
                      onClick={handleTrackSongUploadClick}
                    >
                      <Music className="text-gray-400" size={30} />
                    </div>
                  )}
                  <div className="flex flex-col w-full">
                    <div
                      className="w-full h-[6rem] border-[2px] border-dashed border-gray-200 items-center flex flex-row justify-center align-middle relative rounded-2xl overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80  max-sm:h-[4rem] bg-cover"
                      onClick={handleTrackSongUploadClick}
                    >
                      <Music className="text-gray-400 mr-[1rem]" />
                      <p className="text-gray-400">
                        {trackSongFile
                          ? "Изменить файл"
                          : "Добавить файл трека"}
                      </p>
                    </div>
                  </div>
                </div>
                {trackSongFile && (
                  <p className="text-[0.8rem] text-slate-600 py-[5px] px-[10px] bg-fuchsia-50 rounded-2xl mt-[0.6rem]">
                    {trackSongFile.name}
                  </p>
                )}
              </div>
              <p className="text-slate-400 font-[500] mb-[0.5rem] text-[0.8rem] max-lg:text-[0.6rem] md:hidden max-md:text-[0.9rem] max-md:mt-[1rem] max-md:mb-0">
                Файл трека должен быть в формате{" "}
                <span className="font-[700]">.mp3 </span>
                <br className="max-md:hidden" />
                Максимальный размер файла 20 мегабайт
              </p>
            </div>

            <Button
              disabled={loading}
              isLoading={loading}
              className="rounded-xl bg-mainAccent hover:bg-fuchsia-500 transition-colors duration-300 w-[100%] max-lg:w-full mt-[1rem] max-md:mt-0"
            >
              Загрузить трек
            </Button>
          </form>
        </Form>
      </div>

      {/*Hidden Image File Input*/}
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        className="hidden"
        onChange={(e) => handleTrackImageFileChange(e)}
        ref={imageFileInput}
      />

      {/*Hidden Song File Input*/}
      <input
        type="file"
        accept=".mp3"
        className="hidden"
        onChange={(e) => handleTrackSongFileChange(e)}
        ref={trackFileInput}
      />

      {/*AgreementDialog*/}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-md:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="mb-[0.5rem] text-[1.4rem] max-md:text-left">
              Соглашение о передаче прав
            </DialogTitle>
            <DialogDescription>
              <ScrollArea className="h-[30rem] w-full rounded-md border p-[0.2rem] border-none">
                <p className="text-slate-700 text-left">
                  Как принято считать, непосредственные участники технического
                  прогресса набирают популярность среди определенных слоев
                  населения, а значит, должны быть преданы
                  социально-демократической анафеме. В своём стремлении повысить
                  качество жизни, они забывают, что синтетическое тестирование
                  требует от нас анализа своевременного выполнения сверхзадачи.
                  Картельные сговоры не допускают ситуации, при которой
                  независимые государства представляют собой не что иное, как
                  квинтэссенцию победы маркетинга над разумом и должны быть
                  рассмотрены исключительно в разрезе маркетинговых и финансовых
                  предпосылок. С учётом сложившейся международной обстановки,
                  высококачественный прототип будущего проекта требует от нас
                  анализа существующих финансовых и административных условий.
                  Лишь реплицированные с зарубежных источников, современные
                  исследования, превозмогая сложившуюся непростую экономическую
                  ситуацию, своевременно верифицированы. Не следует, однако,
                  забывать, что базовый вектор развития прекрасно подходит для
                  реализации переосмысления внешнеэкономических политик. Для
                  современного мира постоянный количественный рост и сфера нашей
                  активности в значительной степени обусловливает важность
                  дальнейших направлений развития. Мы вынуждены отталкиваться от
                  того, что курс на социально-ориентированный национальный
                  проект создаёт необходимость включения в производственный план
                  целого ряда внеочередных мероприятий с учётом комплекса новых
                  принципов формирования материально-технической и кадровой
                  базы. С другой стороны, постоянный количественный рост и сфера
                  нашей активности обеспечивает актуальность как
                  самодостаточных, так и внешне зависимых концептуальных
                  решений. А также сторонники тоталитаризма в науке, вне
                  зависимости от их уровня, должны быть объявлены нарушающими
                  общечеловеческие нормы этики и морали. Учитывая ключевые
                  сценарии поведения, дальнейшее развитие различных форм
                  деятельности однозначно фиксирует необходимость поставленных
                  обществом задач! Но стремящиеся вытеснить традиционное
                  производство, нанотехнологии, которые представляют собой яркий
                  пример континентально-европейского типа политической культуры,
                  будут указаны как претенденты на роль ключевых факторов.
                  Равным образом, повышение уровня гражданского сознания не
                  оставляет шанса для новых принципов формирования
                  материально-технической и кадровой базы. В целом, конечно,
                  постоянный количественный рост и сфера нашей активности
                  позволяет выполнить важные задания по разработке стандартных
                  подходов. Приятно, граждане, наблюдать, как многие известные
                  личности и по сей день остаются уделом либералов, которые
                  жаждут быть преданы социально-демократической анафеме.
                </p>
              </ScrollArea>
              <div className="items-top flex mt-[1rem] space-x-2 cursor-pointer p-[1rem] border-[1px] rounded-2xl border-slate-200 max-md:text-left">
                <Checkbox
                  id="terms1"
                  //@ts-ignore
                  onCheckedChange={(val) => setCheckedAgreement(val)}
                  className="data-[state=checked]:!bg-mainAccent data-[state=checked]:!border-mainAccent"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Я согласен с правилами и условиями
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Продолжая вы соглашаетесь с правилами и условиями
                  </p>
                </div>
              </div>
              <Button
                disabled={!checkedAgreement}
                isLoading={false}
                className="rounded-xl bg-mainAccent hover:bg-fuchsia-500 transition-colors duration-300 w-[100%] max-lg:w-full mt-[1rem]"
                onClick={() => finallyUploadTrack()}
              >
                Загрузить трек
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ArtistUploadTrack;
