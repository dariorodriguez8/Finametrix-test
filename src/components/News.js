import React from 'react';
import New from './New';

const News = ({news, archiveNew, removeNew}) => {
    return (
        <section>
            <div className='title'>
                <h2>{removeNew?'Archived':'News'}</h2>
                <div className="underline"></div>
            </div> 
            <div>
                {
                removeNew?
                news
                .filter(n=>n.archiveDate != null)
                .sort((a, b) => new Date(b.archiveDate) - new Date(a.archiveDate))
                .map((n)=>(
                    <New key={n._id} {...n} removeNew={removeNew} archiveNew={archiveNew}/>
                ))
                :
                news
                .filter(n=>n.archiveDate === null)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((n)=>(
                    <New key={n._id} {...n} archiveNew={archiveNew}/>
                ))     
                }
            </div>
        </section>
    );
};

export default News;