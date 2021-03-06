import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    try{
      const students = await Student.findAll();
      return res.json(students);
    }
    catch(error) {
      return res.status(502).json({ "error": error });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try{
      const student = await Student.findByPk(id);
      return res.json(student);
    }
    catch(error) {
      return res.status(502).json({ "error": error });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const studentExists = await Student.findOne({
        where: { email: req.body.email },
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists' });
      }

      const { id, name, email, age, weight, height } = await Student.create(
        req.body
      );

      return res.json({
        id,
        name,
        email,
        age,
        weight,
        height,
      });
    }
    catch(error) {
      return res.status(502).json({ "error": error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    try{
      const student = await Student.findByPk(id);

      if (email !== student.email) {
        const studentExists = await Student.findOne({ where: { email } });

        if (studentExists) {
          return res.status(400).json({ error: 'Student already exists' });
        }
      }

      const { name, age, weight, height } = await student.update(req.body);

      return res.json({
        id,
        name,
        email,
        age,
        weight,
        height,
      });
    }
    catch(error) {
      return res.status(502).json({ "error": error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try{
      const student = await Student.destroy({ where: { id } });
      return res.json(student);
    }
    catch(error) {
      return res.status(502).json({ "error": error });
    }
  }
}

export default new StudentController();
