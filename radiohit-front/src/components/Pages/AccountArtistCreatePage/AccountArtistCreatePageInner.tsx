import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import { Shell } from "@/components/ui/Shells/shell";
import ArtistCreateForm from "@/components/Forms/AccountForms/ArtistCreateForm";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";
import * as React from "react";

const AccountArtistCreatePageInner = () => {
  return (
    <>
      <ScrollToTop />
      <Shell className="max-w-lg min-[1900px]:scale-[1.2] p-[0] max-lg:mb-[1.5rem]">
        <Card className="rounded-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Заполните информацию</CardTitle>
            <CardDescription>
              Заполнить информацию об исполнителе
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Данные исполнителя
                </span>
              </div>
            </div>
            <ArtistCreateForm />
          </CardContent>
        </Card>
      </Shell>
    </>
  );
};
export default AccountArtistCreatePageInner;
