import React, { useState } from 'react';

const VideoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer', background: '#ccc', padding: '10px', display: 'inline-block' }}
      >
        Bấm để xem video
      </div>

      {isOpen && (
        <div
          className='modal-package kmDclUB general-video-modal XQMJeMe'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <div className='AJB4SoI modal-content p7i338h' style={{ background: '#fff', padding: '20px' }}>
            <button onClick={() => setIsOpen(false)} style={{ float: 'right' }}>
              Đóng
            </button>
            <section className='WsU7lRo modal-content-body DjWbiXP'>
              <video
                className='orca-video'
                autoPlay
                controls
                poster=''
                preload='metadata'
                crossOrigin='anonymous'
                style={{ maxWidth: '100%', maxHeight: '80vh' }}
              >
                <source
                  src='https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/0e7e8378f90eddda63a8953a16bb68fa-1705932024206/How%20Fiverr%20Works%20EN%20Subs%2016x9'
                  type='video/mp4'
                />
              </video>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
export default VideoModal;
