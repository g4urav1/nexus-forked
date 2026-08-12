import { useNavigate } from "react-router";

export default function Popup({ response, setShowPopup }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    setShowPopup(false);
    navigate("/profile");
  };

  return (
    <div
      onClick={() => setShowPopup(false)}
      className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0F172A] text-white p-6 rounded-xl shadow-xl min-w-[300px] flex flex-col items-center"
      >
        <p>{response}</p>

        <button
          onClick={handleGoBack}
          className="mt-4 px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
