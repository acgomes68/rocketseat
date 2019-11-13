import * as Yup from 'yup';
import User from '../models/User';
import Student from '../models/Student';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Se o e-mail do usuário for de um aluno, cadastra com senha vazia paa evitar
      // que o mesmo possa se autenticar
      const isStudent = await Student.findOne({
        where: { email: req.body.email },
      });
      if (isStudent) {
        req.body.isStudent = true;
        req.body.password = '';
      } else {
        req.body.isStudent = false;
      }

      const { id, name, email } = await User.create(req.body);

      return res.json({
        id,
        name,
        email,
      });
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    try {
      const user = await User.findByPk(req.userId);

      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
          return res.status(400).json({ error: 'User already exists' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Se o e-mail do usuário for de um aluno, cadastra com senha vazia paa evitar
      // que o mesmo possa se autenticar
      const isStudent = await Student.findOne({ where: { email } });
      if (isStudent) {
        req.body.isStudent = true;
        req.body.password = '';
      } else {
        req.body.isStudent = false;
      }

      const { id, name } = await user.update(req.body);

      return res.json({
        id,
        name,
        email,
      });
    } catch (error) {
      return res.status(502).json({ error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      await user.destroy();
      return res.json(user);
    } catch (error) {
      return res.status(502).json({ error });
    }
  }
}

export default new UserController();
