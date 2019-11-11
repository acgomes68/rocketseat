import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title } = req.body;

    try {
      const plan = await Plan.findByPk(id);

      if (title !== plan.title) {
        const planExists = await Plan.findOne({ where: { title } });

        if (planExists) {
          return res.status(400).json({ error: 'Plan already exists' });
        }
      }

      const { duration, price } = await plan.update(req.body);

      return res.json({
        id,
        title,
        duration,
        price,
      });
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const plan = await Plan.destroy({ where: { id } });
      return res.json(plan);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }
}

export default new PlanController();
