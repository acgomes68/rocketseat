import * as Yup from 'yup';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll();
    return res.json(checkins);
  }

  async show(req, res) {
    const { id } = req.params;
    const checkin = await Checkin.findByPk(id);
    return res.json(checkin);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, student_id } = await Checkin.create(req.body);

    return res.json({
      id,
      student_id,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      student_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = await Checkin.update(req.body);

    return res.json({
      id,
      student_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const checkin = await Checkin.destroy(id);
    return res.json(checkin);
  }
}

export default new CheckinController();
