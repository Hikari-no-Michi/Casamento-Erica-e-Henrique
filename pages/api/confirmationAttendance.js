import database from '../../lib/mongodb';
import Convidado from '../../models/Convidado';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const {
      fullName,
      participants,
    } = req.body;

    try {
      await database.connect();

      const novoConvidado = new Convidado({
        fullName,
        participants,
      });

      const resultado = await novoConvidado.save();

      res.status(201).json({
        message: 'Convidado criado com sucesso!',
        rifa: resultado,
      });

      await database.disconnect();
    } catch (err) {
      console.error('Erro ao criar a Convidado:', err);
      res.status(500).json({ message: 'Erro ao criar a Convidado', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
