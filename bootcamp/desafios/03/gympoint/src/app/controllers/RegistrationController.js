import * as Yup from 'yup';
import Registraton from '../models/Registration';

class RegistratonController {
  async index(req, res) {
    const registratons = await Registraton.findAll();
    return res.json(registratons);
  }

  async show(req, res) {
    const { id } = req.params;
    const registraton = await Registraton.findByPk(id);
    return res.json(registraton);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
      end_date: Yup.date().required(),
      price: Yup.number.required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await Registraton.create(req.body);

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id } = req.body;

    try {
      const registration = await Registraton.findByPk(id);

      if (
        student_id !== registration.student_id ||
        plan_id !== registration.plan_id
      ) {
        const registratonExists = await Registraton.findOne({
          where: { student_id, plan_id },
        });

        if (registratonExists) {
          return res
            .status(400)
            .json({ error: 'Student already exists for this plan' });
        }
      }

      const { start_date, end_date, price } = await registration.update(
        req.body
      );

      return res.json({
        id,
        student_id,
        plan_id,
        start_date,
        end_date,
        price,
      });
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const registraton = await Registraton.destroy({ where: { id } });
      return res.json(registraton);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }
}

export default new RegistratonController();
