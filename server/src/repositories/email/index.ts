import nodemailer from "nodemailer";

const emailRepositoryFactory = () => {
  return Object.freeze({ send });

  async function send(data: { email: string; name: string }) {
    const transporter = nodemailer.createTransport({
      service: "yandex",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER + "@yandex.ru",
      to: process.env.ADMIN_EMAIL,
      subject: "Registry Contact Request",
      text: `Email: ${data.email}\nName: ${data.name}`,
    });

    return info;
  }
};

const emailRepository = emailRepositoryFactory();

export default emailRepository;
