function Chat() {
  return (
    <div className="chat-field">
      <div className="players">
        <div className="title-PM">
          <p>Players</p>
        </div>
        <div className="name-players"></div>
      </div>
      <div className="messages">
        <div className="title-PM">
          <p>Messages</p>
        </div>
        <div className="messages-field"></div>
        <form className="input-form">
          <input type="text" placeholder="Write  a  message ..." className="input-message"/>
        </form>
      </div>
    </div>
  );
}

export default Chat;
