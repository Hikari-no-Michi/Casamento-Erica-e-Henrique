'use client';
import { useState } from 'react';
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"], // Suporte para caracteres latinos
  weight: "400", // Peso da fonte (400, 500, 600, etc.)
});

export default function WeddingReception() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSubmitted(true);
    setShowConfirmModal(true);
    try {
      const response = await fetch('/api/confirmationAttendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, participants: guests })
      });
      const data = await response.json();
      if (!response.ok) console.error('Erro ao criar o convidado:', data.error);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126680014BR.GOV.BCB.PIX0121aciresousa2@gmail.com0221Presente de Casamento5204000053039865802BR5925Erica de Sousa Alves Corr6009SAO PAULO621405102WwVAt8pBw63049E16');
    setShowPixModal(true);
    setTimeout(() => setShowPixModal(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h1 className="text-3xl font-bold text-center text-gray-800">Convite de Casamento</h1>
      <p className="text-center text-gray-600 mt-2">Junte-se a nós para celebrar este momento especial!</p>
      <p className="text-center text-gray-600 mt-5">Com a bênção de nossos pais,</p>
      <p className="text-center text-gray-600 mt-1">
        Claudionor Chaves & Maria da Luz <br />
        Flaviano Correia & Maria da Conceição
      </p>
      <p className={`${dancingScript.className} text-center text-[#ecc41f] mt-4 text-4xl font-bold`}>
        Luiz Henrique  
        <br />
        <span className="text-2xl">&</span>  
        <br />
        Érica Correia
      </p>




        <div className="flex justify-center mt-4">
          <img src="/Casamento__2___1_-removebg-preview.png" alt="Imagem do Casamento" className="w-full max-w-[250px] rounded-lg" />
        </div>
        <div className="mt-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Detalhes do Evento</h2>
          <p className="mt-1 text-gray-700"><strong>Data:</strong> 31 de maio de 2025</p>
          <p className="text-gray-700"><strong>Hora:</strong> 18:00h</p>
          <p className="text-gray-700"><strong>Local:</strong> Clube da OAB</p>
          <p className="text-gray-700"><strong>Endereço:</strong> Av. Prof. Camilo Filho, 930 - Gurupi, Teresina - PI</p>
        </div>
        {!submitted ? (
          <form className="mt-6" onSubmit={handleSubmit}>
            <label className="block mb-2 text-gray-700">Nome:</label>
            <input type="text" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
            <label className="block mt-4 mb-2 text-gray-700">Confirme quantos membros da sua família virão com você!</label>
            <input type="number" min="0" className="w-full p-2 border rounded" value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
            <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Confirmar Presença</button>
          </form>
        ) : (
          <p className="text-green-600 mt-4 text-center">Obrigado por confirmar sua presença! 🎉</p>
        )}
        <div className="mt-8 border-t border-gray-300 text-center w-full">
          <h2 className="text-lg font-semibold">Presente de Casamento</h2>
          <p className="mt-2 text-gray-700">Lista de casamento abaixo, mas, se preferir, você pode nos presentear com um Pix a partir de R$ 80.</p>
          <div className="flex flex-col items-center mt-4">
            
          <button
            onClick={handleCopyPix}
            className="w-full bg-[#0ca678] text-white py-2 rounded hover:bg-[#0b8f44] mb-2 animate-pulse p-2"
          >
            Copiar chave Pix
          </button>

          <a href='https://lista.havan.com.br//Convidado/ItensListaPresente/822165' target="_blank" className="w-full bg-[#183153] text-[#ffd43b] rounded mb-2 flex items-center justify-center space-x-2 py-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6" fill='#ffd43b'>
              <path 
                d="M190.5 68.8L225.3 128l-1.3 0-72 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40l-72 0-1.3 0 34.8-59.2C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40zM32 288l0 176c0 26.5 21.5 48 48 48l144 0 0-224L32 288zM288 512l144 0c26.5 0 48-21.5 48-48l0-176-192 0 0 224z"/>
            </svg>
            <span>Lista Casamento Havan</span>
          </a>



            <img src="pix_qr_code.svg" alt="QR Code do Pix" className="w-[120px] h-[120px]" />
          </div>
        </div>
        {showConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Confirmação de Presença</h2>
              <p className="text-gray-600 mt-2">Sua presença foi confirmada! Estamos ansiosos para vê-lo(a) no grande dia!</p>
              <button onClick={() => setShowConfirmModal(false)} className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4">Fechar</button>
            </div>
          </div>
        )}
        {showPixModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-green-600 text-white p-4 rounded-lg w-64 text-center">Chave Pix copiada com sucesso!</div>
          </div>
        )}
      </div>
    </div>
  );
}
