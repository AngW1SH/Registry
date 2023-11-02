import {
  BackgroundFill,
  Container,
  FullScreenWithBackground,
  Headline,
  LinkWithIcon,
} from "@/shared/ui";
import { ActiveProjects } from "@/widgets/ActiveProjects";
import { ContactForm } from "@/widgets/ContactForm";
import { FeaturedCategories } from "@/widgets/FeaturedCategories";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { HeroNav } from "@/widgets/HeroNav";
import { HeroSearch } from "@/widgets/HeroSearch";
import { HeroTitle } from "@/widgets/HeroTitle";
import { NewProjects } from "@/widgets/NewProjects";
import { OtherLinks } from "@/widgets/OtherLinks";
import { Subscribe } from "@/widgets/Subscribe";
import { Metadata } from "next";
import Head from "next/head";
import { FC } from "react";

interface HomePageProps {}

export const HomePageMetadata: Metadata = {
  title: "Реестр проектов клинической практики СПбГУ",
  description:
    "Платформа для размещения образовательных проектов для выполнения студентами СПбГУ. Наш сервис предоставляет возможность совместной работы над учебными заданиями, расширения знаний и навыков, а также создания перспектив для будущей карьеры.",
};

const HomePage: FC<HomePageProps> = () => {
  return (
    <>
      <FullScreenWithBackground
        className="min-h-[700px] sm:min-h-[600px]"
        background="/hero.png"
      >
        <Container className="h-full">
          <div className="flex h-full w-full flex-col">
            <div className="pt-6" />
            <Header />
            <div className="my-auto">
              <HeroTitle />
              <div className="pt-10" />
              <HeroSearch />
              <div className="pt-7" />
              <HeroNav />
            </div>
          </div>
        </Container>
      </FullScreenWithBackground>
      <div className="pt-9" />
      <Container>
        <FeaturedCategories />
      </Container>
      <div className="pt-24" />
      <Headline>
        <Container>
          <h1 className="text-4xl font-bold uppercase">Активные проекты</h1>
        </Container>
      </Headline>
      <div className="pt-8" />
      <Container>
        <ActiveProjects />
      </Container>
      <div className="pt-24" />
      <Container>
        <OtherLinks />
      </Container>
      <div className="pt-16" />
      <BackgroundFill image="/contact-form-bg.png">
        <Container>
          <div className="pt-20" />
          <ContactForm />
          <div className="pt-24" />
        </Container>
      </BackgroundFill>
      <div className="pt-20" />
      <Container>
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-bold uppercase">Свежие проекты</h1>
          <LinkWithIcon href="/" className="uppercase">
            <span className="pr-4">Выбрать период</span>
          </LinkWithIcon>
        </div>
      </Container>
      <div className="pt-10" />
      <Container>
        <NewProjects />
      </Container>
      <div className="pt-16" />
      <Container>
        <Subscribe />
      </Container>
      <div className="pt-8" />
      <Footer />
    </>
  );
};

export default HomePage;
