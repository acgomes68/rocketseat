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

    const { question } = req.body;

    try {
      const helpOrder = await HelpOrder.findByPk(id);

      if (question !== helpOrder.question) {
        const helpOrderExists = await helpOrder.findOne({
          where: { question },
        });

        if (helpOrderExists) {
          return res.status(400).json({ error: 'Help order already exists' });
        }
      }

      const { student_id, answer, answer_at } = await helpOrder.update(
        req.body
      );

      return res.json({
        id,
        student_id,
        question,
        answer,
        answer_at,
      });
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const helpOrder = await HelpOrder.destroy({ where: { id } });
      return res.json(helpOrder);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }
}

export default new HelpOrderController();
