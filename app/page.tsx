'use client';
import { useState } from 'react';

export default function WeddingReception() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitted(true);
    setShowConfirmModal(true); // Show confirmation modal after submission

    // Enviar os dados para a API
    try {
      const response = await fetch('/api/confirmationAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          participants: guests,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Convidado criado com sucesso:', data);
      } else {
        console.error('Erro ao criar o convidado:', data.error);
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(
      '00020126680014BR.GOV.BCB.PIX0121aciresousa2@gmail.com0221Presente de Casamento5204000053039865802BR5925Erica de Sousa Alves Corr6009SAO PAULO621405102WwVAt8pBw63049E16'
    ); // Substitua pela sua chave Pix
    setShowPixModal(true); // Show the Pix copied modal
    setTimeout(() => {
      setShowPixModal(false); // Hide after 2 seconds
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Convite de Casamento
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Junte-se a nós para celebrar este momento especial!
        </p>

        {/* Imagem do Casamento */}
        <div className="flex justify-center mt-4">
          <img
            src="/Casamento__2___1_-removebg-preview.png" // Caminho para a imagem na pasta public
            alt="Imagem do Casamento"
            className="w-full max-w-[250px] rounded-lg" // Ajuste o tamanho e o estilo conforme necessário
          />
        </div>

        <div className="mt-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Detalhes do Evento</h2>
          <p className="mt-1 text-gray-700">
            <strong>Data:</strong> 31 de maio de 2025
          </p>
          <p className="text-gray-700">
            <strong>Hora:</strong> 18:00h
          </p>
          <p className="text-gray-700">
            <strong>Local:</strong> Clube da OAB
          </p>
          <p className="text-gray-700">
            <strong>Endereço:</strong> Av. Prof. Camilo Filho, 930 - Gurupi,
            Teresina - PI
          </p>
        </div>

        {!submitted ? (
          <form className="mt-6" onSubmit={handleSubmit}>
            <label className="block mb-2 text-gray-700">Nome:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="block mt-4 mb-2 text-gray-700">Quantos membros da sua família irão acompanhá-lo?</label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border rounded"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Confirmar Presença
            </button>
          </form>
        ) : (
          <p className="text-green-600 mt-4 text-center">
            Obrigado por confirmar sua presença! 🎉
          </p>
        )}

        {/* Seção de Chave Pix e QR Code */}
        <div className="mt-8 p-4 border-t border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700">Contribuições</h3>
          <p className="mt-2 text-gray-700">
            Se desejar, você pode contribuir com o nosso Pix:
          </p>

          <div className="flex items-center mt-4">
            <button
              onClick={handleCopyPix}
              className="w-1/2 bg-green-600 text-white py-2 rounded mr-4 hover:bg-green-700"
            >
              Copiar chave Pix
            </button>

            {/* Aqui você pode adicionar o seu QR Code */}
            <img
              src="pix_qr_code.svg" // Substitua pelo link do seu QR Code
              alt="QR Code do Pix"
              className="w-[120px] h-[120px]"
            />
          </div>
        </div>

        {/* Modal de confirmação de presença */}
        {showConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Confirmação de Presença
              </h2>
              <p className="text-center text-gray-600 mt-2">
                Sua presença foi confirmada! Estamos ansiosos para vê-lo(a) no
                grande dia!
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de chave Pix copiada */}
        {showPixModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-green-600 text-white p-4 rounded-lg w-64">
              <p className="text-center">Chave Pix copiada com sucesso!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
