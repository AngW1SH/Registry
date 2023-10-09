import { File } from "@/shared/ui";
import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";

interface ProjectDescriptionProps {}

const ProjectDescription: FC<ProjectDescriptionProps> = () => {
  return (
    <LabeledBlock label="Описание проекта">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus
        lorem, tristique at cursus ac, tincidunt eget ex. Nam non nibh
        elementum, malesuada odio eget, pretium elit. Aliquam sit amet
        condimentum velit. Nam convallis porttitor velit sed rhoncus.
        Suspendisse interdum molestie venenatis. Nunc nulla dolor, volutpat vel
        venenatis quis, vulputate eget tellus. Nulla blandit odio fermentum
        mauris vehicula, ac lacinia justo ullamcorper. Sed eleifend tellus eget
        elit condimentum scelerisque. Donec velit sapien, dapibus quis dolor id,
        varius congue nibh.
      </p>
      <p className="pt-8">
        Quisque at massa at metus vestibulum tincidunt a sed justo. Nullam
        posuere fermentum augue, sed gravida purus rutrum eget. Ut tincidunt
        orci nec nibh consectetur, ac blandit ipsum molestie. Donec magna odio,
        viverra dictum porttitor eget, scelerisque at massa. Mauris sed eros a
        elit pretium bibendum.
      </p>
      <div className="pt-10" />
      <File
        label={"Презентация проекта"}
        link={"/projects/123"}
        type={"PDF"}
        size={"92 Кб"}
      />
    </LabeledBlock>
  );
};

export default ProjectDescription;
