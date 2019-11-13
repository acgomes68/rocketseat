import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    console.log('Registration queue has been processed!');

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Welcome to GymPoint',
      template: 'registration',
      context: {
        id: registration.id,
        plan: registration.plan.title,
        student: registration.student.name,
        start_date: format(parseISO(registration.start_date), 'MMMM dd, Y'),
        end_date: format(parseISO(registration.end_date), 'MMMM dd, Y'),
        monthly_value: parseFloat(registration.plan.price).toFixed(2),
        total_value: parseFloat(registration.price).toFixed(2),
      },
    });
  }
}

export default new RegistrationMail();
