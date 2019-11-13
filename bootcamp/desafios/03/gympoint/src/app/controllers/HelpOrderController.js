import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    try {
      const helpOrders = await HelpOrder.findAll({
        where: { answer_at: null },
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
        ],
      });
      if (!helpOrders || helpOrders.length === 0) {
        return res
          .status(400)
          .json({ error: 'There is no help requests to answer' });
      }
      return res.json(helpOrders);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async show(req, res) {
    const student_id = req.params.id;
    try {
      const student = await Student.findByPk(student_id);

      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }

      const helpOrders = await HelpOrder.findAll({
        where: { student_id },
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
        ],
      });
      if (!helpOrders) {
        return res
          .status(400)
          .json({ error: 'You have no registered help requests' });
      }
      return res.json(helpOrders);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async store(req, res) {
    const student_id = req.params.id;
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const { question } = req.body;

    try {
      const new_help_order = await HelpOrder.create({ student_id, question });

      const helpOrder = await HelpOrder.findByPk(new_help_order.id, {
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
        ],
      });
      return res.json(helpOrder);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      answer: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { answer } = req.body;
    const answer_at = new Date();

    try {
      const helpOrder = await HelpOrder.findByPk(id, {
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
        ],
      });

      if (!helpOrder) {
        return res.status(400).json({ error: 'Help request not found' });
      }

      await helpOrder.update({
        answer,
        answer_at,
      });

      await Queue.add(HelpOrderMail.key, {
        helpOrder,
      });

      return res.json(helpOrder);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }
}

export default new HelpOrderController();
