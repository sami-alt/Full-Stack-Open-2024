import './index.css'

const Message = (props) => {
    const {message} = props
    
    
    return(
      <div>
        {message === null ? '' : message.type === 'error' ? <div className="error">{message.content}</div> : <div className="success">{message.content}</div>}
      </div>
    )
  }

  export default Message