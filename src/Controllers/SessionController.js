// metodos -> Index,show,update,store,destroy
/**
 * index = listagem de sessões
 * store = criar nova sessão
 * show = listar uma unica sessão
 * update = alterar alguma sessão
 * destroy = deletar sessão
 */
import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
      async store(req, res) {
            const schema = Yup.object().shape({
                  email: Yup.string().email().required(),
            });

            const { email } = req.body;

            if (!(await schema.isValid(req.body))) {
                  return res.status(400).json({ error: 'falha na validação' });
            }

            // Verificando se já existe usuario
            let user = await User.findOne({ email });
            if (!user) {
                  // Criando caso não exista
                  user = await User.create({ email });
            }

            return res.json(user);
      }
}
export default new SessionController();
