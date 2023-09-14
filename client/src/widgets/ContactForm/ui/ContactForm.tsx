import { SendContactFormEmail } from "@/features/SendContactFormEmail";
import { FC } from "react";

interface ContactFormProps {}

const ContactForm: FC<ContactFormProps> = () => {
  return (
    <div className="flex gap-32">
      <div>
        <h2 className="text-4xl font-medium">Заказчикам</h2>
        <div className="pt-8" />
        <p className="text-[0.9375rem] font-medium leading-6">
          Если у Вас есть запрос на
          <br />
          сотрудничество и создание проекта,
          <br />
          заполните онлайн-заявку.
          <br />
          Наш представитель свяжется с вами
          <br />в ближайшее время
        </p>
      </div>
      <SendContactFormEmail className="w-80" />
    </div>
  );
};

export default ContactForm;
