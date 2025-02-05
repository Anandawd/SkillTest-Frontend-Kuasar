const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-10"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          className="bg-red-600 text-white text-xl px-3 py-1 place-self-end cursor-pointer rounded-3xl mb-2 max-sm:text-sm"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-2 rounded-2xl">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
