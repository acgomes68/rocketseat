import * as Yup from 'yup';
import { parseISO, addMonths, isBefore } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'price'],
        },
      ],
    });
    return res.json(registrations);
  }

  async show(req, res) {
    const { id } = req.params;
    const registration = await Registration.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'price'],
        },
      ],
    });
    return res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({
        error: 'Past dates are not permitted',
      });
    }

    try {
      const registrationExists = await Registration.findOne({
        where: { student_id, plan_id },
      });

      if (registrationExists) {
        return res.status(400).json({
          error: 'Student already has a valid registration for this plan',
        });
      }
    } catch (error) {
      return res.status(502).json({ error });
    }

    try {
      const student = await Student.findByPk(student_id);

      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }
    } catch (error) {
      return res.status(502).json({ error });
    }

    try {
      const plan = await Plan.findByPk(plan_id);

      if (!plan) {
        return res.status(400).json({ error: 'Plan not found' });
      }

      const price = plan.duration * plan.price;
      const end_date = addMonths(parseISO(start_date), plan.duration);

      const new_registration = await Registration.create({
        plan_id,
        student_id,
        start_date,
        end_date,
        price,
      });

      const registration = await Registration.findByPk(new_registration.id, {
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['title', 'price'],
          },
        ],
      });

      await Queue.add(RegistrationMail.key, {
        registration,
      });

      return res.json(registration);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({
        error: 'Past dates are not permitted',
      });
    }

    try {
      const registration = await Registration.findByPk(id);

      if (
        student_id !== registration.student_id ||
        plan_id !== registration.plan_id
      ) {
        const registrationExists = await Registration.findOne({
          where: { student_id, plan_id },
        });

        if (registrationExists) {
          return res.status(400).json({
            error: 'Student already has a valid registration for this plan',
          });
        }
      }

      const student = await Student.findByPk(student_id);

      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }

      const plan = await Plan.findByPk(plan_id);

      if (!plan) {
        return res.status(400).json({ error: 'Plan not found' });
      }

      const price = plan.duration * plan.price;
      const end_date = addMonths(parseISO(start_date), plan.duration);

      await registration.update({
        plan_id,
        student_id,
        start_date,
        end_date,
        price,
      });

      return res.json(registration);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const registration = await Registration.destroy({ where: { id } });
      return res.json(registration);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }
}

export default new RegistrationController();
