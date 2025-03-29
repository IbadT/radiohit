import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

const components = {
  h1: (props) => (
    <h1 {...props} className="font-bold">
      {props.children}
    </h1>
  ),
  a: (props) => (
    <a {...props} className="text-mainAccent">
      {props.children}
    </a>
  ),
  img: (props) => (
    <div className="w-full h-[400px] relative overflow-hidden rounded-[20px] max-md:h-[200px] my-[30px]">
      <Image
        {...props}
        alt="radiohit.by"
        quality={90}
        className="w-full h-full absolute object-cover saturate-150 backdrop-saturate-125"
        fill
        loading={"lazy"}
      />
    </div>
  ),
  p: (props) => (
    <div {...props} className="mb-[0.7rem]">
      {props.children}
    </div>
  ),
};

const CustomMdx = (props) => {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
};
export default CustomMdx;
