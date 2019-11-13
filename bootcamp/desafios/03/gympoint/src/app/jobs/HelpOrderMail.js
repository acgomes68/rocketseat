import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    console.log('Help Order queue has been processed!');

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'GymPoint answered your help request',
      template: 'helpOrder',
      context: {
        id: helpOrder.id,
        student: helpOrder.student.name,
        question: helpOrder.question,
        created_at: format(
          parseISO(helpOrder.createdAt),
          'MMMM do, yyyy hh:mm:ss aa'
        ),
        answer: helpOrder.answer,
        answer_at: format(
          parseISO(helpOrder.answer_at),
          'MMMM do, yyyy hh:mm:ss aa'
        ),
      },
    });
  }
}

export default new HelpOrderMail();
