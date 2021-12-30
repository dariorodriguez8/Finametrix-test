import React, { useState } from "react";
import Moment from 'moment';


const New = ({ _id, title, description, author, date, content, removeNew, archiveNew}) => {
  const [readMore, setReadMore] = useState(false);

  return (
      
    <article className="single-new">
      <img src={'https://picsum.photos/800/600?random&t='+date} alt={title} />
      <footer>
        <div className="new-info">
          <h4>{title}</h4>
          <h4 className="new-date">
            <span className="author">{author}</span><br/>
            {Moment(date).format('DD-MM-YYYY')}</h4>
        </div>
        <h5>{description}</h5>
        <p>
          {readMore ? content : `${content.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? "show less" : "  read more"}
          </button>
        </p>
        {!removeNew?  
        (
          <div className="buttons">
            <button className="delete-btn" onClick={() => archiveNew(_id, Moment().format(Moment.DATETIME_LOCAL_SECONDS))}>Archive New</button>
          </div>
        )
        : 
        (
          <div className="buttons">
              <button className="delete-btn" onClick={() => archiveNew(_id, null)}>Unarchive New</button>
              <button className="delete-btn" onClick={() => removeNew(_id)}>Delete New</button>
          </div>
        )
        }
      
      </footer>
    </article>
  );
};

export default New;
