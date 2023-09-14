import {
  BackgroundFill,
  Container,
  FullScreenWithBackground,
  Headline,
} from "@/shared/ui";
import { ActiveProjects } from "@/widgets/ActiveProjects";
import { ContactForm } from "@/widgets/ContactForm";
import { FeaturedCategories } from "@/widgets/FeaturedCategories";
import { Header } from "@/widgets/Header";
import { HeroNav } from "@/widgets/HeroNav";
import { HeroSearch } from "@/widgets/HeroSearch";
import { HeroTitle } from "@/widgets/HeroTitle";
import { OtherLinks } from "@/widgets/OtherLinks";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <>
      <FullScreenWithBackground background="/hero.png">
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
    </>
  );
};

export default HomePage;
