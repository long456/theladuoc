export interface HomePageConfig {
  seo: {
    title: string | null;
    desc: string | null;
    keywords: string | null;
    image: string | null;
  };
  banner: {
    backgroundBanner: string | null;
    titleSmall: string | null;
    title: string | null;
    slogan: string | null;
    isShowForm: boolean | null;
    imageRight: string | null;
  };
  courseCategory: {
    backgroundImage: string | null;
  };
  aboutUs: {
    backgroundImage: string | null;
    image01: string | null;
    image02: string | null;
    image03: string | null;
    countStudent: number | null;
    title: string | null;
    subTitle01: string | null;
    desc01: string | null;
    icon01: string | null;
    subTitle02: string | null;
    desc02: string | null;
    icon02: string | null;
    isShowButton: boolean;
  };
  listCourse: {
    backgroundImage: string | null;
  };
  introVideo: {
    videoLink: string | null;
    videoBanner: string | null;
  };
  listEvent: {
    backgroundImage: string | null;
  };
  testimonial: {
    backgroundImage: string | null;
  };
  whyChooseUs: {
    backgroundImage: string | null;
    title: string | null;
    desc: string | null;
    icon01: string | null;
    subTitle01: string | null;
    subDesc01: string | null;
    icon02: string | null;
    subTitle02: string | null;
    subDesc02: string | null;
  };
  findCourse: {
    backgroundImage: string | null;
  };
  listPost: {
    backgroundImage: string | null;
  };
  faq: {
    backgroundImage: string | null;
    image01: string | null;
    image02: string | null;
    image03: string | null;
  };
}
