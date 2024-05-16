import './index.css'

const Message = (props) => {
    const {message} = props
    
    
    return(
      <div>
        {message === null ? '' : message.type === 'error' ? <div className="error">{String(message.content)}</div> : <div className="success">{String(message.content)}</div>}
      </div>
    )
  }

  export default Message