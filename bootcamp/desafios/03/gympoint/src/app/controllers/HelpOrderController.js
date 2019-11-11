import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll();
    return res.json(helpOrders);
  }

  async show(req, res) {
    const { id } = req.params;
    const helpOrder = await HelpOrder.findByPk(id);
    return res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      question: Yup.string().required(),
      answer: Yup.string(),
      answer_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      student_id,
      question,
      answer,
      answer_at,
    } = await HelpOrder.create(req.body);

    return res.json({
      id,
      student_id,
      question,
      answer,
      answer_at,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      question: Yup.string(),
      answer: Yup.string(),
      answer_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, question, answer, answer_at } = await HelpOrder.update(
      req.body
    );

    return res.json({
      id,
      student_id,
      question,
      answer,
      answer_at,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const helpOrder = await HelpOrder.destroy(id);
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
