import React, { useState } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

function Notification({title, children}) {
    const [position, setPosition] = useState('top-start');
    const [show, setShow] = useState(true);

    return (
        <div
           
            >
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} auohide>
                    <Toast.Header>
                        <strong className="me-auto">{title}</strong>
                    </Toast.Header>
                    <Toast.Body>{children}</Toast.Body>
                    </Toast>       
            </ToastContainer>
        </div>
    )
}

export default Notification
