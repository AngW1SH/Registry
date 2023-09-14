import { Container, FullScreenWithBackground } from "@/shared/ui";
import { Header } from "@/widgets/Header";
import { HeroNav } from "@/widgets/HeroNav";
import { HeroSearch } from "@/widgets/HeroSearch";
import { HeroTitle } from "@/widgets/HeroTitle";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
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
  );
};

export default HomePage;
