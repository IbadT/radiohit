interface NewsLayoutProps {
  children: React.ReactNode;
}

const NewsLayout = ({ children }: NewsLayoutProps) => {
  return <div>{children}</div>;
};

export default NewsLayout;
