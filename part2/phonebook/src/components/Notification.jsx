const Notification = ({ message }) => {
  if(message.isSuccess === null) return null

  return message.isSuccess
    ? <div className="success">{message.content}</div>
    : <div className="error">{message.content}</div>;
}

export default Notification