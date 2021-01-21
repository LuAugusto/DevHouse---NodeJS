// Controller House, responsavel por criar a conexão entre a view e o model

// importando model
import * as Yup from 'yup';
import House from '../models/House';
import User from '../models/User';
// Criando o controller
class HouseController {
      async index(req, res) {
            const { status } = req.query;
            const houses = await House.find({ status });

            return res.json(houses);
      }

      // Async pois se espera uma requisição
      async store(req, res) {
            // schema/YUp -> validação se dados foram digitados
            const schema = Yup.object().shape({
                  description: Yup.string().required(),
                  price: Yup.number().required(),
                  location: Yup.string().required(),
                  status: Yup.boolean().required(),
            });

            const { filename } = req.file;
            const { description, price, location, status } = req.body;
            const { user_id } = req.headers;

            if (!(await schema.isValid(req.body))) {
                  return res.status(400).json({ error: 'falha na validação' });
            }
            // Requisição feita, se cria a casa
            const house = await House.create({
                  user: user_id,
                  thumbnail: filename,
                  description,
                  price,
                  location,
                  status,
            });

            return res.json(house);
      }

      async update(req, res) {
            // schema/YUp -> validação se dados foram digitados
            const schema = Yup.object().shape({
                  description: Yup.string().required(),
                  price: Yup.number().required(),
                  location: Yup.string().required(),
                  status: Yup.boolean().required(),
            });

            const { filename } = req.file;
            const { house_id } = req.params;
            const { description, price, location, status } = req.body;
            const { user_id } = req.headers;

            const user = await User.findById(user_id);
            const houses = await House.findById(house_id);
            if (!(await schema.isValid(req.body))) {
                  return res.status(400).json({ error: 'falha na validação' });
            }

            if (String(user._id) !== String(user._id)) {
                  return res.status(401).json({ error: 'Não autorizado' });
            }

            await House.updateOne(
                  { _id: house_id },
                  {
                        user: user_id,
                        thumbnail: filename,
                        description,
                        price,
                        location,
                        status,
                  }
            );

            return res.send();
      }

      async destroy(req, res) {
            const { house_id } = req.body;
            const { user_id } = req.headers;

            const user = await User.findById(user_id);
            const houses = await House.findById(house_id);

            if (String(user._id) !== String(user._id)) {
                  return res.status(401).json({ error: 'Não autorizado' });
            }

            await House.findByIdAndDelete({ _id: house_id });
            return res.json({ message: 'excluido' });
      }
}
export default new HouseController();
