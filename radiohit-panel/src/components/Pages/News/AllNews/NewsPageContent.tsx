import Link from 'next/link';
import { buttonVariants } from '@/components/Buttons/Button';
import { cn } from '@/lib/utils/utils';
import { Plus } from 'lucide-react';
import NewsPageQuery from '@/components/Pages/News/AllNews/NewsPageQuery';

const NewsPageContent = () => {
  return (
    <div className="flex h-full w-full flex-col">
      {/*Page Header*/}
      <div className="flex w-full flex-row items-center justify-between">
        <p className="pl-[0.5rem] text-[1.4rem] font-[500]">Все новости</p>
        <Link
          href="/news/add-new-post"
          className={cn(
            buttonVariants({ variant: 'topPageButtonAlternative' }),
            'flex flex-row items-center gap-[0.5rem]',
          )}
        >
          Добавить новость <Plus strokeWidth={1.5} size={20} />
        </Link>
      </div>

      {/*Page Content*/}
      <div className="mt-[1.2rem] w-full">
        <NewsPageQuery />
      </div>
    </div>
  );
};
export default NewsPageContent;
