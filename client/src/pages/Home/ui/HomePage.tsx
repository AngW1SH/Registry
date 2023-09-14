import { Container, FullScreenWithBackground } from "@/shared/ui";
import { Header } from "@/widgets/Header";
import { HeroNav } from "@/widgets/HeroNav";
import { HeroSearch } from "@/widgets/HeroSearch";
import { HeroTitle } from "@/widgets/HeroTitle";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <FullScreenWithBackground background="/hero.jpg">
      <Container className="h-full">
        <div className="flex h-full w-full flex-col">
          <div className="pt-6" />
          <Header />
          <div className="mt-auto">
            <HeroTitle />
            <div className="pt-10" />
            <HeroSearch />
            <div className="pt-7" />
            <HeroNav />
            <div className="pt-16" />
          </div>
        </div>
      </Container>
    </FullScreenWithBackground>
  );
};

export default HomePage;
