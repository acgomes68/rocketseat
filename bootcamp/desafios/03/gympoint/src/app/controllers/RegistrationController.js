import * as Yup from 'yup';
import Registraton from '../models/Registraton';

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

    const { id, student_id, plan_id, start_date, end_date, price } = await Registraton.create(
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

    const { student_id, plan_id, start_date, end_date, price } = await registraton.update(req.body);

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const registraton = await Registraton.destroy(id);
    return res.json(registraton);
  }
}

export default new RegistratonController();
