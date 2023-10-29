"use client";
import { FormInput, NamedBlock } from "@/shared/ui";
import { FC } from "react";

interface EditEducationDataProps {}

const EditEducationData: FC<EditEducationDataProps> = () => {
  return (
    <NamedBlock title={"Учебные данные"} border={false}>
      <div className="flex flex-col gap-y-6">
        <FormInput
          className="w-3/4 pt-0 sm:w-[calc(50%+1px)]"
          value={"20.БО7-пу"}
          label={"Группа"}
          id={"userProfileClass"}
          readOnly={true}
        />
        <FormInput
          className="w-3/4 pt-0 sm:w-[calc(50%+1px)]"
          value={"3"}
          label="Курс"
          id={"userProfileYear"}
          readOnly={true}
        />
        <div>
          <p className="pb-1 text-xs text-[#898989]">
            Краткое описание профессиональных навыков
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            lectus lorem, tristique at cursus ac, tincidunt eget ex. Nam non
            nibh elementum, malesuada odio eget, pretium elit. Aliquam sit amet
            condimentum velit. Nam convallis porttitor velit sed rhoncus.
            Suspendisse interdum molestie venenatis. Nunc nulla dolor, volutpat
            vel venenatis quis, vulputate eget tellus. Nulla
            <span className="ml-3 cursor-pointer text-sm text-primary">
              Редактировать
            </span>
          </p>
        </div>
      </div>
    </NamedBlock>
  );
};

export default EditEducationData;
