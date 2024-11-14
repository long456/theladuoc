export interface AboutUsConfig {
  seo: {
    title: string | null;
    desc: string | null;
    keywords: string | null;
    image: string | null;
  };
  banner: {
    backgroundImage: string | null;
  };
  aboutUs: {
    backgroundImage: string | null;
    image01: string | null;
    image02: string | null;
    countCourse: number | null;
    title: string | null;
    subTitle01: string | null;
    desc01: string | null;
    subTitle02: string | null;
    desc02: string | null;
  };
  services: {
    backgroundImage: string | null;
    title: string | null;
    icon01: string | null;
    subTitle01: string | null;
    desc01: string | null;
    backgroundColor01: string;
    icon02: string | null;
    subTitle02: string | null;
    desc02: string | null;
    backgroundColor02: string;
    icon03: string | null;
    subTitle03: string | null;
    desc03: string | null;
    backgroundColor03: string;
    icon04: string | null;
    subTitle04: string | null;
    desc04: string | null;
    backgroundColor04: string;
  };
  listEvent: {
    backgroundImage: string | null;
    title: string | null;
    desc: string | null;
    image: string | null;
    video: string | null;
  };
  whyChooseUs: {
    backgroundImage: string | null;
    title: string | null;
    desc: string | null;
    icon01: string | null;
    subTitle01: string | null;
    icon02: string | null;
    subTitle02: string | null;
    icon03: string | null;
    subTitle03: string | null;
    icon04: string | null;
    subTitle04: string | null;
  };
  teachers: {
    backgroundImage: string | null;
    title: string | null;
    titleSmall: string | null;
  };
  testimonial: {
    backgroundImage: string | null;
  };
  registerTeacher: {
    backgroundImage: string | null;
    image: string | null;
  };
  registerCollab: {
    backgroundImage: string | null;
  };
}
