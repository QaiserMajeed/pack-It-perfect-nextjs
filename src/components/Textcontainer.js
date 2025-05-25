import React from 'react';


const TextContainer = ({list}) => {
  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-12 text-center">
          <h1 className="font-weight-bold ">{list.title}</h1>
          <p>{list.description}</p>
        </div>
      </div>

      <div className="row mb-4" id="services">
        {list.services.map((service, index) => (
          <div className="col-md-3 mb-4" key={index} >
            <div className="text-center" >
              <div className='icon-container'>
              <i className={service.icon}></i>
              </div>
              
            </div>
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextContainer;
