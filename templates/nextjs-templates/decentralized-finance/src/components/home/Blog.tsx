import { IBlogPost } from '@/interface';
import getMarkDownData from '@/utils/getMarkDownData';
import RevealAnimation from '../animation/RevealAnimation';
import BlogCardV1 from '../shared/card/BlogCardV1';
import LinkButton from '../ui/button/LinkButton';
const blogs: IBlogPost[] = getMarkDownData<IBlogPost & { [key: string]: unknown }>('src/data/blogs').slice(5, 8);

const Blog = () => {
  return (
    <section className="bg-background-2 dark:bg-background-5 py-[80px] md:py-[100px] lg:py-[150px]">
      <div className="main-container">
        <div className="mb-[70px] space-y-3 text-center">
          <RevealAnimation delay={0.1}>
            <h2>Learn defi, step by step</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p>New to defi? we’ve got you covered with beginner-friendly guides and insights.</p>
          </RevealAnimation>
        </div>
        <div className="mb-14 grid grid-cols-12 items-start gap-y-6 md:gap-8">
          <RevealAnimation delay={0.3}>
            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <BlogCardV1
                blog={blogs[0]}
                className="dark:bg-background-6 scale-100 overflow-hidden rounded-[20px] bg-white transition-transform duration-500 hover:scale-[102%] hover:transition-transform hover:duration-500"
              />
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <BlogCardV1
                blog={blogs[1]}
                className="dark:bg-background-6 scale-100 overflow-hidden rounded-[20px] bg-white transition-transform duration-500 hover:scale-[102%] hover:transition-transform hover:duration-500"
              />
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.5}>
            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <BlogCardV1
                blog={blogs[2]}
                className="dark:bg-background-6 scale-100 overflow-hidden rounded-[20px] bg-white transition-transform duration-500 hover:scale-[102%] hover:transition-transform hover:duration-500"
              />
            </div>
          </RevealAnimation>
        </div>
        <RevealAnimation delay={0.6}>
          <div className="text-center">
            <LinkButton
              href="/blog"
              className="btn btn-md hover:btn-primary dark:btn-transparent btn-white"
              aria-label="Explore the blog">
              Explore the blog
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Blog;
