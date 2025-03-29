
import * as React from "react";
import {toast} from "@/components/ui/Toaster/use-toast";
import {Separator} from "@/components/ui/Separator/separator";
import {Loader2} from "lucide-react";
import Image from "next/image";
import {defaultImageAvatar} from "@/lib/utils/utils";
import {Button} from "@/components/Buttons/Button";

const ChangeUserImage = ({ loading, userDocument, changeUserImage }) => {
    const fileInput = React.useRef(null);

    const handleUploadImageClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    //Get image and upload to bucket
    const handleFileChange = async (e) => {
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
            await changeUserImage(imageFile);
        }
    };

    return (
        <>
            <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.8rem] px-[1.8rem] mt-[1rem] max-lg:mt-0 max-md:px-[1.2rem] max-lg:mb-[1rem]">
                <div className="flex flex-row h-full max-md:flex-col">
                    <p className="text-[#39383A] font-[500] text-[1.4rem] max-md:text-[1.2rem] max-md:text-slate-500 w-[20rem]">
                        Изменить изображение
                    </p>
                    <Separator
                        className="h-auto bg-gray-300 mr-[3rem] max-md:hidden"
                        orientation="vertical"
                    />
                    <Separator
                        className="w-auto bg-gray-200 my-[1rem] min-md:hidden"
                        orientation="horizontal"
                    />

                    <div className="w-[50%] max-md:w-full">
                        <div className="flex flex-row items-center max-md:justify-center">
                            <div className="">
                                {loading && (
                                    <div className="w-[6rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle rounded-full max-sm:w-[4rem] max-sm:h-[4rem] mr-[1.5rem]">
                                        <Loader2
                                            className=" h-[2.6rem] w-[2.6rem] animate-spin text-gray-400"
                                            strokeWidth={1}
                                        />
                                    </div>
                                )}
                                {!loading && userDocument.userImageURL == null && (
                                    <div className="w-[6rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-full overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover">
                                        <Image
                                            src={defaultImageAvatar}
                                            alt="avatar"
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority
                                            className="w-full h-full bg-cover object-cover"
                                            onClick={handleUploadImageClick}
                                        />
                                    </div>
                                )}
                                {!loading && userDocument.userImageURL != null && (
                                    <div className="w-[6rem] h-[6rem] bg-gray-100 items-center flex justify-center align-middle relative rounded-full overflow-hidden mr-[1.5rem] cursor-pointer transition-opacity hover:opacity-80 max-sm:w-[4rem] max-sm:h-[4rem] bg-cover">
                                        <Image
                                            src={userDocument.userImageURL}
                                            alt="avatar"
                                            priority
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="w-full h-full bg-cover object-cover"
                                            onClick={handleUploadImageClick}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <p className="text-slate-400 font-[500] mb-[0.5rem] text-[0.8rem] max-lg:text-[0.6rem] max-md:hidden">
                                    Изображение должно быть в формате 1:1 (квадрат)
                                    <br className='max-lg:hidden' /> Например: 500x500px.Максимальный размер файла 5
                                    мегабайт
                                </p>
                                <Button
                                    disabled={loading}
                                    isLoading={loading}
                                    onClick={handleUploadImageClick}
                                    className="rounded-xl bg-mainAccent hover:bg-fuchsia-500 transition-colors duration-300 w-[100%] max-lg:w-full"
                                >
                                    Загрузить изображение
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
                ref={fileInput}
            />
        </>
    );
};

export default ChangeUserImage
