import "./HelperMessage.css";
const HelperMessage = ({ messageContent }) => {
  return (
    <div className="HelperMessage">
      <p>{messageContent}</p>
    </div>
  );
};

export default HelperMessage;
