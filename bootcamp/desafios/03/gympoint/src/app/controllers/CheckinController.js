import { Op } from 'sequelize';
import { subDays, startOfDay, endOfDay } from 'date-fns';

import Checkin from '../models/Checkin';

class CheckinController {
  async show(req, res) {
    const student_id = req.params.id;
    const checkin = await Checkin.findAll({ student_id });
    return res.json(checkin);
  }

  async store(req, res) {
    const student_id = req.params.id;
    const end_date = Number(new Date());
    const start_date = subDays(end_date, 7);

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(start_date), endOfDay(end_date)],
        },
      },
    });

    if (checkins.count > 4) {
      return res
        .status(400)
        .json({ error: "You've already checked 5 in the last 7 days" });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
