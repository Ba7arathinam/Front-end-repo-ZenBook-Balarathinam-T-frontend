import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';

import { Link } from 'react-router-dom';
import { MyBookings } from '../pages/Profilescreen';

function Rooms({room,fromdate,todate,totaldays}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
<MyBookings from={fromdate} to={todate}/>
  return (
    <div className='row bs'>
      <div className='col-md-3'>
        <img src={room.imageurls[0]} alt='Hotel.pic' className='smallimg'/>
      </div>
      <div className='col-md-5 bf ' >
        <h1>{room.name}</h1>
        <b>
        <p>Max Count :{room.maxcount}</p>
        <p>Phone Number:{room.phonenumber}</p>
        <p>Type:{room.type}</p>
        </b>  
        <Link to={`/book/${room._id}/${fromdate}/${todate}`} className='br'>
          <button className='btn btn-secondary m-2'variant="secondary">
            Book Rooms
          </button>
          </Link>
          <Button className='btn btn-secondary'onClick={handleShow}>View Details</Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel>
      {room.imageurls.map(img=>{
       return  <Carousel.Item>
        <img
          className="d-block w-100 bigimg"
          src={img}
          alt="Room img"
        />
      </Carousel.Item>
      })}
    </Carousel>
    <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
  )
}

export default Rooms