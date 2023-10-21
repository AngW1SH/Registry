import emailRepository from "@/repositories/email";

const emailServiceFactory = () => {
  return Object.freeze({
    send,
  });

  async function send(data: { email: string; name: string }) {
    return emailRepository.send(data);
  }
};

const emailService = emailServiceFactory();

export default emailService;
